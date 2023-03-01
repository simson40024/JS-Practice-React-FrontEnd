import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type pagination = {
  currentPage: number,
  limitOnPage: number,
  total: number,
};

const initialState: pagination = {
  currentPage: 1,
  limitOnPage: 10,
  total: 1,
};

const paginationSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    increment: (state) => {
      state.currentPage += 1;
    },
    decrement: (state) => {
      state.currentPage -= 1;
    },
    setPageValue: (state, action: PayloadAction<pagination>) => {
      const pages = action.payload;
      state.currentPage = pages.currentPage;
      state.limitOnPage = pages.limitOnPage;
      state.total = pages.total;
    },

    setLimitOnPage: (state, action: PayloadAction<number>) => {
      state.limitOnPage = action.payload;
      state.currentPage = 1;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});
export const { increment, decrement, setPageValue, setLimitOnPage, setTotal } =
  paginationSlice.actions;

export default paginationSlice.reducer;
