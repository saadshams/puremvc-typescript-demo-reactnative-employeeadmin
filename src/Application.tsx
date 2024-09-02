import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { ParamList } from "./ApplicationConstants";
import { ApplicationFacade } from "./ApplicationFacade";
import UserList from "./view/components/UserList";
import UserForm from "./view/components/UserForm";
import UserRole from "./view/components/UserRole";
import { User } from "./model/valueObject/User";

ApplicationFacade.getInstance(ApplicationFacade.KEY, key => new ApplicationFacade(key)).startup();

const Stack = createNativeStackNavigator<ParamList>();

const Application: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="UserList">
          <Stack.Screen name="UserList" component={UserList} options={({navigation}) => ({
            title: "User List",
            headerRight: () => (
              <TouchableOpacity onPress={() => { navigation.navigate("UserForm", { user: new User() }) }}>
                <Text><Icon name="fa-plus" size={24} color="#007AFF" /></Text>
              </TouchableOpacity>)
          })} />
          <Stack.Screen name="UserForm" component={UserForm} options={{title: "User Form"}} />
          <Stack.Screen name="UserRole" component={UserRole} options={{title: "User Role"}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Application;
