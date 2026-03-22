//
//  UserList.tsx
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamList } from "../../ApplicationConstants";
import { ApplicationFacade } from "../../ApplicationFacade";
import { RoleProxy } from "../../model/RoleProxy";
import { UserProxy } from "../../model/UserProxy";
import { UserVO } from "../../model/valueObject/UserVO";
import useUserStore from "../store/useUserStore";

interface Props {
  navigation: NativeStackNavigationProp<ParamList, "UserList">;
}

const UserList: React.FC<Props> = ({ navigation }) => {

  const users = useUserStore((state) => state.users);

  useEffect(() => {
    const { users: current, setUsers } = useUserStore.getState();
    if (current.length > 0) {
      return;
    }
    try {
      const facade = ApplicationFacade.getInstance(
        ApplicationFacade.KEY,
        (key) => new ApplicationFacade(key),
      );
      const userProxy = facade.retrieveProxy(UserProxy.NAME) as UserProxy;
      const roleProxy = facade.retrieveProxy(RoleProxy.NAME) as RoleProxy;
      const merged = userProxy.findAllUsers().map((u) => {
        const roles = roleProxy.findRolesByUsername(u.username) ?? [];
        const row = new UserVO(
          u.id,
          u.username,
          u.first,
          u.last,
          u.email,
          u.password,
          u.department,
          roles,
        );
        row.confirm = u.confirm ?? u.password;
        return row;
      });
      setUsers(merged);
    } catch {
      /* startup / proxy not registered yet */
    }
  }, []);

  const onPress = (item: UserVO) => {
    navigation.navigate("UserForm", { user: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={(item) => `user_${item.id}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item)}>
              <Text style={styles.item}>{item.last}, {item.first}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

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
});

export default UserList;
