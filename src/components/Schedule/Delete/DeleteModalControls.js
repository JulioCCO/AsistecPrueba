
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";


const Delete = (
  event,
  editRelationComponent,
  listaComponents,
  setListaComponents
) => {
  if (!editRelationComponent) {
    const newListaComponents = listaComponents.filter(
      (component) => component.id !== event.id
    );
    setListaComponents([]);
    setListaComponents(newListaComponents);
    return true;
  } else {
    //obtener los elementos no relacionados con el event.idRelation
    var listaComponentsTemp = listaComponents.filter(
      (item) => item.idRelacion != event.idRelacion
    );
    //valiar lista de componentes
    setListaComponents([]);
    setListaComponents(listaComponentsTemp);
    AsyncStorage.setItem("listaComponents", JSON.stringify(listaComponentsTemp))
    return true;
  }
};

export const DeleteModalControls = ({
  event,
  setTypeExitMessageDelete,
  editRelationComponent,
  listaComponents,
  setListaComponents,
  changeOpenDeletetModal,
  openDeleteModal,
}) => {
  const [valid, setValid] = React.useState(false);
  const OnDeleteActivityorCourse = () => {
    setTypeExitMessageDelete(false);
    changeOpenDeletetModal();
    setValid(false);
  };
  useEffect(() => {
    if (openDeleteModal) {
      setValid(
        Delete(
          event,
          editRelationComponent,
          listaComponents,
          setListaComponents
        )
      );
    }
  }, []);
  const WIDTH = Dimensions.get("window").width - 80;
  const HEIGHT = Dimensions.get("window").height - 620;
  if (valid) {
    return (

      <TouchableOpacity
        disabled={true}
        style={{
          ...styles.container,
          backgroundColor: openDeleteModal ? "rgba(0,0,0,0.4)" : "transparent", // Cambia el fondo a oscuro cuando el modal está abierto
        }}
      >
        {/* Modal content */}
        <View style={{ ...styles.modal, height: HEIGHT, width: WIDTH }}>
          {/* Modal header */}
          <View style={styles.modalHeader}>
            {/* Close modal button */}

            {/* Activity name input */}
            <Text style={styles.text}>
              {editRelationComponent == true
                ? "Todos los elementos relacionados se han eliminado con éxito"
                : "El elemento fue eliminado con éxito"}
            </Text>
          </View>

          {/* Modal body */}
          <ScrollView style={styles.modalBody}>
            {/* Create button */}
            <TouchableOpacity
              onPress={OnDeleteActivityorCourse}
              style={styles.createButton}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableOpacity>
    );
  }
};
export default DeleteModalControls;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    paddingTop: 0,
    backgroundColor: "white",
    borderRadius: 24,
  },

  modalHeader: {
    alignItems: "flex-start",
    paddingHorizontal: 18,
    paddingTop: 10,
    height: 70,
    backgroundColor: "#769ECB",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  text: {
    marginStart: 20,
    fontSize: 16,
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    color: "white",
    top: 5,
  },
  modalBody: {
    width: "100%",
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },

  createButton: {
    backgroundColor: "#769ECB",
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    top: 4,
  },
});
