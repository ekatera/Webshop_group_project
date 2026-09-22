import { useUserStore } from './Store';
import { useQuery } from '@tanstack/react-query';

const Order = () => {
    const {data: products, isLoading, error} = useQuery( {
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

    const totalPrice = order?.orderItems.reduce(( sum :number, item:any ) => sum + ( products?.find( (product : any ) => Number(product.id) === Number(item.itemId) )?.price * item.quantity ), 0);

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
                            <span>Item ID:  { products?.find( ( product : any ) => Number ( product.id ) === Number( item.itemId ) )?.title } </span><br />
                            <span>Price:  { products?.find( ( product : any ) => Number ( product.id ) === Number( item.itemId ) )?.price } kr </span>

                            <br />
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
                             <br />
                            <span>Total price for product:  { products?.find( ( product : any ) => Number ( product.id ) === Number( item.itemId ) )?.price * item.quantity } kr </span>
       
                            </span>
                        </li>
                    ) )}
                </ul>
                <p>Total Price: { totalPrice } kr</p>
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