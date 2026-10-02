import { cleanup, render, screen, act } from "@testing-library/react";
import Header from "../components/Header";
import { describe, it, expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import type { OrderObj } from "../components/OrderObj";
import { useUserStore } from "../components/Store";
import { MemoryRouter } from 'react-router-dom';

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
  };
});


afterEach(() => {
  cleanup();
});

describe("Header", () => {
  it("show right amount of products in cart", async () => {
    const order: OrderObj = {
        orderId: 1,
        date: new Date(),
        price: 0,
        paymentMethod: 'creditCard',
        customerId: 1,
        orderItems: [
            {
                itemId: 1,
                quantity: 4
            }
        ]
    };
    
    useUserStore.setState({ order: order });

    render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
        );
    expect(screen.getByRole('button', { name: /cart \(4\)/i })).toBeInTheDocument();
    
    // add more items to the order and check if the cart button updates correctly
    const newOrder: OrderObj = {...order, orderItems: [{ itemId: 1, quantity: 5 }, { itemId: 2, quantity: 3 }]};
    useUserStore.setState({ order: newOrder });
    act(() => {
    useUserStore.setState({ order: newOrder });
    });
    expect(screen.getByRole('button', { name: /cart \(8\)/i })).toBeInTheDocument();
    
    // remove all items from the order and check if the cart button updates correctly
    const emptyOrder: OrderObj = {...order, orderItems: []};
    useUserStore.setState({ order: emptyOrder });
    act(() => {
    useUserStore.setState({ order: emptyOrder });
    });
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
    screen.debug();
    
    // add more items to the order and check if the cart button updates correctly
    const thirdOrder: OrderObj = {...order, orderItems: [{ itemId: 1, quantity: 2 }, { itemId: 2, quantity: 2 }]};
    useUserStore.setState({ order: thirdOrder });
    act(() => {
    useUserStore.setState({ order: thirdOrder });
    });
    expect(screen.getByRole('button', { name: /cart \(4\)/i })).toBeInTheDocument();
    screen.debug();
  });
});