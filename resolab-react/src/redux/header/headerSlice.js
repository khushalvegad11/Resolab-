import { createSlice } from "@reduxjs/toolkit";
import { fetchLoginStatus } from "./headerThunk";
import _ from "lodash";

export const HeaderSlice = createSlice({
  name: "HeaderSlice",
  initialState: {
    showLoginSignupModal: false,
    Login: [],
  },
  reducers: {
    setShowLoginSignupModal: (state, action) => {
      state.showLoginSignupModal = action.payload;
    },
  },
  extraReducers: {
    [fetchLoginStatus.fulfilled]: (state, { payload }) => {
      return { ...state, Login: payload };
    },
  },
});

export const { setShowLoginSignupModal } = HeaderSlice.actions;

export default HeaderSlice.reducer;
