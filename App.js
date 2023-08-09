
import { StyleSheet, View, Text } from 'react-native';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTab } from "./src/navigation/BottomTap";
import StackNavigator from './StackNavigator';


const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  )
}

export default App;
