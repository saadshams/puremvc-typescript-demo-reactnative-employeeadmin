import { create } from "zustand";
import { Role } from "../model/valueObject/Role";

interface RolesStoreState {
  roles: Role[];
  setRoles: (roles: Role[]) => void;
}

const useRolesStore = create<RolesStoreState>((set) => ({
  roles: [],
  setRoles: (roles: Role[]) => set({ roles })
}));

export default useRolesStore;
