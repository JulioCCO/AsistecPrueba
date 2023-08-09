import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventosScreen from "../screens/EventosScreen";
import HorarioScreen from "../screens/HorarioScreen";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import NotificationScreen from "../screens/NotificacionScreen";
const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Eventos") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Notificaciones") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Horario") {
            iconName = focused ? "list" : "list-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#769ECB",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Eventos" component={EventosScreen} />
      <Tab.Screen name="Horario" component={HorarioScreen} />
      <Tab.Screen name="Notificaciones" component={NotificationScreen} />
    </Tab.Navigator>
  );
};