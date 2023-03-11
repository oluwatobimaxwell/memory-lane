import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostFeeds } from "../components/PostFeeds";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";
import { useThemeContext } from "../theme/themContext";
import MoreOption from "../components/MoreOption";
import hexToRgba from "hex-to-rgba";

const Tab = createBottomTabNavigator();

const iconNames = {
  Home: "home",
  Main: "home",
  Categories: "list",
}

function TabStack() {
  const theme = useTheme();
  const contextTheme = useThemeContext();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // @ts-ignore
          const iconName = iconNames?.[route.name];
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: contextTheme.text,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: "transparent",
        tabBarInactiveBackgroundColor: "transparent",
        headerStyle: {
          backgroundColor: contextTheme.background,
        },
        headerTitleStyle: {
          color: contextTheme.text,
        },
        tabBarStyle: {
          backgroundColor: hexToRgba(contextTheme.background, 0.98),
          borderTopColor: hexToRgba(contextTheme.text, 0.1),
          position: 'absolute',
        },
        tabBarLabelStyle: {
          color: contextTheme.text,
        },
      })}
    >
      <Tab.Screen name="Main" component={PostFeeds} />
      <Tab.Screen name="Categories" component={MoreOption} />
    </Tab.Navigator>
  );
}

export default TabStack;
