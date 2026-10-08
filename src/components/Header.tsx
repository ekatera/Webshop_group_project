import { useUserStore } from './Store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


const Header = () => {
  const [search, setSearch] = useState('');
  const order: any = useUserStore(( state : any ) => state.order) || null;
  const setSearchResults = useUserStore(( state : any ) => state.getSearchResults);
  const navigate = useNavigate();
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) {
        throw new Error('Products could not be loaded');
      }
      return response.json();
    },
  });

  if (isLoading) {
    console.log("Loading products...");
  }

  if (isError) {
    console.log("Something went wrong when loading the products.");
  }

  const handleSearch = () => {
    const searchResults = products.filter(( product: any ) => 
      { 
        return product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()) 
        || product.categories.some((category: string) => category.toLowerCase().includes(search.toLowerCase()));
      });
    setSearchResults(searchResults.map((product: any) => product.id));
    if (search.length > 0)
      navigate("/search");
  }
  
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Pet Paws
        </Link>

        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/about">About us</Link>
        </nav>

        <div className="header__actions">
          <input type="text" placeholder="Search products..." value={ search } onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={ handleSearch }> Search</button>
          <button onClick = { () => navigate("/order") }>Cart { 
              order && order.orderItems.length > 0 ? `(${order.orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0)})` : '' 
          }</button>
        </div>
      </div>
    </header>
  );
};

export default Header;