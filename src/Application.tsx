import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ApplicationFacade } from "./ApplicationFacade";
import UserList from "./view/components/UserList";
import UserForm from "./view/components/UserForm";
import UserRole from "./view/components/UserRole";

ApplicationFacade.getInstance(ApplicationFacade.KEY).startup();

export type RootStackParamList = {
  UserList: undefined;
  UserForm: {id: number};
  UserRole: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Application: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="UserList">
          <Stack.Screen name="UserList" component={UserList} />
          <Stack.Screen name="UserForm" component={UserForm} />
          <Stack.Screen name="UserRole" component={UserRole} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Application;
