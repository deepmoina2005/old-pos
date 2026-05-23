import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchSupplierAPI } from "../../../services/supplier/fetchSupplierService";
import { deleteSupplierAPI } from "../../../services/supplier/deleteSupplierServie";
import { updateSupplierAPI } from "../../../services/supplier/updateSupplierService";

interface SupplierData {
    id: number; // Assuming you have an ID to identify the supplier
    name: string;
    phone: string;
    address: string
}

interface SupplierListState {
    suppliers: SupplierData[];
    isLoading: boolean;
    error: string | null;
}

const initialState: SupplierListState = {
    suppliers: [],
    isLoading: false,
    error: null,
};
export const appSupplierSlice = createAsyncThunk("supplier/add", async (_, { }) => {

})
// FETCH
export const fetchSupplierAction = createAsyncThunk(
    "supplier/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchSupplierAPI();
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch categories.");
            return rejectWithValue(error.response?.data);
        }
    }
);

// DELETE
export const deleteSupplierAction = createAsyncThunk(
    "supplier/delete",
    async (supplier: SupplierData, { rejectWithValue }) => {
        try {
            await deleteSupplierAPI(supplier);
            toast.success("supplier deleted successfully.");
            return supplier.id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete supplier.");
            return rejectWithValue(error.response?.data);
        }
    }
);

// UPDATE
export const updateSupplierAction = createAsyncThunk(
    "supplier/update",
    async (supplier: SupplierData, { rejectWithValue }) => {
        try {
            const response = await updateSupplierAPI(supplier);
            toast.success("supplier updated successfully.");
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update supplier.");
            return rejectWithValue(error.response?.data);
        }
    }
);

const supplierSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchSupplierAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSupplierAction.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                state.suppliers = action.payload;
            })
            .addCase(fetchSupplierAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteSupplierAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSupplierAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.suppliers = state.suppliers.filter(
                    (cat) => cat.id !== action.payload
                );
            })
            .addCase(deleteSupplierAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateSupplierAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSupplierAction.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                state.suppliers = state.suppliers.map((cat) =>
                    cat.id === action.payload.id ? action.payload : cat
                );
            })
            .addCase(updateSupplierAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default supplierSlice.reducer;
