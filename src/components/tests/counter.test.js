import Counter from "../share/counter";
import { createRoot } from "react-dom/client";
import { screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";

let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  // unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Counter", () => {
  it("should show counter", () => {
    const handleFunc = jest.fn();
    act(() => {
      createRoot(container).render(
        <Counter counter={2} handleClick={handleFunc} />
      );
    });

    expect(container).toMatchSnapshot();
  });

  it("should clicked button - with param = -1", () => {
    const handleFunc = jest.fn();
    act(() => {
      createRoot(container).render(
        <Counter counter={2} handleClick={handleFunc} />
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "-" }));
    expect(handleFunc).toBeCalledWith(-1);
  });

  it("should clicked button + with param = 1", () => {
    const handleFunc = jest.fn();
    act(() => {
      createRoot(container).render(
        <Counter counter={2} handleClick={handleFunc} />
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(handleFunc).toBeCalledWith(1);
  });
});
