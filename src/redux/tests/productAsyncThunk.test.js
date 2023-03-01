import { fetchProducts } from "../slices/productSlice";
global.fetch = jest.fn();

describe("productThunk", () => {
  it("should fetchProducts with resolved response", async () => {
    const mockProducts = [
      {
        _id: "123",
        name: "cool good",
        price: 300,
        imgUrl: "./test.img",
      },
    ];
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });
    const pagination = {
      page: 1,
      limit: 10,
      sortField: "",
      sortDir: "",
    };
    const dispatch = jest.fn();
    const thunk = fetchProducts(pagination);
    await thunk(dispatch);

    // console.log(dispatch.mock.calls);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe("product/fetchProducts/pending");
    expect(end[0].type).toBe("product/fetchProducts/fulfilled");
    expect(end[0].payload).toBe(mockProducts);
  });

  it("should fetchProducts with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    const pagination = {
      page: 1,
      limit: 10,
      sortField: "",
      sortDir: "",
    };
    const dispatch = jest.fn();
    const thunk = fetchProducts(pagination);
    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe("product/fetchProducts/pending");
    expect(end[0].type).toBe("product/fetchProducts/rejected");
    expect(end[0].meta.rejectedWithValue).toBe(true);
    expect(end[0].payload).toBe("Server error");
  });
});
