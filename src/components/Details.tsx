import { useUserStore } from './Store';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

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

const Details = () => {
  const { id } = useParams();

  const addToCart = useUserStore((state: any) => state.updateOrder);
  const order = useUserStore((state: any) => state.order);
  

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/products/${id}`);

      if (!response.ok) {
        throw new Error('Product could not be loaded');
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <p>Loading product...</p>;
  }

  if (isError || !product) {
    return <p>Something went wrong when loading the product.</p>;
  }

  const cartItem = order?.orderItems.find(
  (item: any) => item.itemId === Number(product.id)
);

const quantityInCart = cartItem?.quantity ?? 0;
const canAddToCart = quantityInCart < product.saldo;
const remainingStock = product.saldo - quantityInCart;

return (
  <main className="details-page">
    <div className="details-card">
      <div className="details-image-wrapper">
        <img
          src={product.picture}
          alt={product.title}
          className={`details-image ${product.saldo === 0 || product.saldo - (order?.orderItems.find((item: any) => item.itemId === Number(product.id))?.quantity ?? 0) <= 0 ? 'out-of-stock' : ''}`}
        />
      </div>

      <div className="details-info">
        <p className="details-label">PRODUCT DETAILS</p>

        <h1>{product.title}</h1>

        <p className="details-description">
          {product.description}
        </p>

        <p className="details-price">
          {product.price} kr
        </p>

        <p className="details-stock">
          {remainingStock > 0 ? `${  remainingStock  } in stock` : 'Out of stock'}
        </p>

        <button
          className="details-add-button"
          onClick={() => {
            if (canAddToCart) {
              addToCart(Number(product.id), product.saldo);
            }
          }}
          disabled={!canAddToCart}
        >
          {canAddToCart ? 'Add to cart' : 'Out of stock'}
        </button>
      </div>
    </div>
  </main>
);
};

export default Details;