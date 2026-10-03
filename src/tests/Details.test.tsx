import { cleanup, render, screen } from "@testing-library/react";
import Details from "../components/Details";
import { useQuery } from "@tanstack/react-query";
import { describe, it, expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import type { OrderObj } from "../components/OrderObj";
import { useUserStore } from "../components/Store";
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

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

vi.mock('@tanstack/react-query');

describe("Details", () => {
  const user = userEvent.setup();
  vi.mocked(useQuery).mockReturnValue({
    data: { id: 1, title: 'Product 1', price: 10, category: 'Category 1', onSale: true, picture: 'picture_url', saldo: 6 },
    isLoading: false,
    error: null,
   } as any );

  it("check stock value", async () => {
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
            <Details />
        </MemoryRouter>
        );

    expect(screen.getByText("2 in stock")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(screen.getByText("1 in stock")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    const outOfStock = screen.getAllByText("Out of stock").find(el => el.tagName === 'P');
    expect(outOfStock).toBeInTheDocument();
    order.orderItems[0].quantity = 6;
    screen.debug();
  });
});
