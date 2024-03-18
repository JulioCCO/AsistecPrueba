import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
const ScheduleScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); //estado para abrir el model de crear
  const WIDTH = Dimensions.get("window").width - 80;
  const HEIGHT = Dimensions.get("window").height - 660;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SelectList
          data={[
            { key: 1, value: "First" },
            { key: 2, value: "Second" },
            { key: 3, value: "Third" },
          ]}
          dropdownStyles={{
            width: 210,
            backgroundColor: "#F6F6F6",
            borderWidth: 0,
          }}
          placeholder="Selecciona un horario"
          setSelected={(item) => console.log(item)}
          boxStyles={{ borderColor: "#5B83B0", backgroundColor: "#8FC1A9" }}
        />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.add}
        >
          <Icon name="plus" type="font-awesome" color="gray" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("presionado");
          }}
          style={styles.edit}
        >
          <Icon name="edit" type="font-awesome" color="gray" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("presionado");
          }}
          style={styles.delete}
        >
          <Icon name="trash" type="font-awesome" color="gray" size={25} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          disabled={true}
          style={{
            ...styles.containerModal,
            backgroundColor: modalVisible ? "rgba(0,0,0,0.4)" : "transparent", // Cambia el fondo a oscuro cuando el modal está abierto
          }}
        >
          <View style={{  ...styles.modal, width: WIDTH,  height: HEIGHT}}>
            <View style={styles.modalHeader}>
            <Text style={{fontSize: 20, color: "white"}}>Crear Horario</Text>
            <TouchableOpacity onPress={()=> {setModalVisible(!modalVisible)}} style={styles.closeModal}>
            <Icon name="close" size={25} color="white" style={{}} />
          </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
            <Input
              placeholder="Nombre"
              type="text"
              placeholderTextColor={"black"}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChangeText={(value) => console.log(value)}
              style={{
                color: "black",
                borderBottomWidth: 2,
                borderBottomColor: "#00000066",
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{
               //alinear el boton a la derecha 
                alignSelf: "flex-end",
               
              }}
            >
              <Text
                style={{
                  color: "#8FC1A9",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: 20,
                }}
              >
                Guardar
              </Text>
            </TouchableOpacity>
            </ScrollView>
            
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
export default ScheduleScreen;
const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFFFF", height: "100%" },
  containerModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 10,
  },
  viewModeHeader: { padding: 5, width: 100 },
  viewModeText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modal: {
    paddingTop: 0,
    backgroundColor: "white",
    borderRadius: 24,
  },
  add: {
    position: "absolute",
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    right: "35%",
    top: 10,
  },
  delete: {
    position: "absolute",
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    right: "10%",
    top: 10,
  },
  edit: {
    position: "absolute",
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    right: "22%",
    top: 12,
  },
  modalHeader: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#769ECB",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalBody: {
    width: "100%",
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },
  closeModal: {
    position: "absolute",
    top: 10,
    right: 15,
  },
});
