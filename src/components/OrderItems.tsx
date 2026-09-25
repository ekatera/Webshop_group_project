type OrderItem = {
  itemId: number;
  quantity: number;
};

type Product = {
  id: number | string;
  title: string;
  price: number;
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
            <li key={item.itemId}>
              <span>Item: {product?.title}</span>
              <br />

              <span>Price: {product?.price} kr</span>
              <br />

              <span>
                Quantity:{" "}
                <input
                  type="number"
                  value={item.quantity}
                  readOnly
                />

                {!readOnly && updateQuantity && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.itemId, item.quantity + 1)
                      }
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.itemId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                  </>
                )}
              </span>

              <br />

              <span>
                Total price for product:{" "}
                {(product?.price ?? 0) * item.quantity} kr
              </span>
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