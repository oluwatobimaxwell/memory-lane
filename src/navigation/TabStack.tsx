import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostFeeds } from "../components/PostFeeds";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";
import { useThemeContext } from "../theme/themContext";
import hexToRgba from "hex-to-rgba";
import WebsiteGroups from "../screens/WebsiteGroups";

const Tab = createBottomTabNavigator();

const iconNames = {
  Home: "home",
  Links: "link",
};

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
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: "transparent",
        tabBarInactiveBackgroundColor: "transparent",
        headerStyle: {
          backgroundColor: contextTheme.background,
        },
        headerTitleStyle: {
          color: contextTheme.text,
          textTransform: "capitalize",
        },
        tabBarStyle: {
          backgroundColor: hexToRgba(contextTheme.background, 0.98),
          borderTopColor: hexToRgba(contextTheme.text, 0.1),
          position: "absolute",
        },
        tabBarLabelStyle: {
          color: contextTheme.text,
          textTransform: "capitalize",
        },
      })}
    >
      <Tab.Screen name="Home" component={WebsiteGroups} />
      <Tab.Screen name="Links" component={PostFeeds} />
    </Tab.Navigator>
  );
}

export default TabStack;
