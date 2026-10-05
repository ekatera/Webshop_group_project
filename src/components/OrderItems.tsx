import { Link } from 'react-router-dom'

type OrderItem = {
  itemId: number;
  quantity: number;
};

type Product = {
  id: number | string;
  title: string;
  price: number;
  saldo: number;
  picture?: string;
};

type OrderItemsProps = {
  items: OrderItem[];
  products: Product[];
  readOnly?: boolean;
  updateQuantity?: (itemId: number, quantity: number) => void;
};

const OrderItems = ({
  items,
  products,
  readOnly = false,
  updateQuantity,
}: OrderItemsProps) => {
  const findProduct = (itemId: number) =>
    products.find(
      (product) => Number(product.id) === Number(itemId)
    );

  return (
    <>
      <ul>
        {items.map((item) => {
          const product = findProduct(item.itemId);

          return (
  <li key={item.itemId} className="order-item">
    <Link
      to={`/products/detail/${product?.id}`}
      className="order-item-image-link"
    >
      <img
        src={product?.picture}
        alt={product?.title || 'Product'}
        className="order-item-image"
      />
    </Link>

    <div className="order-item-info">
      <h4 className="order-item-title">
        <Link to={`/products/detail/${product?.id}`}>
          {product?.title}
        </Link>
      </h4>
      <p className="order-item-price">{product?.price} kr</p>
    </div>

    <div className="order-item-quantity">
      <span>Quantity:</span>

      {!readOnly && updateQuantity && (
        <button
          type="button"
          onClick={() =>
            updateQuantity(item.itemId, item.quantity - 1)
          }
        >
          -
        </button>
      )}

      <input
        type="number"
        value={item.quantity}
        readOnly
      />

      {!readOnly && updateQuantity && (
        <button
          type="button"
          onClick={() => {
            if (item.quantity + 1 <= (product?.saldo ?? 0)) {
              updateQuantity(item.itemId, item.quantity + 1)
            }
          }}
        >
          +
        </button>
      )}
    </div>

    <div className="order-item-total">
      <span>Total</span>
      <strong>
        {(product?.price ?? 0) * item.quantity} kr
      </strong>
    </div>

    {!readOnly && updateQuantity && (
      <button
        type="button"
        className="order-item-remove"
        onClick={() => updateQuantity(item.itemId, 0)}
      >
        Remove
      </button>
    )}
  </li>
);
      })}
    </ul>

      <p>
        Total Price:{" "}
        {items.reduce((total, item) => {
          const product = findProduct(item.itemId);
          return total + (product?.price ?? 0) * item.quantity;
        }, 0)}{" "}
        kr
      </p>
    </>
  );
};

export default OrderItems;