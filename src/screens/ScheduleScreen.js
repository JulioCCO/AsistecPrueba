import React, { useEffect, useState } from "react";
import { View,TouchableOpacity, StyleSheet, Modal, Alert } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Icon from "react-native-vector-icons/FontAwesome";
import {useSchedule } from "../hooks/useSchedule";
import CreateEditScheduleModal from "../components/Schedule/Create/CreateScheduleModal";
import DeleteMessageSchedule from "../components/Schedule/Delete/DeleteMessageSchedule";
const ScheduleScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); //estado para abrir el model de crear horario
  const [alertVisibleTrash, setAlertVisibleTrash] = useState(false); //estado para abrir el model de crear horario
  const {schedules, setCurrentSchedule} = useSchedule();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SelectList
          data={schedules}
          dropdownStyles={{
            width: 210,
            backgroundColor: "#F6F6F6",
            borderWidth: 0,
          }}
          placeholder="Selecciona un horario"
          setSelected={(item) => {
            setCurrentSchedule(item);
          }}
          boxStyles={{ borderColor: "#5B83B0", backgroundColor: "#8FC1A9" }}
        />
        {/* Botones para crear, editar y eliminar horarios */}
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
            setAlertVisibleTrash(!alertVisibleTrash);
          }}
          style={styles.delete}
        >
          <Icon name="trash" type="font-awesome" color="gray" size={25} />
        </TouchableOpacity>
      </View>
      {/* Modal para crear y editar horarios */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <CreateEditScheduleModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Modal>
      {/* Modal para eliminar horarios */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisibleTrash}
        onRequestClose={() => {
          setAlertVisibleTrash(!alertVisibleTrash);
        }}
      >
        <DeleteMessageSchedule
          open={alertVisibleTrash}
          close={setAlertVisibleTrash}
        />
        </Modal>
    </View>
  );
};
export default ScheduleScreen;
const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFFFF", height: "100%" },
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

});
