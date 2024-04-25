import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Icon from "react-native-vector-icons/FontAwesome";
import TimeTableView, { genTimeBlock } from 'react-native-timetable';

import CreateEditScheduleModal from "../components/Schedule/CreateEdit/CreateEditScheduleModal";
import CreateEditActivityModal from "../components/Schedule/CreateEdit/CreateEditActivityModal";
import { useSchedule } from "../hooks/useSchedule";


const ScheduleScreen = () => {

  const { schedules, currentScheduleKey, setCurrentScheduleKey,
    deleteSchedule, currentScheduleData, setCurrentScheduleData
  } = useSchedule(); //Custom hook

  {/* Estados de horarios*/ }
  const [modalVisible, setModalVisible] = useState(false); //estado para abrir el model de crear horario
  const [action, setAction] = useState(""); //estado para saber si se va a crear o editar un horario
  const scrollViewRef = useRef();
  const numOfDays = 5;
  const pivotDate = genTimeBlock('mon');

  {/* Estados de activiades*/ }
  const [modalActivityVisible, setModalActivityVisible] = useState(false); // determina la apertura y cierre del modal de activity
  const [selectedActivity, setSelectedActivity] = useState(undefined); // lleva la actividad seleccionada 
  const [options, setOptions] = useState(false); // muestra los botones para crear, editar y eliminar actividad
  const [modalActivityAction, setModalActivityAction] = useState(''); // para saber si es editar o crear

  const [deleteActivityFlag, setDeleteActivityFlag] = useState(false); // bandera que se activa cuando se le da al boton de eliminar actividad
  const [onAcceptDeleteActivity, setOnAcceptDeleteActivity] = useState(false) // bandera que se activa cuando se acepta el modal de confirmacion para eliminiar actividad
  const [editActivityFlag, setEditActivityFlag] = useState(false);


  useEffect(() => {
    if (deleteActivityFlag === true) {
      // Agregar funcion para eliminar la actividad
      // Tomar en cuenta que se debe elevar un modal para confirmar eliminar
      console.log('delete flag true');
      
    }
  }, [deleteActivityFlag])

  const events_data = [
    {
      title: "Math",
      startTime: genTimeBlock("MON", 9),
      endTime: genTimeBlock("MON", 10, 50),
      location: "Classroom 403",
      extra_descriptions: ["Kim", "Lee"],
    },
    {
      title: "Math",
      startTime: genTimeBlock("WED", 9),
      endTime: genTimeBlock("WED", 10, 50),
      location: "Classroom 403",
      extra_descriptions: ["Kim", "Lee"],
    },
    {
      title: "Physics",
      startTime: genTimeBlock("MON", 11),
      endTime: genTimeBlock("MON", 11, 50),
      location: "Lab 404",
      extra_descriptions: ["Einstein"],
    },
    {
      title: "Physics",
      startTime: genTimeBlock("WED", 11),
      endTime: genTimeBlock("WED", 11, 50),
      location: "Lab 404",
      extra_descriptions: ["Einstein"],
    },
    {
      title: "Mandarin",
      startTime: genTimeBlock("TUE", 9),
      endTime: genTimeBlock("TUE", 10, 50),
      location: "Language Center",
      extra_descriptions: ["Chen"],
    },
    {
      title: "Japanese",
      startTime: genTimeBlock("FRI", 9),
      endTime: genTimeBlock("FRI", 10, 50),
      location: "Language Center",
      extra_descriptions: ["Nakamura"],
    },
    {
      title: "Club Activity",
      startTime: genTimeBlock("THU", 9),
      endTime: genTimeBlock("THU", 10, 50),
      location: "Activity Center",
    },
    {
      title: "Club Activity",
      startTime: genTimeBlock("FRI", 13, 30),
      endTime: genTimeBlock("FRI", 14, 50),
      location: "Activity Center",
    },
  ];



  // Funcion que toma la actividad seleccionada del horario
  const onEventPress = (event) => {
    console.log('onEventPress', event);
    setSelectedActivity(event);
  };

  function handleDeleteActivity() {
    if (selectedActivity !== undefined) {
      setDeleteActivityFlag(!deleteActivityFlag);
      // levantar un modal de acceptar eliminar
    } else {
      // levantar modal de falta actividad
      console.log('seleccione una actividad para eliminar')
    }
  }

  function handleCreateActivity() {
    setModalActivityAction('create');
    setModalActivityVisible(!modalActivityVisible);
  }

  function handleUpdateActivity() {
    // verificar si selecciono una actividad
    if (selectedActivity !== undefined) {
      setModalActivityAction('edit');
      setEditActivityFlag(true);
      setModalActivityVisible(!modalActivityVisible);
    }
    else {
      // levantar modal de falta actividad
      console.log('seleccione una actividad para editar')
    }
  }

  const deleteOptionSchedule = () => {
    Alert.alert("Confirmación", `¿Desea eliminar el horario seleccionado?`, [
      {
        text: "SI",
        onPress: () => {
          deleteSchedule(currentScheduleKey);
          setCurrentScheduleKey(null);
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
          placeholder={currentScheduleData !== undefined ? currentScheduleData.value : "Seleccione un horario"}
          setSelected={(item) => {
            setCurrentScheduleKey(item);
          }}
          boxStyles={{ borderColor: "#5B83B0" }}
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
      {/* calendario semanal */}
      <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
        <TimeTableView
          scrollViewRef={(ref) => scrollViewRef.current = ref}
          events={events_data}
          pivotTime={0}
          pivotEndTime={24}
          pivotDate={pivotDate}
          nDays={numOfDays}
          onEventPress={onEventPress}
          headerStyle={{ backgroundColor: '#5B83B0' }}
          formatDateHeader="dddd"
          locale="es"
        />
      </View>

      {/* Selector para botones editar, eliminiar y crear actividades */}
      <TouchableOpacity
        onPress={() => {
          setOptions(!options);
        }}
        style={styles.options}>
        <Icon name="ellipsis-v" type="font-awesome" color="#ffffff" size={25} />
        {options && (
          <TouchableOpacity
            onPress={() => { handleCreateActivity() }}
            style={styles.addCA}>
            <Icon name="plus" type="font-awesome" color="#ffffff" size={25} />
          </TouchableOpacity>
        )}
        {options && (
          // boton para accion para eliminar
          <TouchableOpacity
            onPress={() => { handleDeleteActivity() }}
            style={[
              styles.deleteCA,
              { backgroundColor: deleteActivityFlag ? "#FF5733" : "#5B83B0" },
            ]}
          >
            <Icon name="trash" type="font-awesome" color="#ffffff" size={25} />
          </TouchableOpacity>
        )}
        {options && (
          // boton para accion para editar
          <TouchableOpacity
            onPress={() => { handleUpdateActivity() }}
            style={[
              styles.editCA,
              { backgroundColor: editActivityFlag ? "#FF5733" : "#5B83B0" },
            ]}
          >
            <Icon name="edit" type="font-awesome" color="#ffffff" size={25} />
          </TouchableOpacity>
        )}

      </TouchableOpacity>

      {/* Modal de crear y editar actividad */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalActivityVisible}
        onRequestClose={() => {
          setModalActivityVisible(!modalActivityVisible);
        }}
      >
        <CreateEditActivityModal
          modalVisible={modalActivityVisible}
          setModalVisible={setModalActivityVisible}
          action={modalActivityAction}
          selectedActivity={selectedActivity}
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
  viewModeHeader:
  {
    padding: 5,
    width: 100
  },
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
  options: {
    position: "absolute",
    backgroundColor: "#5B83B0",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    right: 15,
  },
  addCA: {
    position: "absolute",
    backgroundColor: "#5B83B0",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 70,
    right: 0,
  },
  deleteCA: {
    position: "absolute",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 125,
    right: 0,
  },
  editCA: {
    position: "absolute",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 180,
    right: 0,
  },
});
