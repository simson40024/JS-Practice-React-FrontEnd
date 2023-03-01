import Menu from "../header/menu";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

describe("Menu", () => {
  it("shoud create Menu", () => {
    act(() => {
      createRoot(container).render(
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      );
    });
    expect(container).toMatchSnapshot();
  });
});
