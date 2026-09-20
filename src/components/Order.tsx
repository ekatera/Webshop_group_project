import { useUserStore } from './Store';

const Order = () => {
    const order = useUserStore(( state : any ) => state.order);
    const setPayment = useUserStore(( state: any ) => state.setPaymentMethod);
    const updateQuantity = useUserStore(( state : any ) => state.updateQuantity);
    return (
        <div className="order-container">
            <h2>Order Details:</h2>
            
                <h1>Order ID: {order?.orderId}</h1>
                <p>Order date: {order?.date.toLocaleDateString()}</p>
                <p>Customer: Erik Eriksson</p>
                <h3>Order Items:</h3>
                <ul>
                    {order?.orderItems.map (( item: any ) => (
                        <li key={item.itemId}>
                            Item ID: {item.itemId}, 
                            <span>Quantity: <input type="number" value={ item.quantity } readOnly />
                                <button onClick = { 
                                    () => { 
                                       updateQuantity( item.itemId, item.quantity+1 );
                                    }}>+
                                    </button>
                                <button onClick= {() => 
                                    { if (item.quantity >= 1) updateQuantity( item.itemId, item.quantity-1 );
                                    }}> 
                                -</button>
                            </span>
                        </li>
                    ) )}
                </ul>
                <p>Total Price: {order?.price}</p>
                <label>
                    Payment Method:
                    <select onChange={(e) => setPayment(e.target.value)}>
                        <option value="creditCard" >Card</option>
                        <option value="swish" >Swish</option>
                        <option value="invoice" >Invoice</option>
                    </select>
                </label>
        </div>
    );
};

export default Order;