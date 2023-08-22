import "../styles/UserBoard.css";

export default function UserBoard({ user }) {
  const photoURL = user.photoURL;
  return (
    <div className="user-panel">
      {/* bug fix : google image dosent load */}
      {/* <img src={photoURL} alt="Google User" className="user-image" /> */}
      <h2 className="greeting">Welcome</h2>
      <h3 className="userName">{user.name}</h3>
    </div>
  );
}
