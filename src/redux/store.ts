import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "./slices/paginationSlice";
import userReducer from "./slices/userSlice";
import sortingReducer from "./slices/sortingSlice";
import currencyReducer from "./slices/currencySlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

 const store = configureStore({
  reducer: {
    user: userReducer,
    pagination: paginationReducer,
    sorting: sortingReducer,
    currency: currencyReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;