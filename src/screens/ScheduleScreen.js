import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Modal, Alert } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSchedule } from "../hooks/useSchedule";
import CreateEditScheduleModal from "../components/Schedule/Create/CreateEditScheduleModal";

const ScheduleScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); //estado para abrir el model de crear horario
  const [alertVisibleTrash, setAlertVisibleTrash] = useState(false); //estado para abrir el model de crear horario
  const { schedules, setCurrentSchedule, deleteSchedule, currentSchedule } =
    useSchedule();
  const [action, setAction] = useState(""); //estado para saber si se va a crear o editar un horario
  const deleteOptionSchedule = () => {
    Alert.alert("Confirmación", `¿Desea eliminar el horario seleccionado?`, [
      {
        text: "SI",
        onPress: () => {
          deleteSchedule(currentSchedule);
          setCurrentSchedule(null);
        },
      },
      {
        text: "CANCELAR",
        style: "cancel",
      },
    ]);
  };
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
          placeholder={"Selecciona un horario"}
          setSelected={(item) => {
            setCurrentSchedule(item);
          }}
          boxStyles={{ borderColor: "#5B83B0", backgroundColor: "#8FC1A9" }}
        />
        {/* Botones para crear, editar y eliminar horarios */}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
            setAction("create");
          }}
          style={styles.add}
        >
          <Icon name="plus" type="font-awesome" color="gray" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
            setAction("edit");
          }}
          style={styles.edit}
        >
          <Icon name="edit" type="font-awesome" color="gray" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteOptionSchedule} style={styles.delete}>
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
          action={action}
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
