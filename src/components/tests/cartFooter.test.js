import CartFooter from "../cart/cartFooter";
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
describe("CartFooter", () => {
  it("should create CartFooter", () => {
    mock.mockImplementation((selector) => selector(state));
    const total = 150;
    act(() => {
      createRoot(container).render(<CartFooter total={total} />);
    });
    expect(container).toMatchSnapshot();
  });
});
