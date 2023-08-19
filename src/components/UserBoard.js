import "./UserBoard.css";

export default function UserBoard({ user }) {
  return (
    <div className="user-panel">
      <p>Welcome</p>
      <h3>{user.name}</h3>
    </div>
  );
}
