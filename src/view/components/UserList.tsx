import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { FlatList, NativeEventEmitter, NativeModules, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { ApplicationConstants, ParamList } from "../../ApplicationConstants";
import User from "../../model/valueObject/User";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserList">;
}

const UserList: React.FC<Props> = ({ navigation }) => {

  const [users, setUsers] = useState([]);
  const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  const ref = useRef({});

  useImperativeHandle(ref, () => ({
    NAME: ApplicationConstants.USER_LIST,

    setUsers: setUsers,
  }));

  useEffect(() => {
    emitter.emit(ApplicationConstants.MOUNT, ref.current);

    return () => { // initialRoute remains mounted
      // emitter.emit(ApplicationConstants.UNMOUNTED, {name: ApplicationConstants.USER_LIST});
    };
  }, [ref]);

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
