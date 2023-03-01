import ProductList from "../shopping/productList";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import * as hooks from "../../hook";
import { Provider } from "react-redux";
import store from "../../redux/store";

const InitialState = {
  products: [],
  status: "loading",
  error: null,
};

const productState = {
  products: [
    { _id: "123", name: "first product", price: 30, imgUrl: "/img.ipg" },
    { _id: "134", name: "second product", price: 30, imgUrl: "/img.ipg" },
  ],
  status: "loaded",
  error: null,
};

const stateWithLoadingError = {
  products: [],
  status: "rejected",
  error: "Network error. Data don`t loaded",
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

const mock = jest.spyOn(hooks, "useAppSelector");
//не забудь замінити це нижче

describe("ProductList", () => {
  it("should create ProductList with filled Products", () => {
    mock.mockReturnValue(productState);
    act(() => {
      createRoot(container).render(
        <Provider store={store}>
          <ProductList />
        </Provider>
      );
    });
    expect(container).toMatchSnapshot();
  });

  it("should create ProductList with empty Products", () => {
    jest.spyOn(hooks, "useAppSelector").mockReturnValue(InitialState);
    act(() => {
      createRoot(container).render(
        <Provider store={store}>
          <ProductList />
        </Provider>
      );
    });
    expect(container).toMatchSnapshot();
  });

  it("should create ProductList with empty Products, and show LOADING ERRER", () => {
    jest.spyOn(hooks, "useAppSelector").mockReturnValue(stateWithLoadingError);
    act(() => {
      createRoot(container).render(
        <Provider store={store}>
          <ProductList />
        </Provider>
      );
    });
    expect(container).toMatchSnapshot();
  });
});
