import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productAPI";
import type { Product } from "./types";
import toast from "react-hot-toast";

interface ProductState {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  category: string;
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  category: "All",
  loading: false,
};

// FETCH
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { getState }) => {
    const state: any = getState();
    const { currentPage, category } = state.products;
    return await fetchProductsAPI(currentPage, category);
  },
);

// CREATE
export const createProduct = createAsyncThunk(
  "products/create",
  async (product: Product, { dispatch }) => {
    try {
      await createProductAPI(product);
      toast.success("Product created successfully ✅");
      dispatch(fetchProducts());
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Create failed ❌");
    }
  },
);

// UPDATE
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }: { id: string; product: Product }, { dispatch }) => {
    try {
      await updateProductAPI(id, product);
      toast.success("Product updated successfully ✏️");
      dispatch(fetchProducts());
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed ❌");
    }
  },
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, { dispatch }) => {
    try {
      await deleteProductAPI(id);
      toast.success("Product deleted 🗑️");
      dispatch(fetchProducts());
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed ❌");
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPage, setCategory } = productSlice.actions;
export default productSlice.reducer;
