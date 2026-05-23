/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchProductAPI } from "../../../services/product/fetchProductService.ts";
import { deleteProductAPI } from "../../../services/product/deleteProductService.ts";
import { addProductAPI } from "../../../services/product/addProductService";
import { ProductData as addData } from "../../../services/product/addProductService";

interface ProductData {
    id: number;
    unit_id: number;
    name: string;
    description: string;
    selling_price: number;
    cost_price: number;
    stock: number;
    brand: string;
    category_id: number;
    created_at: string;
    updated_at: string;
}

interface ProductListState {
    products: ProductData[];
    isLoading: boolean;
    isSuccess:boolean;
    error: string | null;
}

interface AddProductPayload {
  productData: addData;
}

const initialState: ProductListState = {
    products: [],
    isLoading: false,
    isSuccess:false,
    error: null,
};

// ✅ FETCH
export const fetchProductAction = createAsyncThunk(
    "product/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchProductAPI();
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch products.");
            return rejectWithValue(error.response?.data);
        }
    }
);

// ✅ DELETE
export const deleteProductAction = createAsyncThunk(
    "product/delete",
    async (product_id: number, { rejectWithValue }) => {
        try {
            await deleteProductAPI(product_id);
            toast.success("Product deleted successfully.");
            return product_id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete product.");
            return rejectWithValue(error.response?.data);
        }
    }
);

// ADD 
export const addProductAction = createAsyncThunk(
  "product/addProduct",
  async ({ productData }: AddProductPayload, { rejectWithValue }) => {
    try {
      const response = await addProductAPI(productData);
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      resetProductState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
    extraReducers: (builder) => {
        builder
            // ✅ FETCH
            .addCase(fetchProductAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            //ADD
             .addCase(addProductAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProductAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addProductAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // ✅ DELETE
            .addCase(deleteProductAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter((p) => p.id !== action.payload);
            })
            .addCase(deleteProductAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
