import "./App.css";
import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import LogIn from "./components/LogIn";
import UserBoard from "./components/UserBoard";
import ChatWindow from "./components/ChatWindow";
import Input from "./components/Input";
import Header from "./components/Header";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        setUser({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        });
        console.log(user, token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  //function to send setMsg as a prop in Input component
  function setMessage(e) {
    setMsg(e.target.value);
  }

  //send message to chat
  function sendChat() {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });
    setMsg(" ");
  }

  //scroll to latest text
  function updateHeight() {
    const element = document.getElementById("chat");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => updateHeight(), 100);
    });
  }, []);

  return (
    <div>
      <Header />
      {user.email ? (
        <div className="main-page">
          <UserBoard user={user} />
          <div className="chat-area">
            <ChatWindow user={user} chats={chats} />
            <Input sendChat={sendChat} msg={msg} setMessage={setMessage} />
          </div>
        </div>
      ) : (
        <LogIn googleSignIn={googleSignIn} />
      )}
    </div>
  );
}

export default App;
