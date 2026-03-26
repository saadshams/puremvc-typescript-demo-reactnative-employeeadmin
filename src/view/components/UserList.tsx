//
//  UserList.tsx
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useEffect, useMemo } from "react";
import { FlatList, NativeEventEmitter, NativeModules, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ApplicationConstants, ParamList } from "../../ApplicationConstants";
import { User } from "../../model/valueObject/User";
import { useAppDispatch, useAppSelector } from "../../model/store/hooks";
import { setUserById, setUsers } from "../../model/store/usersSlice";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserList">;
  route: RouteProp<ParamList, "UserList">;
}

export interface IUserList {
  DELETE: string,
  setUsers: (users: User[]) => void
}

const UserList: React.FC<Props> = ({ navigation, route }) => {

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.list);
  const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);

  const component: IUserList = useMemo(() => ({
    DELETE: "UserListDelete",
    setUsers: (incomingUsers: User[]) => {
      const cleanUsers = incomingUsers.map(u => JSON.parse(JSON.stringify(u)));
      return dispatch(setUsers(cleanUsers));
    },
  }), [dispatch]);

  useEffect(() => {
    emitter.emit(ApplicationConstants.USER_LIST_MOUNTED, component);
    return () => {
      emitter.emit(ApplicationConstants.USER_LIST_UNMOUNTED);
    };
  }, [component]);

  useEffect(() => {
    if (route.params?.user.roles) { // updated user from the User Form
      dispatch(setUserById(route.params.user));
    }
  }, [dispatch, route.params?.user]);

  const onPress = (user: User) => {
    navigation.navigate("UserForm", { user: user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList data={users} keyExtractor={(user: User) => `user_${user.id}`} renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item)}>
            <Text style={styles.user}>{item.last}, {item.first}</Text>
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
  user: {
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default UserList;
