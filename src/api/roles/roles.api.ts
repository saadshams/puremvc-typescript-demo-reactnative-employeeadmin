import { apiClient } from "../client";
import { BASE_URL, ENDPOINTS } from "../endpoints";
import { Role } from "./roles.types";

export const getRoles = async (): Promise<Role[]> => {
  return apiClient<Role[]>(`${BASE_URL}${ENDPOINTS.ROLES}`);
};

