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
            setEditRelationComponent(true),
              changeModalVisible(),
              setTypeExitMessage(true);
          },
        },
        {
          text: "NO",
          onPress: () => {
            setEditRelationComponent(false),
              changeModalVisible(),
              setTypeExitMessage(true);
          },
        },
      ],
      { cancelable: false }
    );
  };
useEffect(() => {
  if (EditMessageVisible == true) {
    mostrarAlerta();
  }
}), [EditMessageVisible];
 
};

export default Messages;
