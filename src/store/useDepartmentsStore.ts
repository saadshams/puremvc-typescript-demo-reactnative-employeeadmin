import { create } from "zustand";
import { Department } from "../model/valueObject/Department";

interface DepartmentsStoreState {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
}

const useDepartmentsStore = create<DepartmentsStoreState>((set) => ({
  departments: [],
  setDepartments: (departments: Department[]) => set({ departments })
}));

export default useDepartmentsStore;
