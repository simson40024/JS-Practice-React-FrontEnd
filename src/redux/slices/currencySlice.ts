import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type currency ={
  currency: string;
  rate: number;
}

const initialState: currency = {
  currency: "UAH",
  rate: 1,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setRate: (state, action: PayloadAction<number>) => {
      state.rate = action.payload;
    },
  },
});
export const { setCurrency, setRate } = currencySlice.actions;

export default currencySlice.reducer;
