import { useParams } from "react-router-dom";

const Confirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="confirmation-container">
      <h2>Order confirmed</h2>

      <p>Your order has been placed successfully.</p>

      <p>
        Order number: <strong>{orderId}</strong>
      </p>
    </div>
  );
};

export default Confirmation;