import { create } from "zustand";
import { User } from "../model/valueObject/User";

interface UsersStoreState {
  users: User[];
  setUsers: (users: User[]) => void;
}

const useUsersStore = create<UsersStoreState>((set) => ({
  users: [],
  setUsers: (users: User[]) => set({ users })
}));

export default useUsersStore;
