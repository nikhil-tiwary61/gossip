import "../styles/Header.css";

export default function Header() {
  return (
    <div className="nav-bar">
      <img src="/assets/icon64.png" alt="logo" className="icon" />
      <div className="heading-bar">
        <h1 className="heading">Gossip</h1>
        <h3 className="sub-heading">Let's get chatting.</h3>
      </div>
    </div>
  );
}
