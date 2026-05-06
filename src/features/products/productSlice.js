 import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { generateStock } from "../../utils/stockHelper";


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    return data.map((item) => ({
      ...item,
      stock: generateStock(),
    }));
  }
);


export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return await response.json(); 
  }
);


const initialState = {
  items: [],
  categories: [],
  selectedCategory: "all",
  loading: false,
  categoriesLoading: false,
  error: null,
};


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
     
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      })

      
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesLoading = false;
        state.error = "Failed to fetch categories";
      });
  },
});


export const { setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
