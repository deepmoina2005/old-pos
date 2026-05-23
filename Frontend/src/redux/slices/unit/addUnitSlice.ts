/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUnitAPI } from "../../../services/unit/addUnitService";
import toast from "react-hot-toast";

// Define the type for categoryData
interface UnitData {
    name: string;
    pcs?: string;// Adjust the type if needed (Date, String, etc.)
}

// Async thunk for adding category
export const addUnitAction = createAsyncThunk(
    "unit/add",
    async (unitData: UnitData, { rejectWithValue }) => {
        try {
            const response = await addUnitAPI(unitData);
            return response.data;  // Return the response data
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to add category.");
            return rejectWithValue(error.response?.data);  // Return error data
        }
    }
);

interface AddUnitState {
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
}

const initialState: AddUnitState = {
    isLoading: false,
    isSuccess: false,
    error: null,
};

const addUnitSlice = createSlice({
    name: "addUnit",
    initialState,
    reducers: {
        resetAddCategoryState: (state) => {
            state.isSuccess = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUnitAction.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(addUnitAction.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addUnitAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetAddCategoryState } = addUnitSlice.actions;
export default addUnitSlice.reducer;
