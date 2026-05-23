import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User type definition
export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// Auth state definition
interface AuthState {
  user: User | null;
}

// Safely parse localStorage value
const storedUser = localStorage.getItem("userInfo");
const initialState: AuthState = {
  user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logoutAction: (state) => {
      localStorage.removeItem("userInfo");
      state.user = null;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;