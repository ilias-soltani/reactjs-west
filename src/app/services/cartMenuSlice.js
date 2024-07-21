import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartMenu: false,
};

const cartMenuSlice = createSlice({
  name: "CartMenu",
  initialState,
  reducers: {
    setCartMenu: (state, action) => {
      state.cartMenu = action.payload;
    },
  },
});

export const { setCartMenu } = cartMenuSlice.actions;

export default cartMenuSlice.reducer;
