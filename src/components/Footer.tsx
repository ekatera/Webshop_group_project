const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3>Webshop</h3>
          <p>Your online store</p>
        </div>

        <div className="footer__section">
          <h3>Links</h3>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer__section">
          <h3>Contact</h3>
          <p>info@example.com</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Webshop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;