import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3>Pet Paws</h3>
          <p>Your online pet store for happy pets and happy owners.</p>
          <p>Everything your pet needs, all in one place.</p>
        </div>

        <div className="footer__section">
          <h3>Quick links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About us</Link>
        </div>

        <div className="footer__section">
          <h3>Contact</h3>
          <p>petpaws@order.com</p>
          <p>We're happy to help with your questions.</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Pet Paws. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;