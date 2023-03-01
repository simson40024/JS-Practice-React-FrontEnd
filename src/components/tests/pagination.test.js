import Pagination from "../shopping/pagination";
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
  pagination: {
    currentPage: 2,
    limitOnPage: 10,
    total: 4,
  },
};

const mockSelector = jest.spyOn(hooks, "useAppSelector");
const mockDispatch = jest.spyOn(hooks, "useAppDispatch");

describe("pagination", () => {
  it("shoud create Pagination", () => {
    mockSelector.mockImplementation((selector) => selector(state));
    mockDispatch.mockReturnValue(jest.fn());
    act(() => {
      createRoot(container).render(<Pagination />);
    });
    expect(container).toMatchSnapshot();
  });
});
