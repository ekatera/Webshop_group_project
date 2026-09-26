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

describe("Order", () => {
  it("increase and decrease quantity", async () => {
    const user = userEvent.setup();

    vi.mocked(useQuery).mockReturnValue({
    data: [
      { id: 1, title: 'Product 1', price: 10, category: 'Category 1', onSale: true, picture: 'picture_url', saldo: 1 },
    ],
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
    render(<Order />);
    expect(screen.getByText("Total price for product: 20 kr")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByText("Total price for product: 20 kr")).toBeInTheDocument();
    expect(screen.getByText("Total Price: 20 kr")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByText("Total price for product: 10 kr")).toBeInTheDocument();
    expect(screen.getByText("Total Price: 10 kr")).toBeInTheDocument();
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(1);
    screen.debug();
  });

describe("Order", () => {
  it("order calculates right price per product and total price", async () => {
    const user = userEvent.setup();

    vi.mocked(useQuery).mockReturnValue({
    data: [
      { id: 1, title: 'Product 1', price: 10, category: 'Category 1', onSale: true, picture: 'picture_url', saldo: 5 },
      { id: 2, title: 'Product 2', price: 30, category: 'Category 1', onSale: true, picture: 'picture_url', saldo: 2 },
    ],
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
            },
            {
                itemId: 2,
                quantity: 4
            }
        ]
    };

    useUserStore.setState({ order: order });
    render(<Order />);
    
    expect(screen.getByText("Total price for product: 20 kr")).toBeInTheDocument();
    expect(screen.getByText("Total price for product: 120 kr")).toBeInTheDocument();
    expect(screen.getByText("Total Price: 140 kr")).toBeInTheDocument();
    screen.debug();
  });
});


describe("Order", () => {
  it("order removed when no items", async () => {
    const user = userEvent.setup();

    vi.mocked(useQuery).mockReturnValue({
    data: [
      { id: 2, title: 'Product 2', price: 30, category: 'Category 1', onSale: true, picture: 'picture_url', saldo: 1 },
    ],
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
                itemId: 2,
                quantity: 1
            }
        ]
    };

    useUserStore.setState({ order: order });
    render(<Order />);
    
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.queryByText("No order found")).toBeInTheDocument();
    screen.debug();
  });
});

describe("Order", () => {
  it("order cannot overcome available stock", async () => {
    const user = userEvent.setup();

    vi.mocked(useQuery).mockReturnValue({
    data: [
      { id: 2, title: 'Product 2', price: 30, category: 'Category 1', onSale: true, picture: 'picture_url', saldo: 1 },
    ],
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
                itemId: 2,
                quantity: 1
            }
        ]
    };

    useUserStore.setState({ order: order });

    render(<Order />);
    expect(screen.getByText("Total price for product: 30 kr")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText("Total price for product: 30 kr")).toBeInTheDocument();
    screen.debug();
  });
});
});
