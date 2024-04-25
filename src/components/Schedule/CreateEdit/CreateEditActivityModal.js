import React, { useState, useEffect } from 'react';
import { Input } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';

import DayOfWeekList from '../../../helpers/weekDays.js';
import { useSchedule } from "../../../hooks/useSchedule.js";
import { useActivity } from '../../../hooks/useActivity.js';


const CreateEditActivityModal = ({ modalVisible, setModalVisible, action, selectedActivity }) => {

  const { currentSchedule, currentScheduleKey } = useSchedule();
  const { addActivity } = useActivity();

  const WIDTH = Dimensions.get("window").width * 0.8;
  const HEIGHT = (Dimensions.get("window").height * 0.6) + 100;

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [extra_description, setExtra_description] = useState("");
  //horas
  const [initialHourText, setInitialHourText] = useState("Seleccionar hora");
  const [finalHourText, setFinalHourText] = useState("Seleccionar hora");
  const [showInitialHour, setShowInitialHour] = useState(false);
  const [showFinalHour, setShowFinalHour] = useState(false);
  // state for TimePicker component
  const [initialHour, setInitialHour] = useState(undefined);
  const [finalHour, setFinalHour] = useState(undefined);

  // Guarda el dia o dias seleccionados, en el que se debe mostrar dicha actividad
  const [selectedDays, setSelectedDays] = useState([]);
  const [listOfdays, setListOfDays] = useState([]);

  const [formatedData, setFormatedData] = useState(
    {
      title: '',
      location: '',
      description: '',
      daysList: [],
      scheduleId: '',
    }
  )

  // verificadores de campos vacios en las entradas
  const [titleFlag, setTitleFlag] = useState(false);


  // handler to show the initial datepicker
  const showInitialHourpicker = () => {
    setShowInitialHour(true);
  };

  // handler to show the final datepicker
  const showFinalHourpicker = () => {
    setShowFinalHour(true);
  };

  // Function that handles the change of the initial hour
  const onInitialHourChange = (event, selectedHour) => {
    setShowInitialHour(false);
    // Get the current selected hour or the initial hour if none is selected
    const currentHour = selectedHour || initialHour;
    // Format the selected hour to a string
    const formattedHour = moment(selectedHour || initialHour).format("hh:mm a");
    // Update the initial hour state variable and the initial hour text variable
    setInitialHour(currentHour);
    setInitialHourText(formattedHour);
  };

  // Function that handles the change of the final hour
  const onFinalHourChange = (event, selectedHour) => {
    setShowFinalHour(false);
    // Get the current selected hour or the final hour if none is selected
    const currentHour = selectedHour || finalHour;
    // Format the selected hour to a string
    const formattedHour = moment(selectedHour || finalHour).format("hh:mm a");
    // Update the final hour state variable and the final hour text variable
    setFinalHour(currentHour);
    setFinalHourText(formattedHour);
  };

  /*
      {
      title: "Matematica",
      startTime: genTimeBlock("MON", 9),
      endTime: genTimeBlock("MON", 10, 50),
      location: "Aula-16",
      extra_descriptions: ["clases de mate"],
    },
  */
  const onCreateActivity = async () => {
    validation = handleCheckInputs();
    console.log('validation', validation)

    if (validation === false) {
      const obj = {
        title,
        location,
        description: extra_description,
        daysList: [],
        scheduleId: currentScheduleKey,
      }
      setFormatedData(obj);
      console.log('obj', obj);
      const data = await addActivity(obj);
      console.log("backend request data", data);
      //handleFormattedDataToDateModel(selectedDays, initialHour, finalHour)
      setModalVisible(!modalVisible);
    }

  }

  const handleCheckInputs = () => {
    let validation = false;
    if (title === "") {
      setTitleFlag(true);
      validation = true
      return validation;
    } else {
      setTitleFlag(false);
      validation = false
    }

    //validar horas y minutos
    validation = validationDates();
    if (validation === true) return validation;
    //validar dias 
    validation = validationDaySelected()

    return validation;
  }

  /*
   Funcion encargada de verificar que la hora inicial de la actividad no sea
   mayor a la hora final. Si la actividad tiene la misma hora valida los minutos.
   Tambien verifica que se haya ingresado la fecha inicial o la fecha final

   Para la verificacion usa los valores de los states: initialHour y finalHour.

  */
  const validationDates = () => {
    let validation = false;
    if (initialHour === undefined) {
      let text = "Ingrese la hora inicial de la actividad."
      console.log(text);
      handleInvalidDate(text);
      validation = true
      return validation
    }
    if (finalHour === undefined) {
      let text = "Ingrese la hora final de la actividad."
      console.log(text);
      handleInvalidDate(text);
      validation = true
      return validation
    }

    // Obtener las horas de los objetos Date
    const initialHourCheck = initialHour.getHours();
    const initialMinutesCheck = initialHour.getMinutes();

    const finalHourCheck = finalHour.getHours();
    const finalMinutesCheck = finalHour.getMinutes();

    if (initialHourCheck > finalHourCheck) { // La hora inicial no puede ser menor a la hora final
      let text = "La hora inicial no puede ser mayor a la hora final."
      console.log(text);
      handleInvalidDate(text);
      validation = true
      return validation
    }
    else if (initialHourCheck === finalHourCheck) { // si es la misma hora, verificar minutos 
      if (initialMinutesCheck >= finalMinutesCheck) {
        let text = "Cuando las hora inicial es igual a la hora fina, los minutos de la hora inicial no pueden ser mayores o iguales a los de la hora final."
        console.log(text)
        handleInvalidDate(text);
        validation = true
        return validation
      }
    }
    return validation
  }

  // Guarda los dias seleccionados en el state selectedDays
  const validationDaySelected = () => {
    let validation = false;
    const onlySelectedDays = listOfdays.filter(day => day.isSelected === true);
    setSelectedDays(onlySelectedDays);

    if (onlySelectedDays.length === 0) {
      let text = "Seleccione al menos un día."
      console.log(text);
      handleInvalidDate(text);
      validation = true;
      return validation;
    }
    return validation;
  }

  // funcion que recibe un json con el dia seleccionado y cambia su paramentro isSelected
  const handleDaysSelected = (dayParameter) => {

    const updatedListOfDays = listOfdays.map((day) => {
      if (day.id === dayParameter.id) {
        return { ...day, isSelected: !day.isSelected };
      } else {
        return day;
      }
    });
    setListOfDays(updatedListOfDays);
  }

  const handleInvalidDate = (text) => {
    Alert.alert("Alerta", text, [
      {
        text: "Aceptar",
      },
      {
        text: "CANCELAR",
        style: "cancel",
      },
    ]);
  };

  const handleFormattedDataToDateModel = (daysList, iniDate, finDate, activityId) => {

    const initialHour = iniDate.getHours();
    const initialMinutes = iniDate.getMinutes();

    const finalHour = finDate.getHours();
    const finalMinutes = finDate.getMinutes();
    const dateObjList = daysList.map((dayToParse) => {
      return dateObj =
      {
        day: dayToParse.day,
        initialHour: initialHour,
        initialMinute: initialMinutes,
        finalHour: finalHour,
        finalMinute: finalMinutes,
        activityID: activityId,
      }
    });
    console.log('dateObjList', dateObjList);
  }

  useEffect(() => {
    if (action === "edit") {
      if (selectedActivity !== undefined) {
        console.log('CreateEditActivityModal: useEffect: selectedActivity', selectedActivity)
        // llamar a funcion que se encargue de subir los datos de la actividad
        setListOfDays(DayOfWeekList);
      } else {
        console.log('seleccione una actividad')
      }
    }
    else if (action === "create") {
      setListOfDays(DayOfWeekList);
    }
  }, [])

  return (
    <TouchableOpacity
      disabled={true}
      style={{
        ...styles.containerModal,
        backgroundColor: modalVisible ? "rgba(0,0,0,0.4)" : "transparent", // Cambia el fondo a oscuro cuando el modal está abierto
      }}
    >
      <View style={{ ...styles.modal, width: WIDTH, height: HEIGHT }}>
        <View style={styles.modalHeader}>
          <Text style={{ fontSize: 20, color: "white" }}>Crear Actividad</Text>
          <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} style={styles.closeModal}>
            <Icon name="close" size={25} color="white" style={{}} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalBody}>
          <Text style={styles.text}>Título</Text>
          <Input
            placeholder="Título de la actividad"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.nativeEvent.text)}
            placeholderTextColor={"grey"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{
              color: "black",
              borderBottomWidth: 2,
              borderBottomColor: "#00000066",
            }}
            errorMessage={titleFlag && "* Ingrese el titulo."}
          />
          <Text style={styles.text}>Ubicación</Text>
          <Input
            placeholder="Ubicación de la actividad"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.nativeEvent.text)}
            placeholderTextColor={"grey"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{
              color: "black",
              borderBottomWidth: 2,
              borderBottomColor: "#00000066",
            }}
          />
          <Text style={styles.text}>Descripción</Text>
          <Input
            placeholder="Descripción de la actividad"
            type="text"
            value={extra_description}
            onChange={(event) => setExtra_description(event.nativeEvent.text)}
            placeholderTextColor={"grey"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{
              color: "black",
              borderBottomWidth: 2,
              borderBottomColor: "#00000066",
            }}
          />

          {/* Start and end times */}
          <Text style={{ ...styles.text, fontSize: 14, }}>Horario</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              {/* Start time */}
              <Text style={styles.bodyText}>Hora Inicial</Text>
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
                  value={initialHour === undefined ? new Date() : initialHour}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onInitialHourChange}
                  minuteInterval={5}
                  positiveButton={{ label: 'Aceptar', textColor: 'green' }}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              {/* End time */}
              <Text style={styles.bodyText}>Hora Final</Text>
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
                  value={finalHour === undefined ? new Date() : finalHour}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onFinalHourChange}
                  minuteInterval={5}
                  positiveButton={{ label: 'Aceptar', textColor: 'green' }}
                />
              )}
            </View>
          </View>
          {/* Muestra botones con los dias a elegir para crear la actividad */}
          <Text style={{ ...styles.text, marginTop: 20 }}>Día/s</Text>
          <View style={styles.selectedDaysContainerStyle}>
            {listOfdays.map((day) => (
              <TouchableOpacity
                key={day.id}
                onPress={() => handleDaysSelected(day)}
                style={{ ...styles.selectedDayStyle, borderColor: day.isSelected ? "#8FC1A9" : "#000000", }}
              >
                <Text style={{ padding: 2 }}>{day.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Boton que acepta el crear actividad */}
          <View style={{ margin: 10 }}>
            <TouchableOpacity
              onPress={() => onCreateActivity()}
              style={{
                alignSelf: "flex-end",
                borderColor: "#8FC1A9", // Color del borde igual al color del texto
                borderWidth: 1, // Grosor del borde
                marginTop: 5

              }}
            >
              <View style={{ padding: 5 }}>
                <Text
                  style={{
                    color: "#8FC1A9",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Guardar
                </Text>
              </View>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}

export default CreateEditActivityModal;

const styles = StyleSheet.create({
  containerModal: {
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
  selectHour: {
    width: "90%",
    borderBottomWidth: 1,
    borderColor: "#00000066",
    marginLeft: 5,
  },
  bodyText: {
    marginStart: 9,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },
  text: {
    marginStart: 9,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },
  selectedDaysContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 10,
  },
  selectedDayStyle: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
