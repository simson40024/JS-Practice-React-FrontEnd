import productReduser, { fetchProducts } from "../slices/productSlice";

const initialState = {
  products: [],
  status: null,
  error: null,
};

describe("productReducer", () => {
  it("shuld change status with 'fetchProducts.pending' action", () => {
    const state = productReduser(initialState, fetchProducts.pending());
    expect(state.status).toBe("loading");
    expect(state.error).toBe(null);
  });

  it("shuld fetch products with 'fetchProducts.fulfilled' action", () => {
    const products = [
      {
        _id: "123",
        name: "cool good",
        price: 300,
        imgUrl: "./test.img",
      },
    ];
    const state = productReduser(
      initialState,
      fetchProducts.fulfilled(products)
    );

    expect(state).toEqual({
      products: products,
      status: "loaded",
      error: null,
    });
  });

  it("shuld change status and error with 'fetchProducts.rejected' action", () => {
    const state = productReduser(
      initialState,
      fetchProducts.rejected("Server error")
    );
    expect(state).toEqual({
      products: [],
      status: "rejected",
      error: "Server error",
    });
  });
});
