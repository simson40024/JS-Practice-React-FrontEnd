import Product from "../shopping/product";
import { createRoot } from "react-dom/client";
import { screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";
import * as hooks from "../../hook";

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

const state = {
  user: {
    value: {
      name: "",
      token: "",
    },
  },
  pagination: {},
  sorting: {},
  currency: {
    currency: "UAH",
    rate: 38.5,
  },
  product: {
    products: [],
    status: "loaded",
    error: null,
  },
  cart: {
    products: [
      {
        id: "123",
        quantity: 3,
        name: "this cool t-shot",
        price: 10,
        imgUrl: "./test.img",
      },
    ],
    status: "loaded",
    error: null,
  },
};

const mock = jest.spyOn(hooks, "useAppSelector");
const mockDispatch = jest.spyOn(hooks, "useAppDispatch");
describe("Product", () => {
  it("should create Product with props", () => {
    mock.mockImplementation((selector) => selector(state));

    mockDispatch.mockReturnValue(jest.fn());
    act(() => {
      createRoot(container).render(
        <Product
          key="123"
          id="123"
          name="this cool t-shot"
          price="10"
          imgUrl="./test.img"
        />
      );
    });
    expect(container).toMatchSnapshot();
  });

  // it("shold checked button add-to-cart", () => {
  //   mock.mockImplementation((selector) => selector(state));
  //   mockDispatch.mockReturnValue(jest.fn());

  //   // const mockAddButton = jest.spyOn(Product.prototype, "addProductToCart");
  //   const mockAddButton = jest.fn();
  //   // const addBut = Product.addProductToCart(state.user, state.cart);
  //   act(() => {
  //     createRoot(container).render(
  //       <Product
  //         key="123"
  //         id="123"
  //         name="this cool t-shot"
  //         price="10"
  //         imgUrl="./test.img"
  //       />
  //     );
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: "add to cart" }));
  //   expect(mockAddButton).toHaveBeenCalled();
  // });
});
