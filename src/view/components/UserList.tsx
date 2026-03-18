//
//  UserList.tsx
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useEffect, useMemo, useState } from "react";
import { FlatList, NativeEventEmitter, NativeModules, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ApplicationConstants, ParamList } from "../../ApplicationConstants";
import { UserVO } from "../../model/valueObject/UserVO";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserList">;
  route: RouteProp<ParamList, "UserList">;
}

export interface IUserList {
  DELETE: string,
  setUsers: (users: UserVO[]) => void
}

const UserList: React.FC<Props> = ({ navigation, route }) => {

  const [users, setUsers] = useState<UserVO[]>([]); // UserVO Data
  const emitter = useMemo(() => new NativeEventEmitter(NativeModules.EmployeeAdmin), []);

  const component: IUserList = useMemo(() => ({
    DELETE: "UserListDelete",
    setUsers: setUsers,
  }), [setUsers]);

  useEffect(() => {
    emitter.emit(ApplicationConstants.USER_LIST_MOUNTED, component);
    return () => {
      emitter.emit(ApplicationConstants.USER_LIST_UNMOUNTED);
    };
  }, [component]);

  useEffect(() => {
    if (route.params?.user) { // updated user from the UserVO Form
        setUsers((users: UserVO[]) => {
          if (users.some(user => user.username === route.params?.user.username))  // existing, update
            return users.map((user: UserVO) => user.username === route.params?.user.username ? route.params?.user : user)
          else
            return [...users, route.params?.user] // add new
        });

      navigation.setParams({ user: undefined });
    }
  }, [route.params?.user]);

  const onPress = (user: UserVO) => {
    navigation.navigate("UserForm", { user: user, roles: [] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList data={users} keyExtractor={(user: UserVO) => `user_${user.username}`} renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item)}>
              <Text style={styles.item}>{item.last}, {item.first}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
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
});

export default UserList;
