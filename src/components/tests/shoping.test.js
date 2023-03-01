import Shopping from "../shopping/shopping";
import { createRoot } from "react-dom/client";
import { screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react";
// import { act } from "react-dom/test-utils";
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
  user: {
    value: {
      name: "UserName",
      token: "UserTokken",
    },
  },
  pagination: {
    currentPage: 2,
    limitOnPage: 10,
    total: 4,
  },
  sorting: {},
  currency: {
    currency: "UAH",
    rate: 38.5,
  },
  product: {
    products: [
      { _id: "123", name: "first product", price: 30, imgUrl: "/img.ipg" },
      { _id: "134", name: "second product", price: 30, imgUrl: "/img.ipg" },
    ],
    status: "loaded",
    error: null,
  },
  cart: {},
};

const mock = jest.spyOn(hooks, "useAppSelector");
const mockDispatch = jest.spyOn(hooks, "useAppDispatch");
describe("Shopping", () => {
  it("should create Shopping", () => {
    mock.mockImplementation((selector) => selector(state));

    mockDispatch.mockReturnValue(jest.fn());
    act(() => {
      createRoot(container).render(<Shopping />);
    });
    expect(container).toMatchSnapshot();
  });

  // it("shold checked button add-to-cart", () => {
  //   mock.mockImplementation((selector) => selector(state));
  //   mockDispatch.mockReturnValue(jest.fn());

  //   // const mockAddButton = jest.spyOn(Product.prototype, "addProductToCart");
  //   const mockAddButton = jest.fn();

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
