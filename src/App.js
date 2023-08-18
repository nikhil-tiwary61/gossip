import "./App.css";
import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";

function App() {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
    });
  }, []);

  //send message to chat
  function sendChat() {
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg,
    });
    setMsg(" ");
  }

  return (
    <div>
      {name ? null : (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            onBlur={(e) => setName(e.target.value)}
          />
        </div>
      )}

      {name ? (
        <div>
          <h1>User: {name}</h1>
          <div className="chat-container">
            {chats.map((chat, i) => (
              <div
                key={i}
                className={`container ${chat.name === name ? "me" : ""}`}
              >
                <p className="chatbox">
                  <strong>{chat.name}: </strong>
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
