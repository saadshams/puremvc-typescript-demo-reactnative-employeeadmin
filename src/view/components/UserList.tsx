import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { FlatList, NativeEventEmitter, NativeModules, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { ApplicationConstants } from "../../ApplicationConstants";
import { RootStackParamList } from "../../Application";
import { User } from "../../model/valueObject/User";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "UserList">;
}

const UserList: React.FC<Props> = ({ navigation }) => {

  const [users, setUsers] = useState([]);

  const ref = useRef({});

  useImperativeHandle(ref, () => ({
    NAME: ApplicationConstants.USER_LIST,

    setUsers: setUsers,
  }));

  useEffect(() => {
    const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
    emitter.emit(ApplicationConstants.MOUNTED, ref.current);

    return () => { // initialRoute remains mounted
      // emitter.emit(ApplicationConstants.UNMOUNTED, {name: ApplicationConstants.USER_LIST});
    };
  }, [ref]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList data={users} keyExtractor={(item: User) => `user_${item.id}`} renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("UserForm", { id: item.id })}>
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
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default UserList;
