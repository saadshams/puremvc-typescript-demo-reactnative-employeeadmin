import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamList } from "../../ApplicationConstants";
import { useUsers } from "../../api/users/users.hooks";
import { User } from "../../api/users/users.types";
import { useNavigation } from "@react-navigation/native";
import { UserVO } from "../../model/valueObject/UserVO";

export interface IUserList {
  setUsers: (users: UserVO[]) => void;
}

const RenderUser = ({ item }: { item: User }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamList, "UserList">>();

  const onPress = useCallback((user: User) => {
    navigation.navigate("UserForm", {
      user,
      roleIds: user.roles.map((r) => r.id),
      departmentId: user.department?.id,
    });
  }, [navigation]);

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
      <Text style={styles.name}>
        {item.last}, {item.first}
      </Text>
      <Text style={styles.email}>{item.email}</Text>
    </TouchableOpacity>
  )
}

const UserList: React.FC = () => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error loading users</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id.toString()}
        removeClippedSubviews={false}
        renderItem={({ item }) => <RenderUser item={item} />}
        ListEmptyComponent={<Text>No users found</Text>}
      />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
});

export default UserList;