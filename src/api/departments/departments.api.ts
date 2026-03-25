import { apiClient } from "../client";
import { BASE_URL, ENDPOINTS } from "../endpoints";
import { Department } from "./departments.types";

export const getDepartments = async (): Promise<Department[]> => {
  return apiClient<Department[]>(`${BASE_URL}${ENDPOINTS.DEPARTMENTS}`);
};

