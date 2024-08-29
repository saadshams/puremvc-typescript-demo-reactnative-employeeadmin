import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../Application";
import { NativeEventEmitter, NativeModules, ScrollView, Text, View } from "react-native";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Role } from "../../model/valueObject/Role";
import { ApplicationConstants } from "../../ApplicationConstants";

interface Props {
  route: RouteProp<RootStackParamList, "UserRole">;
}

const UserRole: React.FC<Props> = ({ route }) => {

  const {id} = route.params;
  const [roles, setRoles] = useState<Role[]>([]);

  const ref = useRef({});

  useImperativeHandle(ref, () => ({
    NAME: ApplicationConstants.USER_ROLE,

    setRoles: setRoles
  }));

  useEffect(() => {
    const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
    emitter.emit(ApplicationConstants.MOUNTED, ref.current);

    return () => {
      emitter.emit(ApplicationConstants.UNMOUNTED, {name: ApplicationConstants.USER_ROLE});
    }
  }, [ref]);

  return(
    <ScrollView>
      {roles.map((role: Role) => (
        <View key={`role_${role.id}`}>
          <Text>{role.name}</Text>
        </View>
      ))};
    </ScrollView>
  );
}

export default UserRole;
