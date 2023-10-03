import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabConfig from "./TabConfig";

import EventosScreen from "../../screens/EventosScreen";
import HorarioScreen from "../../screens/HorarioScreen";
import NotificationScreen from "../../screens/NotificacionScreen";
import { ta } from "date-fns/locale";

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const config = TabConfig[route.name];
          const iconName = focused ? config.iconName : config.iconNameOutline;
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
