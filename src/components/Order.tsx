import OrderItems from './OrderItems';
import { useUserStore } from './Store';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const navigate = useNavigate();
    const {data: products, error} = useQuery( {
        queryKey: ['products'],
        queryFn: async() => {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            console.log(data);
            return data;
        }
    } );
    if ( error ) {
        console.log(error);
    }

    const order = useUserStore(( state : any ) => state.order);
    const setPayment = useUserStore(( state: any ) => state.setPaymentMethod);
    const updateQuantity = useUserStore(( state : any ) => state.updateQuantity);
    const updatePrice = useUserStore( ( state : any ) => state.updateOrderPrice );

    const totalPrice = order?.orderItems.reduce(
        ( sum :number, item:any ) =>
            sum + (
                products?.find(
                    (product : any ) =>
                        Number(product.id) === Number(item.itemId)
                )?.price * item.quantity
            ),
        0
    );
    console.log('Current order status:', order);
    return (
        order ? (
            <div className="order-container">

                <h2>Order Details:</h2>

                <h1>Order ID: {order?.orderId}</h1>
                <p>Order date: {order?.date.toLocaleDateString()}</p>
                <p>Customer: Erik Eriksson</p>

                <h3>Order Items:</h3>

                <OrderItems
                    items={order.orderItems}
                    products={products ?? []}
                    updateQuantity={updateQuantity}
                />

                <label>
                    Payment Method:
                    <select onChange={(e) => setPayment(e.target.value)}>
                        <option value="creditCard">Card</option>
                        <option value="swish">Swish</option>
                        <option value="invoice">Invoice</option>
                    </select>
                </label>

                <button onClick={() => {
                    updatePrice(totalPrice);
                    navigate( '/checkout' );
                }}>
                    Confirm order
                </button>

            </div>
        ) :
        (<div>No order found</div>)
    );
};

export default Order;