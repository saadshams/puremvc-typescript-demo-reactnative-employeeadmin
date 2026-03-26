import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Department } from "../valueObject/Department";

export interface DepartmentsState {
  list: Department[];
}

const initialState: DepartmentsState = {
  list: [],
};

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setDepartments: (state, action: PayloadAction<Department[]>) => {
      state.list = action.payload;
    },
    setDepartmentById: (state, action: PayloadAction<Department>) => {
      const incoming = action.payload;
      const index = state.list.findIndex((department: Department) => department.id === incoming.id);
      if (index >= 0) {
        state.list[index] = incoming;
      } else {
        state.list.push(incoming);
      }
    },
  },
});

export const { setDepartments, setDepartmentById } = departmentsSlice.actions;
export default departmentsSlice.reducer;

