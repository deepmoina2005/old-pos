/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addSupplierAPI } from "../../../services/supplier/addSupplierService";
import toast from "react-hot-toast";

// Define the type for categoryData
interface CategoryData {
  name: string;
  phone: string;
  address:string // Adjust the type if needed (Date, String, etc.)
}

// Async thunk for adding category
export const addSupplierAction = createAsyncThunk(
  "supplier/add",
  async (categoryData: CategoryData, { rejectWithValue }) => {
    try {
      const response = await addSupplierAPI(categoryData);
      return response;  // Return the response data
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add category.");
      return rejectWithValue(error.response?.data);  // Return error data
    }
  }
);

interface AddCategoryState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

const initialState: AddCategoryState = {
  isLoading: false,
  isSuccess: false,
  error: null,
};

const addCategorySlice = createSlice({
  name: "addSupplier",
  initialState,
  reducers: {
    resetAddCategoryState: (state) => {
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSupplierAction.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(addSupplierAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addSupplierAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAddCategoryState } = addCategorySlice.actions;
export default addCategorySlice.reducer;