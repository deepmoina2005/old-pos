import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchUnitAPI } from "../../../services/unit/fetchUnitService.ts";
import { deleteUnitAPI } from "../../../services/unit/deleteUnitService.ts";

interface UnitData {
    id: number; // Assuming you have an ID to identify the unit
    name: string;
    pcs?: string;
    created_at: string;
    updated_at: string;
}

interface UnitListState {
    units: UnitData[];
    isLoading: boolean;
    error: string | null;
}

const initialState: UnitListState = {
    units: [],
    isLoading: false,
    error: null,
};
export const appUnitSlice = createAsyncThunk("unit/add", async (_, { }) => {

})
// FETCH
export const fetchUnitAction = createAsyncThunk(
    "unit/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchUnitAPI();
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch categories.");
            return rejectWithValue(error.response?.data);
        }
    }
);

// DELETE
export const deleteUnitAction = createAsyncThunk(
    "unit/delete",
    async (unit: UnitData, { rejectWithValue }) => {
        try {
            await deleteUnitAPI(unit);
            toast.success("unit deleted successfully.");
            return unit.id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete unit.");
            return rejectWithValue(error.response?.data);
        }
    }
);

const unitSlice = createSlice({
    name: "unit",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchUnitAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUnitAction.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                state.units = action.payload;
            })
            .addCase(fetchUnitAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteUnitAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUnitAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.units = state.units.filter(
                    (cat) => cat.id !== action.payload
                );
            })
            .addCase(deleteUnitAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

    },
});

export default unitSlice.reducer;