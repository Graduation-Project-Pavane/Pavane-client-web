import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    customerToken: localStorage.getItem("customerToken")
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("customerToken", action.payload.customerToken);
      state.customerToken = localStorage.getItem("customerToken");
    },

    logout(state) {
      state.customerToken = localStorage.getItem("customerToken");
    }
  }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;