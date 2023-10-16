import React, {useEffect} from "react";
import Dialog from "react-native-dialog";

import { View,Alert } from "react-native";

const Messages = ({
  changeModalVisible,
  EditMessageVisible,
  setEditRelationComponent,
  setTypeExitMessage,
}) => {
  const mostrarAlerta = () => {
    Alert.alert(
      "Confirmación",
      "¿Desea modificar todos los eventos relacionados?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            changeModalVisible(), setTypeExitMessage(false);
          },
        },
        {
          text: "SI",
          onPress: () => {
            changeModalVisible(),
            setEditRelationComponent(true),
            setTypeExitMessage(true);
          },
        },
        {
          text: "NO",
          onPress: () => {
              changeModalVisible(),
              setEditRelationComponent(false),
              setTypeExitMessage(true);
          },
        },
      ]
    );
  };
useEffect(() => {
  if (EditMessageVisible) {
    mostrarAlerta();
  }
}), [EditMessageVisible];
 
};

export default Messages;
