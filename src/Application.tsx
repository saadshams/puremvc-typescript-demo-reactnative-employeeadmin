//
//  Application.tsx
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

import { ParamList } from "./ApplicationConstants";
import { ApplicationFacade } from "./ApplicationFacade";
import { User } from "./model/valueObject/User";
import UserList from "./view/components/UserList";
import UserForm from "./view/components/UserForm";
import UserRole from "./view/components/UserRole";

const Application: React.FC = () => {

  ApplicationFacade
    .getInstance(ApplicationFacade.KEY, key => new ApplicationFacade(key))
    .startup();

  const Stack = createNativeStackNavigator<ParamList>();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="UserList">
          <Stack.Screen name="UserList" component={UserList} options={({navigation}) => ({
            title: "User List",
            headerRight: () => (
              <TouchableOpacity onPress={() => { navigation.navigate("UserForm", { user: new User() }) }}>
                <Text><Icon name="plus" size={24} color="#007AFF" /></Text>
              </TouchableOpacity>)
          })} />
          <Stack.Screen name="UserForm" component={UserForm} options={{title: "User Form"}} />
          <Stack.Screen name="UserRole" component={UserRole} options={{title: "User Role"}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Application;
