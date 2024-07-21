// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { productApi } from "./services/productApi";
import { collectionApi } from "./services/collectionApi";
import { categoryApi } from "./services/categoryApi";
import { colorApi } from "./services/colorApi";
import { authApi } from "./services/authApi";
import { cartApi } from "./services/cartApi";
import { orderApi } from "./services/orderApi";
import { addressApi } from "./services/addressApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      collectionApi.middleware,
      categoryApi.middleware,
      colorApi.middleware,
      authApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
      addressApi.middleware
    ),
});
