type CustomerInfo = {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    city: string;
};

type ShippingMethod = 'DHL' | 'Schenker' | 'PostNord';

type OrderObj = {
    orderId: number;
    orderItems: OrderItems;
    price: number;
    paymentMethod?: PaymentMethod;
    date: Date;
    customerId: number;
    customerInfo?: CustomerInfo;
    shippingMethod?: ShippingMethod;
};

type OrderItems = {
        itemId: number;
        quantity: number;
        price?: number;
}[];

type PaymentMethod = 'creditCard' | 'swish' | 'invoice';
export type { OrderObj };
export type { OrderItems };
export type { PaymentMethod };
export type { CustomerInfo };
export type { ShippingMethod };