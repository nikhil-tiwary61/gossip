import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  function sendChat() {
    const c = [...chats];
    c.push({ name, message: msg });
    setChats(c);
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
            {chats.map((chat) => (
              <div className={`container ${chat.name === name ? "me" : ""}`}>
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
