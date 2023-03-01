import paginationReducer, {
  increment,
  decrement,
  setPageValue,
  setLimitOnPage,
  setTotal,
} from "../slices/paginationSlice";

const initialState = {
  currentPage: 1,
  limitOnPage: 10,
  total: 1,
};

const currentState = {
  currentPage: 2,
  limitOnPage: 20,
  total: 4,
};

describe("painationSlice", () => {
  it("should return default state when passed an empty action", () => {
    const result = paginationReducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should increase current page with 'increment' action", () => {
    const action = { type: increment.type, payload: undefined };
    const result = paginationReducer(currentState, action);
    expect(result.currentPage).toBe(3);
  });

  it("should decrease current page with 'decrement' action", () => {
    const action = { type: decrement.type, payload: undefined };
    const result = paginationReducer(currentState, action);
    expect(result.currentPage).toBe(1);
  });

  it("should set current page value with 'setPageValue' action", () => {
    const action = {
      type: setPageValue,
      payload: { currentPage: 3, limitOnPage: 20, total: 4 },
    };
    const result = paginationReducer(currentState, action);
    expect(result.currentPage).toBe(3);
  });

  it("should set limit on page and reset current page with 'setLimitOnPage' action", () => {
    const action = { type: setLimitOnPage.type, payload: 30 };
    const result = paginationReducer(currentState, action);
    expect(result.limitOnPage).toBe(30);
    expect(result.currentPage).toBe(1);
  });

  it("should set total numbers of products with 'setTotal' action", () => {
    const action = { type: setTotal.type, payload: 88 };
    const result = paginationReducer(currentState, action);
    expect(result.total).toBe(88);
  });
});
