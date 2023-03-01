import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type productInCart ={
  id: string;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
}
export type ProductsInCartState = {
  products: productInCart[];
  status: string | null;
  error: string | null;
}

const initialState: ProductsInCartState = {
  products: [],
  status: null,
  error: null,
};

export const fetchCart = createAsyncThunk<productInCart[], string, {rejectValue: string}>(
  "cart/fetchCart",
  async function (userToken, { rejectWithValue }) {
   
      const response = await fetch("http://localhost:8001/cart", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: userToken,
        },
      });
      if (!response.ok) {
        return rejectWithValue ("Server error");
      }
      const data = await response.json();
      return data;
   
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<productInCart>) => {
      const product = action.payload;
      state.products.push({
        id: product.id,
        quantity: product.quantity,
        name: product.name,
        price: product.price,
        imgUrl: product.imgUrl,
      });
    },

    updateCart: (state, action: PayloadAction<{id: string, quantity: number}>) => {
      const product = action.payload;
      state.products.map((item) => {
        return item.id === product.id
          ? (item.quantity = item.quantity + product.quantity)
          : (item.quantity);
      });
    },

    changeQuantityInCart: (state, action: PayloadAction<{id: string, inc: number}>) => {
      switch (action.payload.inc) {
        case 1:
          state.products.map((item) => {
            return item.id === action.payload.id
              ? (item.quantity = item.quantity + action.payload.inc)
              : (item.quantity);
          });
          break;
        case -1:
          state.products.map((item) => {
            return item.id === action.payload.id && item.quantity > 1
              ? (item.quantity = item.quantity + action.payload.inc)
              : (item.quantity);
          });
          break;
      }
    },

    delFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
extraReducers: (builder) => {
  builder
  .addCase (fetchCart.pending, (state)=>{
    state.status = "loading";
    state.error = null;
  })
  .addCase (fetchCart.fulfilled, (state, action)=>{
    state.status = "loaded";
  state.products = action.payload;
  })
  .addCase (fetchCart.rejected, (state, action)=>{
    state.status = "rejected";
    if (action.payload) state.error = action.payload;
  })
}
  // extraReducers: {
  //   [fetchCart.pending]: (state) => {
  //     state.status = "loading";
  //     state.error = null;
  //   },
  //   [fetchCart.fulfilled]: (state, action) => {
  //     state.status = "loaded";
  //     state.products = action.payload;
  //   },
  //   [fetchCart.rejected]: (state, action) => {
  //     state.status = "rejected";
  //     state.error = action.payload;
  //   },
  // },
});
export const {
  addToCart,
  updateCart,
  delFromCart,
  changeQuantityInCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
