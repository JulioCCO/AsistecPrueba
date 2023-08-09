import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { View, Text } from "react-native";
import { useState } from "react";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTab } from "./src/navigation/BottomTap";

export default function App() {
const App = () => {
  return (
    <NavigationContainer>
      <BottomTab/>
    </NavigationContainer>
  );
}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
