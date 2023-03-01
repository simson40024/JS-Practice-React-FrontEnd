import Sorting from "../shopping/sorting";
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

const mockDispatch = jest.spyOn(hooks, "useAppDispatch");

describe("sorting", () => {
  it("shoud create Sorting", () => {
    mockDispatch.mockReturnValue(jest.fn());
    act(() => {
      createRoot(container).render(<Sorting />);
    });
    expect(container).toMatchSnapshot();
  });
});
