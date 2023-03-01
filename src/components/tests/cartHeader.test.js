import CartHeader from "../cart/cartHeader";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

describe("CartHeader", () => {
  it("should create CartHeader", () => {
    act(() => {
      createRoot(container).render(<CartHeader />);
    });
    expect(container).toMatchSnapshot();
  });
});
