import "../styles/UserBoard.css";

export default function UserBoard({ user }) {
  return (
    <div className="user-panel">
      <div className="user-box">
        <img src={user.image} alt="Google User" className="user-image" />
        <h2 className="greeting">Welcome</h2>
        <h3 className="userName">{user.name}</h3>
      </div>
    </div>
  );
}
