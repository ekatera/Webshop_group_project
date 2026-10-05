import { useQuery } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';
import { useUserStore } from './Store';
import { Link } from 'react-router-dom';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  animal: string | string[];
  categories: string[];
  onSale: boolean;
  picture: string;
  saldo: number;
};

const Search = () => {
  const addToCart = useUserStore((state: any) => state.updateOrder);
  const searchResults = useUserStore((state: any) => state.searchResults) || [];
  const order = useUserStore((state: any) => state.order);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Something went wrong when loading the products.</p>;
  }

  const foundProducts = products?.filter((product) => searchResults.includes(product.id));

  return (
    <main className="products-page">

      <div className="products-results">
        <div>
          <span className="products-results__eyebrow">SHOP</span>
          <h2>Found products</h2>
        </div>

      </div>

      <div className="products-grid">
        {foundProducts?.map((product: Product) => (
          <article className="product-card" key={product.id}>
            <Link
              to={`/products/detail/${product.id}`}
              className="product-card__link"
            >
              <img
                src={product.picture}
                alt={product.title}
                className={`product-card__image ${product.saldo === 0 || product.saldo - (order?.orderItems.find((item: any) => item.itemId === Number(product.id))?.quantity ?? 0) <= 0 ? 'out-of-stock' : ''}`}
              />
              <h2>{product.title}</h2>
            </Link>

            <p className="product-card__price">
              {product.price} kr
              <ShoppingCart
                className={`shopping-cart ${product.saldo === 0 || product.saldo - (order?.orderItems.find((item: any) => item.itemId === Number(product.id))?.quantity ?? 0) <= 0 ? 'out-of-stock' : ''}`}
                onClick={() => {
                  addToCart(Number(product.id), product.saldo);
                }}
              />
            </p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Search;