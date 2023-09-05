import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AuthStateType from "../../types/AuthStateType";
import User from "../../types/User";

const initialState: AuthStateType = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthStateType, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUserState : (state:AuthStateType) => {
      state.user = null;
    }
  },
});

export const { setUser,clearUserState } = authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
