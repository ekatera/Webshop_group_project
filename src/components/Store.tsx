import { create } from 'zustand';
import type { OrderObj, OrderItems } from './OrderObj';

type CustomerData = {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    city: string;
};

type ShippingData = {
    shippingMethod: 'DHL' | 'Schenker' | 'PostNord';
};


export const useUserStore = create ( (set)  => (
    {
        order: null as OrderObj | null,
        OrderItems: [] as OrderItems,
        customerData: null as CustomerData | null,
        shippingData: null as ShippingData | null,
        searchResults: [] as any[],

        setCustomerData: (customerData: CustomerData) => set({
            customerData
        }),

        setShippingData: (shippingData: ShippingData) => set({
            shippingData
        }),

        clearOrder: () => set({
            order: null,
            OrderItems: [],
            customerData: null,
            shippingData: null
        }),

        updateOrder: ( itemId : number, saldo: number ) => set( (state : any) => 
             
                {
                        if ( state.order ) {
                        const newOrder = {...state.order};
                        const found = state.order.orderItems.find( (item : any) => item.itemId === itemId );
                        if ( found ) {
                        if (found.quantity < saldo) {
                            found.quantity += 1;
                        }
                    } else {
                        state.order.orderItems.push({ itemId, quantity: 1 });
                    }
                        newOrder.orderItems = [...state.order.orderItems];
                        return { order: newOrder };
                    } else { // create new order
                        const newOrder : OrderObj = {
                            orderId: Date.now(),
                            orderItems: [{ itemId, quantity: 1 }],
                            date: new Date(),
                            price: 0,
                            customerId: 0,
                            paymentMethod: 'creditCard'
                        };
                        return { 
                            order: newOrder
                        }

                    }
                }
             
        ), // end updateOrder

        setPaymentMethod: (method: string) => set(( state : any ) => 
        {
            const newOrder = {...state.order, paymentMethod: method };
            return { order: newOrder };
        }), // end setPaymentMethod

        updateOrderPrice: ( price:number ) => set (( state : any ) => 
            ({
                order: {...state.order, price }
             } )),
        updateQuantity: (itemId : number, quantity: number) => set(( state : any) =>
           {
            if ( quantity > 0 ) {
                const newOrderItems = state.order.orderItems.map(  ( item: any ) =>
                  item.itemId === itemId ? {...item, quantity } : item
                )
                const newOrder = {...state.order, orderItems: newOrderItems };
                return { order: newOrder };
            } else {
                const newOrderItems = state.order.orderItems.filter( ( item : any )  =>
                 item.itemId !== itemId
                );
                if ( newOrderItems.length === 0 ) {
                    return { order: null };
                } 
                const newOrder = {...state.order, orderItems: newOrderItems };
                return { order: newOrder };
            }
           }  
        ),
        getSearchResults: (results: number[]) => set(( ) => 
            ({
                searchResults: results
            })
        )
    }
));