import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type product = {
  _id: string;
  name: string;
  price: number;
  imgUrl: string;
}

type productsState ={
products: product[];
status: string | null;
  error: string | null | undefined;
}

const initialState: productsState = {
  products: [],
  status: null,
  error: null,
};

export const fetchProducts = createAsyncThunk<product[],{page:number, limit:number, sortDir: string, sortField: string},{rejectValue: string}>(
  "product/fetchProducts",
  async function (pages, { rejectWithValue }) {
   
      const startPos = pages.page * pages.limit - pages.limit;
      if (pages.sortDir) {
        const sortDir = pages.sortDir === "increase" ? 1 : -1;
        const response = await fetch(
          `http://localhost:8001/page/${startPos}/${pages.limit}/${pages.sortField}/${sortDir}`
        );
        if (!response.ok) {
          return rejectWithValue("Server error");
        }
        const data = await response.json();
        return data;
      } else {
        const response = await fetch(
          `http://localhost:8001/page/${startPos}/${pages.limit}`
        );
        if (!response.ok) {
          return rejectWithValue("Server error");
        }
        const data = await response.json();
        return data;
      }
     
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
reducers:{},
  extraReducers:(builder)=> {
    builder
    .addCase (fetchProducts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "loaded";
      state.products = action.payload;
    })
    .addCase (fetchProducts.rejected, (state, action) =>{
      state.status = "rejected";
    if (action.error) {state.error = action.error.message} else {state.error = 
    'Network error. Data don`t loaded';}
      
    })
  },

});

export default productSlice.reducer;
