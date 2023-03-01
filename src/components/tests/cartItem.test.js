import CartItem from "../cart/cartItem";
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
  currency: {
    currency: "UAH",
    rate: 38,
  },
};

const mock = jest.spyOn(hooks, "useAppSelector");
const mockDispatch = jest.spyOn(hooks, "useAppDispatch");

describe("CartItem", () => {
  it("should create CartItem", () => {
    mock.mockImplementation((selector) => selector(state));
    const total = 150;
    act(() => {
      createRoot(container).render(
        <CartItem
          id="12345"
          name="cool T-shot"
          price={10}
          quantity={2}
          imgUrl="./img.jpg"
        />
      );
    });
    expect(container).toMatchSnapshot();
  });
});
