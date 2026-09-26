const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo">
          Webshop
        </a>

        <nav className="header__nav">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About us</a>
        </nav>

        <div className="header__actions">
          <button>Search</button>
          <button>Cart</button>
        </div>
      </div>
    </header>
  );
};

export default Header;