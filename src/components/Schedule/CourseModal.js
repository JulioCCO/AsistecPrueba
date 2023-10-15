import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";

import { Input } from "react-native-elements";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import HandlerCourse from "../../helpers/HandlerCourse";
import { ColorModal } from "./ColorModal";

const CourseModal = ({
  changeModalVisible,
  setActivityType,
  activityTypeValues,
  activityType,
  modalityValues,
  modalityType,
  setModalityType,
  WIDTH,
  HEIGHT,
  DAYS_OF_WEEK,
  listaComponents,
  setListaComponents,
  ultimoId,
  setUltimoId,
  ultimoIdRelacion,
  setUltimoIdRelacion,
  isModalVisible
}) => {
  // Define state variables with their initial values
  const [courseName, setCourseName] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [classroom, setClassroom] = useState("");

  // state for TimePicker component
  const [initialHour, setInitialHour] = useState(new Date());
  const [finalHour, setFinalHour] = useState(new Date());
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [initialHourText, setInitialHourText] = useState("Seleccionar hora");
  const [finalHourText, setFinalHourText] = useState("Seleccionar hora");
  //fechas
  const [initialDateText, setInitialDateText] = useState("Seleccionar fecha");
  const [finalDateText, setFinalDateText] = useState("Seleccionar fecha");
  const [showInitialHour, setShowInitialHour] = useState(false);
  const [showFinalHour, setShowFinalHour] = useState(false);
  //Fechas
  const [showInitialDate, setShowInitialDate] = useState(false);
  const [showFinalDate, setShowFinalDate] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);
  const [Days, setDays] = useState([]);
  const selectDays = [];

  // state for color picker  
  const [color, setColor] = React.useState('#FFFF00');
  const [modalColorState, setModalColorState] = useState(false);

  const changeModalColorVisible = () => {
    setModalColorState(!modalColorState);
  };

  // handler for initial hour change
  const onInitialHourChange = (event, selectedHour) => {
    setShowInitialHour(false);
    const currentHour = selectedHour || initialHour;
    const formatedHour = moment(selectedHour || initialHour).format("hh:mm a");
    setInitialHour(currentHour);
    setInitialHourText(formatedHour);
  };

  // handler for final hour change
  const onFinalHourChange = (event, selectedHour) => {
    setShowFinalHour(false);
    const currentHour = selectedHour || finalHour;
    const formatedHour = moment(selectedHour || finalHour).format("hh:mm a");
    setFinalHour(currentHour);
    setFinalHourText(formatedHour);
  };

  // handler to show the initial datepicker
  const showInitialHourpicker = () => {
    setShowInitialHour(true);
  };

  // handler to show the final datepicker
  const showFinalHourpicker = () => {
    setShowFinalHour(true);
  };

  // handler to show the initial datepicker
  const showInitialDatepicker = () => {
    setShowInitialDate(true);
  };

  // handler to show the final datepicker
  const showFinalDatepicker = () => {
    setShowFinalDate(true);
  };
  // handler for initial Date change
  const onInitialDateChange = (event, selectedDate) => {
    setShowInitialDate(false);
    const currentDate = selectedDate || initialDate;
    const formatedDate = moment(selectedDate || initialDate).format(
      "YYYY-MM-DD"
    );
    setInitialDate(currentDate);
    setInitialDateText(formatedDate);
  };

  // handler for final Date change
  const onFinalDateChange = (event, selectedDate) => {
    setShowFinalDate(false);
    const currentDate = selectedDate || finalDate;
    const formatedDate = moment(selectedDate || finalDate).format(
      "YYYY-MM-DD"
    );
    setFinalDate(currentDate);
    setFinalDateText(formatedDate);
  };


  // handler for selected days
  const handleDaysSelected = (index) => {
    var indexPersonal = index;
    if (index == 6) {
      indexPersonal = 0;
    } else {
      indexPersonal = index + 1
    }
    if (Days.includes(indexPersonal)) {
      const nuevaLista = Days.filter((item) => item !== indexPersonal);
      setDays(nuevaLista);
    } else {
      selectDays.push(indexPersonal);
      setDays(Days.concat(selectDays))
    }
    // Create a copy of the days of week array
    const updatedDays = [...DAYS_OF_WEEK];
    // Toggle the selected state of the selected day
    updatedDays[index].selected = !updatedDays[index].selected;
    // Update the selected days state variable with the selected days only
    setSelectedDays(updatedDays.filter((day) => day.selected));
  };

  const onCreateCourse = () => {
    if (
      [
        courseName,
        professorName,
        classroom,
        initialHour,
        finalHour,
        initialDate,
        finalDate,
      ].includes("") ||
      selectedDays.length === 0
    ) {
      alert("Por favor llena todos los espacios");
      return;
    }
    else if (finalDate < initialDate) {
      alert("La fecha final  inicia antes que la fecha inicial");
      return;
    } else if (finalHour <= initialHour) {
      alert("La hora final inicia o es igual que la hora inicial");
      return;
    } else {
      HandlerCourse({
        initialDate, finalDate, 
        courseName, professorName, 
        classroom, modalityType,
        initialHour, finalHour, 
        Days, listaComponents, 
        setListaComponents, ultimoId, 
        setUltimoId, ultimoIdRelacion, 
        setUltimoIdRelacion, color
      });
      setCourseName("");
      setProfessorName("");
      setClassroom("");
      setInitialDateText("Seleccionar una fecha");
      setFinalDateText("Seleccionar una fecha");
      setInitialHourText("Seleccionar hora");
      setFinalHourText("Seleccionar hora");
      setSelectedDays([]);
      changeModalVisible();
      return;
    }

  };

  return (
    // Modal

    <TouchableOpacity disabled={true} style={{
      ...styles.container,
      backgroundColor: isModalVisible ? "rgba(0,0,0,0.4)" : "transparent", // Cambia el fondo a oscuro cuando el modal está abierto
    }}>
      {/* Modal content */}
      <View style={{ ...styles.modal, height: HEIGHT, width: WIDTH }}>
        {/* Modal header */}
        <View style={styles.modalHeader}>
          {/* Close modal button */}
          <TouchableOpacity
            onPress={changeModalVisible}
            style={styles.closeModal}
          >
            <Icon name="close" size={30} color="white" style={{}} />
          </TouchableOpacity>

          {/* Activity type select */}
          <SelectList
            data={activityTypeValues}
            setSelected={setActivityType}
            dropdownStyles={{
              width: "90%",
              backgroundColor: "#F6F6F6",
              borderWidth: 0,
            }}
            inputStyles={{
              fontSize: 22,
              textAlign: "left",
              color: "#FFFFFF",
            }}
            placeholder={activityType}
            search={false}
            boxStyles={{
              borderWidth: 0,
              width: "80%",
            }}
            defaultOption={{ key: 1, value: "Agregar Curso" }}
            maxHeight={150}
          />

          {/* Course name input */}
          <Text style={styles.text}>Nombre</Text>
          <Input
            value={courseName}
            onChange={(event) => setCourseName(event.nativeEvent.text)}
            type="text"
            placeholder="Nombre del curso"
            placeholderTextColor={"white"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.courseNameInput}
          />
        </View>

        {/* Modal body */}
        <ScrollView style={styles.modalBody}>
          {/* Teacher name input */}
          <Text style={styles.text}>Profesor/a</Text>
          <Input
            value={professorName}
            onChange={(event) => setProfessorName(event.nativeEvent.text)}
            type="text"
            placeholder="Nombre del profesor/a"
            placeholderTextColor={"black"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.bodyInputs}
          />

          {/* Classroom input */}
          <Text style={styles.text}>Aula</Text>
          <Input
            value={classroom}
            onChange={(event) => setClassroom(event.nativeEvent.text)}
            type="text"
            placeholder="Numero del aula"
            placeholderTextColor={"black"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.bodyInputs}
          />

          {/* Modality select */}
          <Text style={styles.text}>Modalidad</Text>
          <SelectList
            data={modalityValues}
            setSelected={setModalityType}
            save="value"
            dropdownStyles={{
              width: "100%",
              backgroundColor: "#F6F6F6",
              borderWidth: 0,
            }}
            inputStyles={{
              fontSize: 18,
              textAlign: "left",
              color: "#000000",
            }}
            placeholder={modalityType}
            search={false}
            boxStyles={{
              borderWidth: 0,
              width: "90%",
              fontSize: 26,
            }}
            maxHeight={150}
          />
          {/* Start and end date */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              {/* Start date */}
              <Text style={styles.selectHourText}>Fecha inicio</Text>
              <TouchableOpacity
                onPress={showInitialDatepicker}
                style={styles.selectHour}
              >
                <Text style={{ fontSize: 16 }}>{initialDateText}</Text>
              </TouchableOpacity>

              {/* Initial date picker */}
              {showInitialDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={initialDate}
                  mode="date"
                  is24Hour={false}
                  display="default"
                  onChange={onInitialDateChange}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              {/* End date */}
              <Text style={styles.selectHourText}>Fecha final</Text>
              <TouchableOpacity
                onPress={showFinalDatepicker}
                style={styles.selectHour}
              >
                <Text style={{ fontSize: 16 }}>{finalDateText}</Text>
              </TouchableOpacity>

              {/* Final date picker */}
              {showFinalDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={finalDate}
                  mode="date"
                  is24Hour={false}
                  display="default"
                  onChange={onFinalDateChange}
                />
              )}
            </View>
          </View>

          {/* Start and end times */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              {/* Start time */}
              <Text style={styles.selectHourText}>Hora inicio</Text>
              <TouchableOpacity
                onPress={showInitialHourpicker}
                style={styles.selectHour}
              >
                <Text style={{ fontSize: 16 }}>{initialHourText}</Text>
              </TouchableOpacity>

              {/* Initial hour picker */}
              {showInitialHour && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={initialHour}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onInitialHourChange}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              {/* End time */}
              <Text style={styles.selectHourText}> Hora final</Text>
              <TouchableOpacity
                onPress={showFinalHourpicker}
                style={styles.selectHour}
              >
                <Text style={{ fontSize: 16 }}>{finalHourText}</Text>
              </TouchableOpacity>

              {/* Final hour picker */}
              {showFinalHour && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={finalHour}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onFinalHourChange}
                />
              )}
            </View>
          </View>

          {/* Select days */}
          <Text style={{ ...styles.text, marginTop: 20 }}>Día/s</Text>
          <View style={styles.selectDaysContainer}>
            {DAYS_OF_WEEK.map((day, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDaysSelected(index)}
                style={{
                  ...styles.selectDay,
                  borderColor: day.selected ? "#8FC1A9" : "#000000",
                }}
              >
                <Text style={{ padding: 2 }}>{day.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Select color */}
          <Text style={{ ...styles.text, marginTop: 20 }}>Color elegido</Text>
          <Text style={{ marginTop: 20 ,backgroundColor: color, marginBottom: 0, borderRadius:10 }}></Text>
          {/* Color button */}
          <TouchableOpacity

            onPress={changeModalColorVisible} style={styles.colorButton}>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Color
            </Text>
          </TouchableOpacity>
          {/* Create button */}
          <TouchableOpacity
            onPress={onCreateCourse}
            style={styles.createButton}
          >
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Crear
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Modal to select color */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalColorState}
          onRequestClose={() => {
            changeModalColorVisible();
          }}
        >
          <ColorModal
            color={color}
            setColor={setColor}
            modalColorState={modalColorState}
            changeModalColorVisible={changeModalColorVisible}
          />
        </Modal>

      </View >
    </TouchableOpacity >
  );
};

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
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#769ECB",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  closeModal: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  text: {
    marginStart: 9,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },

  courseNameInput: {
    color: "black",
    borderBottomWidth: 2,
    borderBottomColor: "#00000066",
  },

  modalBody: {
    width: "100%",
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },

  bodyInputs: {
    color: "black",
    borderBottomWidth: 2,
    borderBottomColor: "#00000066",
  },

  selectHourText: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },

  selectHour: {
    width: "90%",
    borderBottomWidth: 1,
    borderColor: "#00000066",
    marginLeft: 5,
  },

  selectDaysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 10,
  },

  selectDay: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  createButton: {
    backgroundColor: "#769ECB",
    margin: 5,
    marginBottom: 30,
    padding: 15,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
    bottom: -5,
    right: -160,
  },
  colorButton: {
    backgroundColor: "#769ECB",
    padding: 15,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
    bottom: -10,
    right: 0,
    top: 70,
  },

});

export default CourseModal;