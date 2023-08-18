import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("dumyName");
  return (
    <div>
      <h1>User: {name}</h1>
      <div className="chat-container">
        <div className="container me">
          <p className="chatbox">
            <strong>name: </strong>
            <span>chat message</span>
          </p>
        </div>
        <div className="container">
          <p className="chatbox">
            <strong>name: </strong>
            <span>chat message</span>
          </p>
        </div>
      </div>

      <div className="input-box">
        <input type="text" placeholder="Enter your text" />
        <button>Send</button>
      </div>
    </div>
  );
}

export default App;
