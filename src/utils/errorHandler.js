import { resetApp } from "../app/actions";
import { Navigate } from "react-router-dom";

const errorHandler = (store) => (next) => (action) => {
  // Check if the action has an error
  if (action.error) {
    const error = action.payload;
    const { dispatch } = store;

    if (error.status === 401) {
      localStorage.removeItem("token");
      dispatch(resetApp());
      // Perform navigation after resetting the app
      window.location.href = "/login";
      action.error = false;
      return;
    }
  }

  // Continue processing the action
  return next(action);
};

export default errorHandler;
