import "../styles/ChatWindow.css";

export default function ChatWindow({ user, chats }) {
  return (
    <>
      <div id="chat" className="chat-container">
        {chats.map((chat, i) => (
          <div
            key={i}
            className={`container ${chat.user.name === user.name ? "me" : ""}`}
          >
            <p className="chatbox">
              <strong>{chat.user.name}: </strong>
              <span>{chat.message}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
