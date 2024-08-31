import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { NativeEventEmitter, NativeModules, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";

import { ApplicationConstants, ParamList } from "../../ApplicationConstants";
import User from "../../model/valueObject/User";
import Department from "../../model/valueObject/Department";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserForm">;
  route: RouteProp<ParamList, "UserForm">;
}

const UserForm: React.FC<Props> = ( {navigation, route} ) => {

  const [user, setUser] = useState<User>(new User());
  const [departments, setDepartments] = useState<Department[]>([]);
  const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  const ref = useRef({});

  useImperativeHandle(ref, () => ({
    NAME: ApplicationConstants.USER_FORM,

    setUser: setUser,
    setDepartments: setDepartments
  }));

  useEffect(() => { // mount
    emitter.emit(ApplicationConstants.MOUNT, ref.current);
    return () => {
      emitter.emit(ApplicationConstants.UNMOUNT, {name: ApplicationConstants.USER_FORM});
    }
  }, [ref]);

  useEffect(() => { // id passed
    emitter.emit(ApplicationConstants.USER_SELECTED, { id: route.params?.user.id });
    return () => {}
  }, [route.params?.user]);

  useEffect(() => { // Roles passed from UserRole
    console.log(route.params?.user.roles);
  }, [route.params?.user]);

  const onChange = (field: keyof User, value: string) => { // text fields
    setUser((state: User) => (
      { ...state, [field]: value } as User
    ));
  }

  const onValueChange = (value: number, index: number) => { // department
    setUser((state: User) => (
      { ...state, department: departments.find(d => d.id === value)} as User
    ));
  }

  const onRoles = (event: any) => {
    navigation.navigate("UserRole", { user: user });
  }

  const onSave = (event: any) => {
    navigation.pop();
  }

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
        <TextInput style={styles.input} placeholder="Email" value={user?.email} onChangeText={(value) => onChange("last", value)} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Username" value={user?.username} onChangeText={(value) => onChange("username", value)} />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Password" value={user?.password} onChangeText={(value) => setUser( ({...user, password: value } as User) )} />
        <TextInput style={styles.input} placeholder="Confirm" value={user?.confirm} onChangeText={(value) => setUser( ({...user, confirm: value } as User) )} />
      </View>
      <View style={styles.row}>
        <Picker style={styles.input} selectedValue={user.department.id} onValueChange={onValueChange}>
          {departments?.map((department) => (
            <Picker.Item key={department.key} label={department.name} value={department.id} />
          ))}
        </Picker>
        <TouchableOpacity style={[styles.button, styles.roles]} onPress={onRoles}>
          <Text style={styles.buttonText}>ROLES</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onSave}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.save]} onPress={onCancel}>
          <Text style={styles.buttonText}>UPDATE</Text>
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
