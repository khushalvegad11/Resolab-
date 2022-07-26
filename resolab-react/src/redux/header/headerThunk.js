import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";

export const fetchLoginStatus = createAsyncThunk(
  "header/fatchLoginStatus",
  async (payload) => {
    const response = await api.get("login");
    return response.data;
  }
);