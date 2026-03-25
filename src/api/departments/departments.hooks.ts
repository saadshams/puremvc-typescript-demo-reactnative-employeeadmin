import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "./departments.api";

export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
};

