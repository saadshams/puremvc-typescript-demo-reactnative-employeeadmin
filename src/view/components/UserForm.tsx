//
//  UserForm.tsx
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useEffect, useMemo, useState } from "react";
import { NativeEventEmitter, NativeModules, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { ApplicationConstants, ParamList } from "../../ApplicationConstants";
import { User } from "../../model/valueObject/User";
import { Department } from "../../model/valueObject/Department";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserForm">;
  route: RouteProp<ParamList, "UserForm">;
}

export interface IUserForm {
  USER_FETCH: string,
  USER_SAVE: string,
  USER_UPDATE: string,
  setUser: (user: User) => void,
  setDepartments: (departments: Department[]) => void,
  goBack: (u: User) => void
}

const UserForm: React.FC<Props> = ( {navigation, route} ) => {

  const [departments, setDepartments] = useState<Department[]>([]); // Application Data
  const [user, setUser] = useState<User>(new User()); // User Data
  const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);

  const component: IUserForm = useMemo(() => ({
    USER_FETCH: "UserFormFetch",
    USER_SAVE: "UserFormSave",
    USER_UPDATE: "UserFormUpdate",
    setUser: setUser,
    setDepartments: setDepartments,
    goBack: (u: User) => {
      navigation.navigate("UserList", { user: u })
    }
  }), [setUser, setDepartments]);

  useEffect(() => { // mount
    emitter.emit(ApplicationConstants.USER_FORM_MOUNTED, component);
    if (route.params?.user.id) { // fetch user - if id is passed from UserList
      emitter.emit(component.USER_FETCH, { id: route.params?.user.id });
    }
    return () => {
      emitter.emit(ApplicationConstants.USER_FORM_UNMOUNTED);
    }
  }, [component]);

  // set roles if roles are passed from User Role
  useEffect(() => {
    if (route.params?.user.roles) { // (race condition)
      setUser((state: User) => (
        {...state, roles: route.params?.user.roles}
      ));
    }
    return () => {}
  }, [route.params]);

  // text fields change handler
  const onChange = (field: keyof User, value: string) => {
    setUser((state: User) => (
      { ...state, [field]: value } as User
    ));
  }

  // department value change handler
  const onValueChange = (value: number, index: number) => {
    setUser((state: User) => (
      { ...state, department: value === 0 ? Department.NONE_SELECTED : departments.find(d => d.id === value)} as User
    ));
  }

  // roles press handler
  const onRoles = (event: any) => {
    navigation.navigate("UserRole", { user: user });
  }

  // save press handler
  const onSave = (event: any) => {
    emitter.emit(user.id === 0 ? component.USER_SAVE : component.USER_UPDATE, {user: user});
  }

  // cancel press handler
  const onCancel = (event: any) => {
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="First Name" value={user?.first} onChangeText={(value) => onChange("first", value)} />
        <TextInput style={styles.input} placeholder="Last Name" value={user?.last} onChangeText={(value) => onChange("last", value)} />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Email" value={user?.email} onChangeText={(value) => onChange("email", value)} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Username" value={user?.username} onChangeText={(value) => onChange("username", value)} />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Password" value={user?.password} onChangeText={(value) => setUser( ({...user, password: value } as User) )} />
        <TextInput style={styles.input} placeholder="Confirm" value={user?.confirm} onChangeText={(value) => setUser( ({...user, confirm: value } as User) )} />
      </View>
      <View style={styles.row}>
        <Picker style={styles.input} selectedValue={user.department?.id} onValueChange={onValueChange}>
          <Picker.Item label="---None Selected---" value="{0}" />
          {departments?.map((department) => (
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
          <Text style={styles.buttonText}>{route.params?.user.id ? "UPDATE" : "SAVE"}</Text>
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
