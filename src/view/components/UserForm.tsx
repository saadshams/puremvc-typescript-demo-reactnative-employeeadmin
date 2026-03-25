//
//  UserForm.tsx
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { ParamList } from "../../ApplicationConstants";
import { UserVO } from "../../model/valueObject/UserVO";
import { useCreateUser, useUpdateUser } from "../../api/users/users.hooks";
import type { User as ApiUser } from "../../api/users/users.types";
import type { CreateUserPayload, UpdateUserPayload } from "../../api/users/users.api";
import { useDepartments } from "../../api/departments/departments.hooks";
import type { Department } from "../../api/departments/departments.types";
import { useRoles } from "../../api/roles/roles.hooks";
import type { Role } from "../../api/roles/roles.types";

interface Props {
  navigation: NativeStackNavigationProp<ParamList, "UserForm">;
  route: RouteProp<ParamList, "UserForm">;
}

export interface IUserForm {
  USER_FETCH: string;
  USER_SAVE: string;
  USER_UPDATE: string;
  setUser: (data: UserVO) => void;
  goBack: (user: UserVO) => void;
}

type FormState = {
  id: number;
  username: string;
  first: string;
  last: string;
  email: string;
  password: string;
  confirm: string;
  departmentId: number | null;
  roleIds: number[];
};

const looksLikeUserVO = (value: UserVO | ApiUser): value is UserVO => {
  const anyValue = value as any;
  return Boolean(anyValue?.confirm !== undefined && anyValue?.department?.ordinal !== undefined);
};

const mapIncomingUserToFormState = (
  incoming: UserVO | ApiUser,
  overrides?: { departmentId?: number | null; roleIds?: number[] }
): FormState => {
  if (looksLikeUserVO(incoming)) {
    return {
      id: incoming.id ?? 0,
      username: incoming.username ?? "",
      first: incoming.first ?? "",
      last: incoming.last ?? "",
      email: incoming.email ?? "",
      password: incoming.password ?? "",
      confirm: incoming.confirm ?? incoming.password ?? "",
      departmentId: overrides?.departmentId ?? incoming.department?.ordinal ?? null,
      roleIds: overrides?.roleIds ?? incoming.roles.map((r) => r.ordinal),
    };
  }

  return {
    id: incoming.id ?? 0,
    username: incoming.username ?? "",
    first: incoming.first ?? "",
    last: incoming.last ?? "",
    email: incoming.email ?? "",
    password: incoming.password ?? "",
    confirm: incoming.password ?? "",
    departmentId: overrides?.departmentId ?? incoming.department?.id ?? null,
    roleIds: overrides?.roleIds ?? (incoming.roles ?? []).map((r) => r.id),
  };
};

const toCreatePayload = (form: FormState, departments: Department[], roles: Role[]): CreateUserPayload => {
  const department =
    form.departmentId === null
      ? undefined
      : departments.find((d) => d.id === form.departmentId);

  const resolvedDepartment = department ?? { id: form.departmentId ?? -1, name: "" };
  const resolvedRoles = form.roleIds
    .map((id) => roles.find((r) => r.id === id))
    .filter((r): r is Role => r !== undefined);

  return {
    username: form.username,
    first: form.first,
    last: form.last,
    email: form.email,
    password: form.password,
    department: {
      id: resolvedDepartment.id,
      name: resolvedDepartment.name,
    },
    roles: resolvedRoles.map((r) => ({ id: r.id, name: r.name })),
  };
};

const toUpdatePayload = (form: FormState, departments: Department[], roles: Role[]): UpdateUserPayload => {
  const department =
    form.departmentId === null
      ? undefined
      : departments.find((d) => d.id === form.departmentId);

  const resolvedDepartment = department ?? { id: form.departmentId ?? -1, name: "" };
  const resolvedRoles = form.roleIds
    .map((id) => roles.find((r) => r.id === id))
    .filter((r): r is Role => r !== undefined);

  const payload: UpdateUserPayload = {
    username: form.username,
    first: form.first,
    last: form.last,
    email: form.email,
    department: { id: resolvedDepartment.id, name: resolvedDepartment.name },
    roles: resolvedRoles.map((r) => ({ id: r.id, name: r.name })),
  };

  if (form.password?.trim() && form.confirm?.trim()) {
    payload.password = form.password;
  }

  return payload;
};

const UserForm: React.FC<Props> = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === "dark";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
          backgroundColor: isDarkMode ? "#000" : "#fff",
        },
        row: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        },
        input: {
          flex: 1,
          height: 40,
          borderWidth: 1,
          borderColor: isDarkMode ? "#444" : "#ccc",
          backgroundColor: isDarkMode ? "#111" : "#fff",
          borderRadius: 4,
          marginHorizontal: 5,
          color: isDarkMode ? "#fff" : "#000",
        },
        button: {
          flex: 1,
          borderRadius: 5,
          marginHorizontal: 5,
          paddingVertical: 8,
        },
        buttonText: {
          color: "#FFFFFF",
          fontSize: 18,
          textAlign: "center",
        },
        cancel: {
          backgroundColor: "#D32F2F",
        },
        save: {
          backgroundColor: "#4CAF50",
        },
        update: {
          backgroundColor: "#2196F3",
        },
        roles: {
          backgroundColor: "#9C27B0",
        },
        errorText: {
          marginBottom: 12,
          color: isDarkMode ? "#ff8a80" : "#d32f2f",
          textAlign: "center",
          fontWeight: "600",
        },
      }),
    [isDarkMode],
  );

  const [form, setForm] = useState<FormState>(() =>
    mapIncomingUserToFormState(route.params.user, {
      departmentId: route.params.departmentId ?? undefined,
      roleIds: route.params.roleIds ?? undefined,
    })
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setForm(
      mapIncomingUserToFormState(route.params.user, {
        departmentId: route.params.departmentId ?? undefined,
        roleIds: route.params.roleIds ?? undefined,
      })
    );
  }, [route.params.departmentId, route.params.roleIds, route.params.user]);

  const { mutateAsync: createUser, isPending: isCreatePending } = useCreateUser();
  const { mutateAsync: updateUser, isPending: isUpdatePending } = useUpdateUser();
  const { data: departments = [], isLoading: isDepartmentsLoading, error: departmentsError } = useDepartments();
  const { data: roles = [], isLoading: isRolesLoading, error: rolesError } = useRoles();

  const isSubmitting = isCreatePending || isUpdatePending;
  const isReferenceLoading = isDepartmentsLoading || isRolesLoading;

  const onChange = useCallback((field: keyof Pick<FormState, "first" | "last" | "email" | "username" | "password" | "confirm">, value: string) => {
    setForm((state) => ({ ...state, [field]: value }));
  }, []);

  const onDeptChange = (raw: string | number) => {
    const id = typeof raw === "number" ? raw : parseInt(String(raw), 10);
    setForm((state) => ({ ...state, departmentId: Number.isFinite(id) ? id : null }));
  };

  const onRoles = () => {
    navigation.navigate("UserRole", { user: route.params.user, roleIds: form.roleIds });
  };

  const onSave = useCallback(async () => {
    setError("");

    const isCreating = form.id === 0;
    const trimmedPassword = form.password?.trim() ?? "";
    const trimmedConfirm = form.confirm?.trim() ?? "";

    if (isCreating) {
      const selectedDepartmentId = form.departmentId;
      const hasValidDepartment =
        typeof selectedDepartmentId === "number" &&
        selectedDepartmentId > 0 &&
        departments.some((d) => d.id === selectedDepartmentId);

      if (!hasValidDepartment) {
        setError("Please select a department.");
        return;
      }

      if (!trimmedPassword) {
        setError("Password is required for new users.");
        return;
      }
      if (trimmedPassword !== trimmedConfirm) {
        setError("Password and confirm do not match.");
        return;
      }
    } else {
      if ((trimmedPassword || trimmedConfirm) && trimmedPassword !== trimmedConfirm) {
        setError("Password and confirm do not match.");
        return;
      }
    }

    try {
      if (isCreating) {
        const payload: CreateUserPayload = toCreatePayload(form, departments, roles);
        await createUser(payload);
      } else {
        const payload: UpdateUserPayload = toUpdatePayload(form, departments, roles);
        await updateUser({ id: form.id, payload });
      }
      navigation.navigate("UserList");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save user.";
      setError(message);
    }
  }, [createUser, departments, form, navigation, roles, updateUser]);

  const placeholderTextColor = isDarkMode ? "#888" : "#666";

  const saveButtonLabel = form.id ? "UPDATE" : "SAVE";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Boolean(departmentsError) && (
        <Text style={styles.errorText}>Error loading departments</Text>
      )}
      {Boolean(rolesError) && <Text style={styles.errorText}>Error loading roles</Text>}
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor={placeholderTextColor}
          value={form.first}
          onChangeText={(value) => onChange("first", value)}
          accessibilityLabel="First Name"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={placeholderTextColor}
          value={form.last}
          onChangeText={(value) => onChange("last", value)}
          accessibilityLabel="Last Name"
          autoCapitalize="words"
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={placeholderTextColor}
          value={form.email}
          onChangeText={(value) => onChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={placeholderTextColor}
          value={form.username}
          onChangeText={(value) => onChange("username", value)}
          autoCapitalize="none"
          accessibilityLabel="Username"
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={placeholderTextColor}
          value={form.password}
          onChangeText={(value) => onChange("password", value)}
          secureTextEntry
          textContentType="password"
          accessibilityLabel="Password"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm"
          placeholderTextColor={placeholderTextColor}
          value={form.confirm}
          onChangeText={(value) => onChange("confirm", value)}
          secureTextEntry
          textContentType="password"
          accessibilityLabel="Confirm Password"
        />
      </View>
      <View style={styles.row}>
        <Picker
          style={styles.input}
          selectedValue={form.departmentId ?? -1}
          onValueChange={onDeptChange}
          accessibilityLabel="Department"
          enabled={!isReferenceLoading}
        >
          <Picker.Item key={-1} label="--None Selected--" value={-1} />
          {departments.map((department) => (
            <Picker.Item key={department.id} label={department.name} value={department.id} />
          ))}
        </Picker>
        <TouchableOpacity style={[styles.button, styles.roles]} onPress={onRoles} accessibilityRole="button" accessibilityLabel="Edit Roles">
          <Text style={styles.buttonText}>ROLES</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Cancel">
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, form.id ? styles.update : styles.save]}
          onPress={onSave}
          accessibilityRole="button"
          accessibilityLabel={saveButtonLabel}
          disabled={isSubmitting || isReferenceLoading}
        >
          {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{saveButtonLabel}</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
    );
};

export default UserForm;
