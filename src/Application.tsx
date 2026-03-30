//
//  Application.tsx
//  PureMVC TypeScript Demo - React Native employeeadmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

import { ParamList } from "./ApplicationConstants";
import { ApplicationFacade } from "./ApplicationFacade";
import { UserVO } from "./model/valueObject/UserVO";
import UserList from "./view/components/UserList";
import UserForm from "./view/components/UserForm";
import UserRole from "./view/components/UserRole";
import Calculator from '../NativeCalculator';
import { NativeModules } from 'react-native';

ApplicationFacade
    .getInstance(ApplicationFacade.KEY, key => new ApplicationFacade(key))
    .startup();

const Application: React.FC = () => {

  const Stack = createNativeStackNavigator<ParamList>();

  useEffect(() => {
    const run = async () => {
      const res = await Calculator.add(3, 7);
      console.log('res', res);
    };

    run().catch(console.error);
  }, []);

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="UserList">
          <Stack.Screen name="UserList" component={UserList} options={({navigation}) => ({
            title: "UserVO List",
            headerRight: () => (
              <TouchableOpacity onPress={() => { navigation.navigate("UserForm", { user: new UserVO() }) }}>
                <Text><Icon name="plus" size={24} color="#007AFF" /></Text>
              </TouchableOpacity>)
          })} />
          <Stack.Screen name="UserForm" component={UserForm} options={{title: "UserVO Form"}} />
          <Stack.Screen name="UserRole" component={UserRole} options={{title: "UserVO RoleVO"}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Application;
