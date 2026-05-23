import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // Reducer for authentication
import addCategoryReducer from "../slices/category/addCategorySlice"; // Reducer for category management
import catergoryListReducer from "../slices/category/categoryListSlice"
import deleteCategoryRedcucer from "../slices/category/deleteCategorySlice" // Reducer for product management
import addSupplierReducer from "../slices/supplier/addSupplier";
import supplierListReducer from "../slices/supplier/supplierSlice";
import unitListReducer from "../slices/unit/unitSlice";
import addUnitReducer from "../slices/unit/addUnitSlice";
import productReducer from "../slices/product/productSlice.ts"
import { useDispatch } from "react-redux";

// Create Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Authentication state
    addCategory: addCategoryReducer, // Category state
    productList: productReducer,
    categoryList: catergoryListReducer,
    deleteCategory: deleteCategoryRedcucer,
    supplierList: supplierListReducer,
    addSupplier: addSupplierReducer,
    unitList: unitListReducer,
    addUnit: addUnitReducer
  },
});

// TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed useDispatch hook for better TypeScript support
export const useAppDispatch: () => AppDispatch = useDispatch;
