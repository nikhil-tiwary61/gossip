import "./App.css";
import userLogIn from "./assets/user.png";
import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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
      {user.email ? null : (
        <div className="login-box">
          <img src={userLogIn} alt="" className="user-logo" />
          <p className="login-text">
            <b>Login and start chatting!</b>
          </p>
          <button onClick={(e) => googleSignIn()} className="google-btn">
            <div className="google-icon-wrapper">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Icon"
                className="google-icon"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with Google</b>
            </p>
          </button>
        </div>
      )}

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
      ) : null}
    </div>
  );
}

export default App;
