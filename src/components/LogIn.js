import userLogIn from "../assets/user.png";

export default function LogIn({ googleSignIn }) {
  return (
    <div className="login-box">
      <img src={userLogIn} alt="" className="user-logo" />
      <p className="login-text">
        <b>Login and start chatting!</b>
      </p>
      <button onClick={(e) => googleSignIn()} className="google-btn">
        <div className="google-icon-wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Icon"
            className="google-icon"
          />
        </div>
        <p className="btn-text">
          <b>Sign in with Google</b>
        </p>
      </button>
    </div>
  );
}
