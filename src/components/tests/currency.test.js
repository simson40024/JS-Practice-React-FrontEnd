import Currency from "../header/currency";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import * as hooks from "../../hook";

const InitialState = {
  currency: {
    currency: "USD",
    rate: 1,
  },
};

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

const mockSelector = jest.spyOn(hooks, "useAppSelector");
const mockDispatch = jest.spyOn(hooks, "useAppDispatch");

describe("Currency", () => {
  it("should create Currency with InitialState", () => {
    mockSelector.mockImplementation((selector) => selector(InitialState));
    mockDispatch.mockReturnValue(jest.fn());
    act(() => {
      createRoot(container).render(<Currency />);
    });
    expect(container).toMatchSnapshot();
  });
});
