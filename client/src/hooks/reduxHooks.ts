import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { AnyAction } from "redux";
import type { ThunkAction } from "redux-thunk";
import type { RootState, AppDispatch } from "../redux/store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = Promise<AnyAction>> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
