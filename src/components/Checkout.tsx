import { useState, type SyntheticEvent } from "react";
import { useUserStore } from "./Store";
import type { OrderObj } from "./OrderObj";

type StoreState = {
  order: OrderObj | null;
};

type Product = {
  id: number;
  saldo: number;
};

const Checkout = () => {
  const order = useUserStore(
    (state) => (state as StoreState).order
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateStock = async () => {
  if (!order) return;

  for (const item of order.orderItems) {
    const response = await fetch(
      `http://localhost:3000/products/${item.itemId}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch product");
    }

    const product: Product = await response.json();

    const newSaldo = product.saldo - item.quantity;

    if (newSaldo < 0) {
      throw new Error("Not enough products in stock");
    }

    const updateResponse = await fetch(
      `http://localhost:3000/products/${item.itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          saldo: newSaldo,
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Could not update stock");
    }
  }
};
const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
  await updateStock();
} catch (error) {
  console.error(error);
  setIsSubmitting(false);
}
};

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <label>
          First name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Last name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label>
          Postal code
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </label>

        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Order confirmed" : "Confirm order"}
        </button>

      </form>
    </div>
  );
};

export default Checkout;