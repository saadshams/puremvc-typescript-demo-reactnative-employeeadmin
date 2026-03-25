import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../model/valueObject/User";

export interface UsersState {
  list: User[];
}

const initialState: UsersState = {
  list: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    setUserById: (state, action: PayloadAction<User>) => {
      const incoming = action.payload;
      const index = state.list.findIndex((user: User) => user.id === incoming.id);
      if (index >= 0) {
        state.list[index] = incoming;
      } else {
        state.list.push(incoming);
      }
    },
  },
});

export const { setUsers, setUserById } = usersSlice.actions;
export default usersSlice.reducer;
