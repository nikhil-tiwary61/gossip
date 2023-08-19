import "./App.css";
import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import LogIn from "./components/LogIn";

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
        setUser({ name: result.user.displayName, email: result.user.email });
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
      {user.email ? (
        <div>
          <h1>User: {user.name}</h1>
          <div id="chat" className="chat-container">
            {chats.map((chat, i) => (
              <div
                key={i}
                className={`container ${
                  chat.user.name === user.name ? "me" : ""
                }`}
              >
                <p className="chatbox">
                  <strong>{chat.user.name}: </strong>
                  <span>{chat.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your text"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <button onClick={sendChat}>Send</button>
          </div>
        </div>
      ) : (
        <LogIn googleSignIn={googleSignIn} />
      )}
    </div>
  );
}

export default App;
