import "./Input.css";

export default function Input({ sendChat, msg, setMessage }) {
  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Enter your text"
        onInput={setMessage}
        value={msg}
      />
      <button onClick={sendChat}>Send</button>
    </div>
  );
}
