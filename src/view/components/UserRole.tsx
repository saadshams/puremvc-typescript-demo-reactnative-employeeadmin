//
//  UserRole.tsx
//  PureMVC TypeScript Demo - React Native employeeadmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useEffect, useMemo, useState } from "react";
import { NativeEventEmitter, NativeModules, ScrollView, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Button, CheckBox } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApplicationConstants, ParamList } from "../../ApplicationConstants";
import { RoleEnum } from "../../model/enum/RoleEnum";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserRole">;
  route: RouteProp<ParamList, "UserRole">;
}

export interface IUserRole {
  USER_ROLE_FETCH: string;
  setData: (data: RoleEnum[]) => void;
}

const UserRole: React.FC<Props> = ({ navigation, route }) => {

  const [data, setData] = useState<RoleEnum[]>([]); // UserVO Data
  const emitter = useMemo(() => new NativeEventEmitter(NativeModules.employeeadmin), []);

  const component: IUserRole = useMemo(() => ({
    USER_ROLE_FETCH: "UserRoleFetch",
    setData: setData
  }), [setData]);

  useEffect(() => {
    emitter.emit(ApplicationConstants.USER_ROLE_MOUNTED, component);
    if (route.params?.user.username)
      emitter.emit(component.USER_ROLE_FETCH, {id: route.params?.user.username});

    return () => {
      emitter.emit(ApplicationConstants.USER_ROLE_UNMOUNTED);
    }
  }, [component]);

  const onChange = (role: RoleEnum) => {
    setData((state) => {
      if (state.some(r => r.ordinal === role.ordinal)) {
        return state.filter(r => r.ordinal !== role.ordinal); // Remove
      } else {
        return [...state, role]; // Add
      }
    });
  }

  const onSave = () => {
    navigation.navigate("UserForm", {
      user: route.params?.user,
      roles: data
    });
  }

  const onCancel = () => {
    navigation.goBack();
  }

  return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {RoleEnum.combo.map((role: RoleEnum) => (
          <View key={`role_${role.ordinal}`} style={styles.item}>
            <CheckBox title={role.value} containerStyle={styles.checkbox}
                      checked={data.some(r => r.ordinal === role.ordinal)} onPress={() => onChange(role)}
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
