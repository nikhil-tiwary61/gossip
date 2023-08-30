import "../styles/UserBoard.css";

export default function UserBoard({ user }) {
  return (
    <div className="user-panel">
      <div className="user-box">
        <img src={user.image} alt="Google User" className="user-image" />
        <h3 className="greeting">{user.name}</h3>
      </div>
    </div>
  );
}
