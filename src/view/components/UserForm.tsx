import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { NativeEventEmitter, NativeModules, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../../Application";
import { ApplicationConstants } from "../../ApplicationConstants";
import { User } from "../../model/valueObject/User";
import { Department } from "../../model/valueObject/Department";
import { Picker } from "@react-native-picker/picker";

interface Props {
  route: RouteProp<RootStackParamList, "UserForm">;
}

const UserForm: React.FC<Props> = ({ route }) => {

  const { id } = route.params;

  const [user, setUser] = useState<User>();
  const [departments, setDepartments] = useState<Department[]>([]);

  const ref = useRef({});

  useImperativeHandle(ref, () => ({
    NAME: ApplicationConstants.USER_FORM,

    setUser: setUser,
    setDepartments: setDepartments
  }));

  useEffect(() => {
    const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
    emitter.emit(ApplicationConstants.MOUNTED, ref.current);

    return () => {
      emitter.emit(ApplicationConstants.UNMOUNTED, {name: ApplicationConstants.USER_FORM});
    }
  }, [ref]);

  const onChange = (field: keyof User, value: string) => {
    console.log(`${field}: ${value}`);
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
        <TextInput style={styles.input} placeholder="Password" value={user?.password} onChangeText={(value) => onChange("password", value)} />
        <TextInput style={styles.input} placeholder="Confirm" value={user?.confirm} onChangeText={(value) => onChange("confirm", value)} />
      </View>
      <View>
        <Picker>
          {departments.map((department) => (
            <Picker.Item key={department.key} label={department.name} value={department.id} style={styles.input} />
          ))}
        </Picker>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Roles</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
// onPress={() => navigation.navigate("UserRole", {id: user.id}) }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
  },
  button: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
  },
});

export default UserForm;
