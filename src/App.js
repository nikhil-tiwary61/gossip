import "./App.css";
import { useState } from "react";

function App() {
  const [name, setNmae] = useState("dumyName");
  return (
    <div>
      <h1>User: {name}</h1>
      <div className="chat-container">
        <p className="chatbox">
          <strong>name: </strong>
          <span>chat message</span>
        </p>
      </div>
    </div>
  );
}

export default App;
