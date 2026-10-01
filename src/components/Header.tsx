import { useUserStore } from './Store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const order: any = useUserStore(( state : any ) => state.order) || null;
  console.log('header:', order?.orderItems?.length)
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Pet Paws
        </Link>

        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About us</Link>
        </nav>

        <div className="header__actions">
          <button>Search</button>
          <button onClick = { () => navigate("/order") }>Cart { 
              order && order.orderItems.length > 0 ? `(${order.orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0)})` : '' 
          }</button>
        </div>
      </div>
    </header>
  );
};

export default Header;