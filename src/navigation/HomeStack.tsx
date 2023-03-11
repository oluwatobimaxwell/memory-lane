import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabStack from "./TabStack";

export type HomeStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={TabStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
