import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, afterEach, vi } from 'vitest';
import Order from "../components/Order";
import type { OrderObj } from "../components/OrderObj";
import { useUserStore } from "../components/Store";
import { useQuery } from "@tanstack/react-query";
afterEach(() => {
  cleanup();
});

vi.mock('@tanstack/react-query');

// vi.mock('@tanstack/react-query', () => ({
//   useQuery: () => ({
//     data: [{ id: 1, title: 'Product 1', price: 10, category: 'Category 1', saldo: 5 }],
//     isLoading: false,
//     error: null,
//   }),
// }));

describe("Order", () => {
  it("order calculates right product price", async () => {
    const user = userEvent.setup();

    vi.mocked(useQuery).mockReturnValue({
    data: [{ id: 1, title: 'Product 1', price: 10, category: 'Category 1', onSale: true, picture: 'picture_url', saldo: 5 }],
    isLoading: false,
    error: null,
} as any );

    const order: OrderObj = {
        orderId: 1,
        date: new Date(),
        price: 0,
        paymentMethod: 'creditCard',
        customerId: 1,
        orderItems: [
            {
                itemId: 1,
                quantity: 2
            }
        ]
    };

    useUserStore.setState({ order: order });
    // vi.mock("../components/Store", () => ({
    //   useUserStore: () => ({
    //     order: order,
    //     setPaymentMethod: vi.fn(),
    //   }),
    // }));

    render(<Order />);
    
    expect(screen.getByText("Total price for product: 20 kr")).toBeInTheDocument();
    screen.debug();
  });
});