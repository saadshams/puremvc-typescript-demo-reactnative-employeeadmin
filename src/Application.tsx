import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ParamList } from "./ApplicationConstants";
import ApplicationFacade from "./ApplicationFacade";
import UserList from "./view/components/UserList";
import UserForm from "./view/components/UserForm";
import UserRole from "./view/components/UserRole";

ApplicationFacade.getInstance(ApplicationFacade.KEY).startup();

const Stack = createNativeStackNavigator<ParamList>();

const Application: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="UserList">
          <Stack.Screen name="UserList" component={UserList} options={{title: "User List"}} />
          <Stack.Screen name="UserForm" component={UserForm} options={{title: "User Form"}} />
          <Stack.Screen name="UserRole" component={UserRole} options={{title: "User Role"}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Application;
