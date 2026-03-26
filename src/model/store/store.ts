import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import rolesReducer from "./rolesSlice";
import departmentsReducer from "./departmentsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    roles: rolesReducer,
    departments: departmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
