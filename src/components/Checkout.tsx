import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "./Store";
import type { OrderObj, PaymentMethod } from "./OrderObj";
import CustomerForm, { type CustomerData } from "./CustomerForm";
import ShippingForm, { type ShippingData } from "./ShippingForm";
import PaymentForm, { type PaymentData } from "./PaymentForm";
import OrderItems from "./OrderItems";

type StoreState = {
  order: OrderObj | null;
  customerData: CustomerData | null;
  shippingData: ShippingData | null;
  setCustomerData: (data: CustomerData) => void;
  setShippingData: (data: ShippingData) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  clearOrder: () => void;
};

type Product = {
  id: number | string;
  title: string;
  price: number;
  saldo: number;
};

const Checkout = () => {
  const navigate = useNavigate();

  const order = useUserStore(
    (state) => (state as StoreState).order
  );

  const customerData = useUserStore(
    (state) => (state as StoreState).customerData
  );

  const shippingData = useUserStore(
    (state) => (state as StoreState).shippingData
  );

  const setCustomerData = useUserStore(
    (state) => (state as StoreState).setCustomerData
  );

  const setShippingData = useUserStore(
    (state) => (state as StoreState).setShippingData
  );

  const setPaymentMethod = useUserStore(
    (state) => (state as StoreState).setPaymentMethod
  );

  const clearOrder = useUserStore(
    (state) => (state as StoreState).clearOrder
  );

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/products");

      if (!response.ok) {
        throw new Error("Could not fetch products");
      }

      return response.json();
    },
  });

  const handleCustomerComplete = (data: CustomerData) => {
    setCustomerData(data);
  };

  const handleShippingComplete = (data: ShippingData) => {
    setShippingData(data);
  };

  const handlePaymentComplete = async (data: PaymentData) => {
    if (!order || !customerData || !shippingData) return;

    try {
      setPaymentMethod(data.paymentMethod);

      const orderProducts = await Promise.all(
        order.orderItems.map(async (item) => {
          const response = await fetch(
            `http://localhost:3000/products/${item.itemId}`
          );

          if (!response.ok) {
            throw new Error("Could not fetch product");
          }

          const product: Product = await response.json();

          if (product.saldo < item.quantity) {
            throw new Error("Not enough products in stock");
          }

          return {
            product,
            quantity: item.quantity,
          };
        })
      );

      const orderItems = orderProducts.map(({ product, quantity }) => ({
        itemId: Number(product.id),
        quantity,
        price: product.price,
      }));

      const totalPrice = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const orderId = Date.now();

      const newOrder = {
        orderId,
        orderItems,
        price: totalPrice,
        paymentMethod: data.paymentMethod,
        date: new Date().toISOString(),
        customerId: order.customerId,
        customerInfo: customerData,
        shippingMethod: shippingData.shippingMethod,
      };

      const orderResponse = await fetch(
        "http://localhost:3000/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Could not create order");
      }

      for (const { product, quantity } of orderProducts) {
        const stockResponse = await fetch(
          `http://localhost:3000/products/${product.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              saldo: product.saldo - quantity,
            }),
          }
        );

        if (!stockResponse.ok) {
          throw new Error("Could not update stock");
        }
      }

      clearOrder();
      navigate(`/confirmation/${orderId}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!order) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>No order found</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <h3>Order summary</h3>

      {isLoading && <p>Loading order...</p>}

      {isError && <p>Could not load order.</p>}

      {!isLoading && !isError && (
        <OrderItems
          items={order.orderItems}
          products={products}
          readOnly
        />
      )}

      {!customerData && (
        <CustomerForm onComplete={handleCustomerComplete} />
      )}

      {customerData && !shippingData && (
        <ShippingForm onComplete={handleShippingComplete} />
      )}

      {customerData && shippingData && (
        <PaymentForm onComplete={handlePaymentComplete} />
      )}
    </div>
  );
};

export default Checkout;