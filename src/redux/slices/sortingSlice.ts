import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type sorting ={
  field: string;
  direction: string;
}

const initialState: sorting = {
  field: "",
  direction: "",
};

const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<sorting>) => {
      const sorting = action.payload;
      state.field = sorting.field;
      state.direction = sorting.direction;
    },
  },
});
export const { setSorting } = sortingSlice.actions;

export default sortingSlice.reducer;
