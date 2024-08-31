import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { NativeEventEmitter, NativeModules, ScrollView, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Button, CheckBox } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";

import { ApplicationConstants, ParamList } from "../../ApplicationConstants";
import Role from "../../model/valueObject/Role";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserRole">;
  route: RouteProp<ParamList, "UserRole">;
}

const UserRole: React.FC<Props> = ({ navigation, route }) => {

  const [roles, setRoles] = useState<Role[]>();
  const [data, setData] = useState<Role[]>([]);
  const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  const ref = useRef({});

  useImperativeHandle(ref, () => ({
    NAME: ApplicationConstants.USER_ROLE,

    setRoles: setRoles,
    setData: setData
  }));

  useEffect(() => {
    emitter.emit(ApplicationConstants.MOUNT, ref.current);
    if (route.params?.user.id)
      emitter.emit(ApplicationConstants.USER_SELECTED, {id: route.params?.user.id});

    return () => {
      emitter.emit(ApplicationConstants.UNMOUNT, {name: ApplicationConstants.USER_ROLE});
    }
  }, [ref]);

  const onChange = (role: Role) => {
    setData((state) => {
      if (state.some(r => r.id === role.id)) {
        return state.filter(r => r.id !== role.id); // Remove
      } else {
        return [...state, role]; // Add
      }
    });
  }

  const onSave = () => {
    navigation.navigate("UserForm", {
      user: { ...route.params.user, roles: data }
    });
  }

  const onCancel = () => {
    navigation.goBack();
  }

  return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {roles?.map((role: Role) => (
          <View key={`role_${role.id}`} style={styles.item}>
            <CheckBox title={role.name} containerStyle={styles.checkbox}
                      checked={data.some(r => r.id === role.id)} onPress={() => onChange(role)}
                      iconType="material-community" checkedIcon="checkbox-outline" uncheckedIcon={"checkbox-blank-outline"} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.sticky}>
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Save" onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  scrollView: {
    marginBottom: 60
  },
  checkbox: {
    backgroundColor: "transparent",
  },
  sticky: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});

export default UserRole;
