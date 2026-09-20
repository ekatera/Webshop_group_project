type OrderObj = {
    orderId: number;
    orderItems: OrderItems;
    price: number;
    paymentMethod?: PaymentMethod;
    date: Date;
    customerId: number;
};

type OrderItems = {
        itemId: number;
        quantity: number;
}[];

type PaymentMethod = 'creditCard' | 'swish' | 'invoice';
export type { OrderObj };
export type { OrderItems };
export type { PaymentMethod };