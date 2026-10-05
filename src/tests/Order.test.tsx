import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import Order from "../components/Order";
import type { OrderObj } from "../components/OrderObj";
import { useUserStore } from "../components/Store";
import { useQuery } from "@tanstack/react-query";

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
    Link: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

vi.mock("@tanstack/react-query");

afterEach(() => {
  cleanup();
});

const getByTextContent = (text: string) =>
  screen.getByText(
    (_, element) => element?.textContent?.replace(/\s+/g, "") === text.replace(/\s+/g, "")
  );

describe("Order", () => {
  it("increase and decrease quantity", async () => {
    const user = userEvent.setup();

    vi.mocked(useQuery).mockReturnValue({
      data: [
        {
          id: 1,
          title: "Product 1",
          price: 10,
          category: "Category 1",
          onSale: true,
          picture: "picture_url",
          saldo: 1,
        },
      ],
      isLoading: false,
      error: null,
    } as any);

    const order: OrderObj = {
      orderId: 1,
      date: new Date(),
      price: 0,
      paymentMethod: "creditCard",
      customerId: 1,
      orderItems: [
        {
          itemId: 1,
          quantity: 2,
        },
      ],
    };

    useUserStore.setState({ order });

    render(<Order />);

    expect(getByTextContent("Total20kr")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(getByTextContent("Total20kr")).toBeInTheDocument();
    expect(getByTextContent("Total Price:20kr")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(getByTextContent("Total10kr")).toBeInTheDocument();
    expect(getByTextContent("Total Price:10kr")).toBeInTheDocument();

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(1);
  });

  it("order calculates right price per product and total price", async () => {
    vi.mocked(useQuery).mockReturnValue({
      data: [
        {
          id: 1,
          title: "Product 1",
          price: 10,
          category: "Category 1",
          onSale: true,
          picture: "picture_url",
          saldo: 5,
        },
        {
          id: 2,
          title: "Product 2",
          price: 30,
          category: "Category 1",
          onSale: true,
          picture: "picture_url",
          saldo: 2,
        },
      ],
      isLoading: false,
      error: null,
    } as any);

    const order: OrderObj = {
      orderId: 1,
      date: new Date(),
      price: 0,
      paymentMethod: "creditCard",
      customerId: 1,
      orderItems: [
        {
          itemId: 1,
          quantity: 2,
        },
        {
          itemId: 2,
          quantity: 4,
        },
      ],
    };

    useUserStore.setState({ order });

    render(<Order />);

    expect(getByTextContent("Total20kr")).toBeInTheDocument();
    expect(getByTextContent("Total120kr")).toBeInTheDocument();
    expect(getByTextContent("Total Price:140kr")).toBeInTheDocument();
  });

  it("order removed when no items", async () => {
    const user = userEvent.setup();

    vi.mocked(useQuery).mockReturnValue({
      data: [
        {
          id: 2,
          title: "Product 2",
          price: 30,
          category: "Category 1",
          onSale: true,
          picture: "picture_url",
          saldo: 1,
        },
      ],
      isLoading: false,
      error: null,
    } as any);

    const order: OrderObj = {
      orderId: 1,
      date: new Date(),
      price: 0,
      paymentMethod: "creditCard",
      customerId: 1,
      orderItems: [
        {
          itemId: 2,
          quantity: 1,
        },
      ],
    };

    useUserStore.setState({ order });

    render(<Order />);

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(document.querySelector(".order-empty")).toBeInTheDocument();
  });

  it("order cannot overcome available stock", async () => {
    const user = userEvent.setup();

    vi.mocked(useQuery).mockReturnValue({
      data: [
        {
          id: 2,
          title: "Product 2",
          price: 30,
          category: "Category 1",
          onSale: true,
          picture: "picture_url",
          saldo: 1,
        },
      ],
      isLoading: false,
      error: null,
    } as any);

    const order: OrderObj = {
      orderId: 1,
      date: new Date(),
      price: 0,
      paymentMethod: "creditCard",
      customerId: 1,
      orderItems: [
        {
          itemId: 2,
          quantity: 1,
        },
      ],
    };

    useUserStore.setState({ order });

    render(<Order />);

    expect(getByTextContent("Total30kr")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(getByTextContent("Total30kr")).toBeInTheDocument();
  });

  it("payment method can be changed in orderObj", async () => {
    const user = userEvent.setup();

    vi.mocked(useQuery).mockReturnValue({
      data: [
        {
          id: 2,
          title: "Product 2",
          price: 30,
          category: "Category 1",
          onSale: true,
          picture: "picture_url",
          saldo: 1,
        },
      ],
      isLoading: false,
      error: null,
    } as any);

    const order: OrderObj = {
      orderId: 1,
      date: new Date(),
      price: 0,
      paymentMethod: "creditCard",
      customerId: 1,
      orderItems: [
        {
          itemId: 2,
          quantity: 1,
        },
      ],
    };

    useUserStore.setState({ order });

    render(<Order />);

    expect((useUserStore.getState() as any).order.paymentMethod).toBe(
      "creditCard"
    );

    const select = screen.getByLabelText("Payment Method:");
    await user.selectOptions(select, "swish");

    expect((useUserStore.getState() as any).order.paymentMethod).toBe("swish");
  });
});