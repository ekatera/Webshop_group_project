import type { OrderObj } from './OrderObj';

const mockOrder: OrderObj = {
    orderId: 12345,
    orderItems: [
        { itemId: 1, quantity: 2 },
        { itemId: 2, quantity: 1 },
    ],
    price: 100,
    date: new Date(),
    customerId: 1,
    paymentMethod: 'creditCard'
};

export default mockOrder;