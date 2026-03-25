import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, updateUser } from "./users.api";
import type { CreateUserPayload, UpdateUserPayload } from "./users.api";

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: CreateUserPayload) => createUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (variables: { id: number; payload: UpdateUserPayload }) =>
            updateUser(variables.id, variables.payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};