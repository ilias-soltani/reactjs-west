// src/redux/reducers/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import { productApi } from "./services/productApi";
import { collectionApi } from "./services/collectionApi";
import { categoryApi } from "./services/categoryApi";
import { colorApi } from "./services/colorApi";
import { authApi } from "./services/authApi";
import { cartApi } from "./services/cartApi";
import { orderApi } from "./services/orderApi";
import { addressApi } from "./services/addressApi";
import cartMenuSlice from "./services/cartMenuSlice";
import { RESET_APP } from "./actions";

const appReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  [collectionApi.reducerPath]: collectionApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [colorApi.reducerPath]: colorApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  CartMenu: cartMenuSlice,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    return appReducer(
      {
        ...state,
        [cartApi.reducerPath]: undefined,
        [orderApi.reducerPath]: undefined,
        [addressApi.reducerPath]: undefined,
      },
      action
    );
  }
  return appReducer(state, action);
};

export default rootReducer;
