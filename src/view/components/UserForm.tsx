//
//  UserForm.tsx
//  PureMVC TypeScript Demo - React Native employeeadmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useEffect, useMemo, useState } from "react";
import { NativeEventEmitter, NativeModules, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { ApplicationConstants, ParamList } from "../../ApplicationConstants";
import { UserVO } from "../../model/valueObject/UserVO";
import { DeptEnum } from "../../model/enum/DeptEnum";
import { RoleEnum } from "../../model/enum/RoleEnum";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserForm">;
  route: RouteProp<ParamList, "UserForm">;
}

export interface IUserForm {
  USER_FETCH: string,
  USER_SAVE: string,
  USER_UPDATE: string,
  setUser: (user: UserVO) => void,
  goBack: (user: UserVO) => void
}

const UserForm: React.FC<Props> = ({ navigation, route }) => {

  const [user, setUser] = useState<UserVO>(new UserVO()); // UserVO Data
  const [roles, setRoles] = useState<RoleEnum[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const nativeModule = NativeModules.employeeadmin;
  const emitter = useMemo(() => {
    if (!nativeModule) {
      console.log("NativeModules.employeeadmin is missing");
      return null;
    }
    return new NativeEventEmitter(nativeModule);
  }, [nativeModule]);
  const isEditMode = !!route.params?.user.username;

  const component: IUserForm = useMemo(() => ({
    USER_FETCH: "UserFormFetch",
    USER_SAVE: "UserFormSave",
    USER_UPDATE: "UserFormUpdate",
    setUser: setUser,
    goBack: (u: UserVO) => {
      navigation.navigate("UserList", { user: u })
    }
  }), [navigation, setUser]);

  useEffect(() => {
    if (!emitter) return;
  
    emitter.emit(ApplicationConstants.USER_FORM_MOUNTED, component);
  
    if (route.params?.user.username) {
      emitter.emit(component.USER_FETCH, { id: route.params?.user.username });
    }
  
    return () => {
      emitter.emit(ApplicationConstants.USER_FORM_UNMOUNTED);
    };
  }, [component, emitter, route.params?.user.username]);

  // Update roles when returning from the UserRole screen.
  useEffect(() => {
    if (route.params?.roles) {
      setRoles(route.params.roles);
    }
  }, [route.params?.roles]);

  // text fields change handler
  const onChange = (field: keyof UserVO, value: string) => {
    setErrorMessage("");
    setUser((state: UserVO) => (
      { ...state, [field]: value } as UserVO
    ));
  }

  // department value change handler
  const onValueChange = (value: number, index: number) => {
    setErrorMessage("");
    setUser((state: UserVO) => (
      { ...state, department: value === 0 ? DeptEnum.NONE_SELECTED : DeptEnum.combo.find(d => d.ordinal === value) } as UserVO
    ));
  }

  // roles press handler
  const onRoles = (event: any) => {
    navigation.navigate("UserRole", { user: user, roles: roles });
  }

  // save press handler
  const onSave = (event: any) => {
    const validationError = UserVO.getValidationError({ ...user, roles } as UserVO);
  
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
  
    if (!emitter) {
      console.log("Emitter is not available");
      return;
    }
  
    emitter.emit(isEditMode ? component.USER_UPDATE : component.USER_SAVE, { user: user });
  }

  // cancel press handler
  const onCancel = (event: any) => {
    navigation.goBack();
  }

  const onChangePassword = (value: string) => {
    setErrorMessage("");
    setUser(({ ...user, password: value } as UserVO));
  }

  const onChangeConfirm = (value: string) => {
    setErrorMessage("");
    setUser(({ ...user, confirm: value } as UserVO));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="First Name" value={user?.first} onChangeText={(value) => onChange("first", value)} />
        <TextInput style={styles.input} placeholder="Last Name" value={user?.last} onChangeText={(value) => onChange("last", value)} />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Email" value={user?.email} onChangeText={(value) => onChange("email", value)} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Username" value={user?.username} onChangeText={(value) => onChange("username", value)} editable={!route.params?.user.username} />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Password" value={user?.password} onChangeText={onChangePassword} />
        <TextInput style={styles.input} placeholder="Confirm" value={user?.confirm} onChangeText={onChangeConfirm} />
      </View>
      <View style={styles.row}>
        <Picker style={styles.input} selectedValue={user.department?.ordinal} onValueChange={onValueChange}>
          {DeptEnum.combo.map((department) => (
            <Picker.Item key={department.ordinal.toString()} label={department.value} value={department.ordinal} />
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
          <Text style={styles.buttonText}>{isEditMode ? "UPDATE" : "SAVE"}</Text>
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
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
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    marginHorizontal: 5,
  },
});

export default UserForm;
