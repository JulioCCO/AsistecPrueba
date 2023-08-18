import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useData from "./src/hooks/useData";

const InitApp = () => {
  const [isReady, setIsReady] = useState(false);
  const { setEventItems } = useData();
  const { setListaComponents } = useData([]);

  const loadData = async () => {
    //AsyncStorage.clear();
    await AsyncStorage.getItem("storedEvents").then((value) => {
      if (value !== null) {
        setEventItems(JSON.parse(value));
      }
    }).catch((error) => {
      console.log(error);
    });

    await AsyncStorage.getItem("listaComponents").then((value) => {
      if (value !== null) {
        setListaComponents(JSON.parse(value));
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().then(() => {
      loadData().then(() => {
        setIsReady(true);
        SplashScreen.hideAsync();
      });
    });
  }, []);

  if (!isReady) {
    return null; // Renderiza un componente de carga personalizado si es necesario
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default InitApp;