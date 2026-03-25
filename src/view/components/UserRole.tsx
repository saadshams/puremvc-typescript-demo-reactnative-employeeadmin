//
//  UserRole.tsx
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Button, CheckBox } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamList } from "../../ApplicationConstants";
import { useRoles } from "../../api/roles/roles.hooks";

interface Props {
  navigation: StackNavigationProp<ParamList, "UserRole">;
  route: RouteProp<ParamList, "UserRole">;
}

export interface IUserRole {
  USER_ROLE_FETCH: string;
  setData: (data: any[]) => void;
}

const UserRole: React.FC<Props> = ({ navigation, route }) => {

  const { data: roles = [], isLoading, error } = useRoles();
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>(() => route.params?.roleIds ?? []);

  useEffect(() => {
    // keep selected role ids in sync if route param changes
    if (route.params?.roleIds) setSelectedRoleIds(route.params.roleIds);
  }, [route.params?.roleIds]);

  const onChange = (roleId: number) => {
    setSelectedRoleIds((state) => {
      if (state.includes(roleId)) return state.filter((id) => id !== roleId);
      return [...state, roleId];
    });
  }

  const onSave = () => {
    navigation.navigate("UserForm", {
      user: route.params?.user,
      roleIds: selectedRoleIds
    });
  }

  const onCancel = () => {
    navigation.goBack();
  }

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error loading roles</Text>;

  return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {roles.map((role) => (
          <View key={`role_${role.id}`} style={styles.item}>
            <CheckBox title={role.name} containerStyle={styles.checkbox}
                      checked={selectedRoleIds.includes(role.id)} onPress={() => onChange(role.id)}
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
