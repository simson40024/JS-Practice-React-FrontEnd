import Cart from "../cart/cart";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import * as hooks from "../../hook";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

const state = {
  user: {
    value: {
      name: "",
      token: "",
    },
  },
  currency: {
    currency: "UAH",
    rate: 38,
  },
  cart: {
    products: [
      {
        id: "12345",
        name: "cool t-shot",
        quantity: 2,
        price: 20,
        imgUrl: "./img1.jpg",
      },
      {
        id: "67890",
        name: "cool dress",
        quantity: 1,
        price: 50,
        imgUrl: "./img1.jpg",
      },
    ],
  },
};

const mock = jest.spyOn(hooks, "useAppSelector");
const mockDispatch = jest.spyOn(hooks, "useAppDispatch");

describe("Cart", () => {
  it("should create Cart", () => {
    mock.mockImplementation((selector) => selector(state));
    mockDispatch.mockReturnValue(jest.fn());
    const total = 150;
    act(() => {
      createRoot(container).render(<Cart />);
    });
    expect(container).toMatchSnapshot();
  });
});
