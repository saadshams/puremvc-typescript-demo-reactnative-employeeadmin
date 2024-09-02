import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { FlatList, NativeEventEmitter, NativeModules, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { USER_LIST_MOUNTED, USER_LIST_UNMOUNTED, ParamList } from "../../ApplicationConstants";
import { User } from "../../model/valueObject/User";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserList">;
  route: RouteProp<ParamList, "UserList">;
}

export interface IUserList {
  DELETE: string,

  setUsers: (users: User[]) => void
}

const UserList: React.FC<Props> = ({ navigation, route }) => {

  const [users, setUsers] = useState<User[]>([]);
  const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  const ref = useRef<IUserList>(null!);

  useImperativeHandle(ref, () => ({
    DELETE: "UserListDelete",

    setUsers: setUsers,
  }));

  useEffect(() => {
    emitter.emit(USER_LIST_MOUNTED, ref.current);
    return () => {
      emitter.emit(USER_LIST_UNMOUNTED);
    };
  }, [ref]);

  useEffect(() => {
    if (route.params?.user.roles) { // updated user from the User Form
        setUsers((users: User[]) => {
          if (users.some(user => user.id === route.params?.user.id))  // existing, update
            return users.map((user: User) => user.id === route.params?.user.id ? route.params?.user : user)
          else
            return [...users, route.params?.user] // add new
        });
    }
  }, [route.params?.user]);

  const onPress = (user: User) => {
    navigation.navigate("UserForm", { user: user });
  }

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
