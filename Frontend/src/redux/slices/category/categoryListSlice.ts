import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchCategoryAPI } from "../../../services/category/fetchCategoryService";
import { deleteCategoryAPI } from "../../../services/category/deleteCategoryService";
import { updateCategoryAPI } from "../../../services/category/categoryUpdateService";
import { addCategoryAPI } from "../../../services/category/addCategoryService";

interface CategoryData {
  id: number;
  name: string;
  description: string;
  status: number;
}

type addCategoryData = Pick<CategoryData ,'name' | 'description' >; 

interface CategoryListState {
  categories: CategoryData[];
  isLoading: boolean;
  isSuccess:boolean;
  error: string | null;
}

const initialState: CategoryListState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

//ADD 
export const addCategoryAction = createAsyncThunk(
  "category/add",
  async (categoryData: addCategoryData, { rejectWithValue }) => {
    try {
      const response = await addCategoryAPI(categoryData);
      toast.success(response.message);
      return response;  // Return the response data
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add category.");
      return rejectWithValue(error.response?.data);  // Return error data
    }
  }
);


// FETCH
export const fetchCategoryAction = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCategoryAPI();
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch categories.");
      return rejectWithValue(error.response?.data);
    }
  }
);

// DELETE
export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (category: CategoryData, { rejectWithValue }) => {
    try {
      const response = await deleteCategoryAPI(category);
      toast.success("Category deleted successfully.");
      return category.id;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete category.");
      return rejectWithValue(error.response?.data);
    }
  }
);

// UPDATE
export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (category: CategoryData, { rejectWithValue }) => {
    try {
      const response = await updateCategoryAPI(category);
      toast.success("Category updated successfully.");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update category.");
      return rejectWithValue(error.response?.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetAddCategoryState: (state) => {
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCategoryAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //ADD 
      .addCase(addCategoryAction.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(addCategoryAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addCategoryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      })


      // DELETE
      .addCase(deleteCategoryAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategoryAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        );
      })
      .addCase(deleteCategoryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateCategoryAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategoryAction.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log( action.payload);
        state.categories = state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
      })
      .addCase(updateCategoryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAddCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
