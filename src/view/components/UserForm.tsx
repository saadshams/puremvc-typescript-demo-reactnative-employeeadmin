//
//  UserForm.tsx
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { ParamList } from "../../ApplicationConstants";
import { User } from "../../model/valueObject/User";
import { Department } from "../../model/valueObject/Department";
import useUserStore from "../store/useUserStore";

/** Local department options (no API / proxy). */
const FORM_DEPARTMENTS: Department[] = [
  Department.NONE_SELECTED,
  new Department(1, "Accounting"),
  new Department(2, "Sales"),
  new Department(3, "Engineering"),
];

interface Props {
  navigation: NativeStackNavigationProp<ParamList, "UserForm">;
  route: RouteProp<ParamList, "UserForm">;
}

const UserForm: React.FC<Props> = ({ navigation, route }) => {

  const [user, setUser] = useState<User>(() => route.params.user);

  useEffect(() => {
    setUser(route.params.user);
  }, [route.params.user]);

  useEffect(() => {
    const { roles } = route.params.user;
    if (roles !== undefined) {
      setUser((state) => ({ ...state, roles }));
    }
  }, [route.params.user.roles]);

  const onChange = (field: keyof User, value: string) => {
    setUser((state) => ({ ...state, [field]: value } as User));
  };

  const onValueChange = (value: number) => {
    setUser((state) => ({
      ...state,
      department: value === 0 ? Department.NONE_SELECTED : FORM_DEPARTMENTS.find((d) => d.id === value) ?? Department.NONE_SELECTED,
    } as User));
  };

  const onRoles = () => {
    navigation.navigate("UserRole", { user });
  };

  const onSave = () => {
    useUserStore.getState().upsertUser(user);
    navigation.navigate("UserList", {});
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="First Name" value={user.first} onChangeText={(value) => onChange("first", value)} />
        <TextInput style={styles.input} placeholder="Last Name" value={user.last} onChangeText={(value) => onChange("last", value)} />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Email" value={user.email} onChangeText={(value) => onChange("email", value)} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Username" value={user.username} onChangeText={(value) => onChange("username", value)} />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Password" value={user.password} onChangeText={(value) => setUser(({ ...user, password: value } as User))} />
        <TextInput style={styles.input} placeholder="Confirm" value={user.confirm} onChangeText={(value) => setUser(({ ...user, confirm: value } as User))} />
      </View>
      <View style={styles.row}>
        <Picker style={styles.input} selectedValue={user.department?.id} onValueChange={onValueChange}>
          <Picker.Item label="---None Selected---" value="{0}" />
          {FORM_DEPARTMENTS.map((department) => (
            <Picker.Item key={department.key} label={department.name} value={department.id} />
          ))}
        </Picker>
        <TouchableOpacity style={[styles.button, styles.roles]} onPress={onRoles}>
          <Text style={styles.buttonText}>ROLES</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.save]} onPress={onSave}>
          <Text style={styles.buttonText}>{user.id ? "UPDATE" : "SAVE"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    borderColor: "#ccc",
    borderRadius: 4,
    marginHorizontal: 5,
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
    textAlign: "center"
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
});

export default UserForm;
