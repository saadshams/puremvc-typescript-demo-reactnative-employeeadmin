//
//  UserList.tsx
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamList } from "../../ApplicationConstants";
import { User } from "../../model/valueObject/User";
import useUserStore from "../store/useUserStore";

interface Props {
  navigation: NativeStackNavigationProp<ParamList, "UserList">;
}

const UserList: React.FC<Props> = ({ navigation }) => {

  const users = useUserStore((state) => state.users);

  const onPress = (item: User) => {
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
              <Text style={styles.user}>{item.last}, {item.first}</Text>
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
  user: {
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default UserList;
