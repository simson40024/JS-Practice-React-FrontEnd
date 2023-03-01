import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userInfo = {
  value: {
    name:string | null;
    token:string | null;
  }
}

const initialState: userInfo = {
  value: {
    name: "",
    token: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action:PayloadAction<string | null>) => {
      state.value.name = action.payload;
    },
    setToken: (state, action:PayloadAction<string | null>) => {
      state.value.token = action.payload;
    },
  },
});
export const { setUserName, setToken } = userSlice.actions;

export default userSlice.reducer;

