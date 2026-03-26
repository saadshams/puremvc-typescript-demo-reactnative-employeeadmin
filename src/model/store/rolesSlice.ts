import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../valueObject/Role";

export interface RolesState {
  list: Role[];
}

const initialState: RolesState = {
  list: [],
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.list = action.payload;
    },
    setRoleById: (state, action: PayloadAction<Role>) => {
      const incoming = action.payload;
      const index = state.list.findIndex((role: Role) => role.id === incoming.id);
      if (index >= 0) {
        state.list[index] = incoming;
      } else {
        state.list.push(incoming);
      }
    },
  },
});

export const { setRoles, setRoleById } = rolesSlice.actions;
export default rolesSlice.reducer;

