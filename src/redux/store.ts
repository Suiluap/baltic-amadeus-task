import { configureStore } from "@reduxjs/toolkit";
import gifReducer from "./slices/gifSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

const store = configureStore({
  reducer: {
    gif: gifReducer,
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
