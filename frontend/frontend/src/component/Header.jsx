import logo from "../assets/Goalden.png";

function Header() {
  return (
    <header className="header">

      <div className="logo">
        <img src={logo} alt="Goalden Logo" />
        <h2>GOALDEN</h2>
      </div>
    </header>
  );
}

export default Header;