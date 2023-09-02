import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Switch,
} from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { SelectList } from "react-native-dropdown-select-list";
import { useEffect } from "react";
import { idGenerator } from "../../helpers/IdGenerator";
import { set } from "date-fns";

const WIDTH = Dimensions.get("window").width - 70;
const HEIGHT = Dimensions.get("window").height - 160;

const  EventModal = ({ changeModalVisible, daySelected, onEventCreated, isModalVisible, selectedEvent }) => {
  //---------------------------------States---------------------------------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //TimePicker
  const [initialHour, setInitialHour] = useState(new Date());
  const [finalHour, setFinalHour] = useState(new Date());
  const [initialHourText, setInitialHourText] = useState("Seleccionar hora");
  const [finalHourText, setFinalHourText] = useState("Seleccionar hora");
  const [showInitialHour, setShowInitialHour] = useState(false);
  const [showFinalHour, setShowFinalHour] = useState(false);
  //DropDownPicker
  const [selectedReminder, setSelectedReminder] = useState(3);
  //Switcher
  const [isAllDay, setIsAllDay] = useState(false);
  //Button
  const [modalTitle, setModalTitle] = useState("Crear evento");
  const [buttonText, setButtonText] = useState("Crear");

  //Edited Name
  const  [editedName, setEditedName] = useState("");


  

  //-------------------------------Functions---------------------------------
  const onInitialHourChange = (event, selectedHour) => {
    setShowInitialHour(false);
    const currentHour = selectedHour || initialHour;
    const formatedHour = moment(selectedHour || initialHour).format("hh:mm a");
    setInitialHour(currentHour);
    setInitialHourText(formatedHour);
  };

  const onFinalHourChange = (event, selectedHour) => {
    setShowFinalHour(false);
    const currentHour = selectedHour || finalHour;
    const formatedHour = moment(selectedHour || finalHour).format("hh:mm a");
    setFinalHour(currentHour);
    setFinalHourText(formatedHour);
  };

  const showInitialDatepicker = () => {
    setShowInitialHour(true);
  };
  const showFinalDatepicker = () => {
    setShowFinalHour(true);
  };

  const closeModal = () => {
    changeModalVisible();
  };




  //----------------------------Edit Verification------------------------------
  useEffect (() => {
    if(selectedEvent !== null){
      setTitle(selectedEvent.name);
      setDescription(selectedEvent.description);
      setInitialHour(selectedEvent.initialHour);
      setInitialHourText(selectedEvent.initialHourText);
      setFinalHour(selectedEvent.finalHour);
      setFinalHourText(selectedEvent.finalHourText);
      setSelectedReminder(selectedEvent.reminder);
      setIsAllDay(selectedEvent.isAllDay);
      setModalTitle("Editar evento");
      setButtonText("Aceptar");
      setEditedName(selectedEvent.name);
    }
  },[]);
  //-------------------------------Switcher----------------------------------
  useEffect(() => {
    // Esta función se ejecutará cada vez que isAllDay cambie de valor
    if (isAllDay) {
      setInitialHourText("12:01 am");
      setFinalHourText("11:59 pm");
      const defaultInitialHour = new Date();
      defaultInitialHour.setHours(0, 1, 0, 0);

      const defaultFinalHour = new Date();
      defaultFinalHour.setHours(23, 59, 0, 0);

      setInitialHour(defaultInitialHour);
      setFinalHour(defaultFinalHour);
      
    }
  }, [isAllDay]); 


  const handleOnCreateEvent = () => {
    //Validar que todos los campos esten completos
    if (
      (title &&
      description &&
      initialHourText !== "Seleccionar hora" &&
      finalHourText !== "Seleccionar hora" &&
      selectedReminder) || isAllDay

    ) {

      //imprimir hora inicial y final
      console.log("Hora inicial: " + initialHourText);
      console.log("Hora final: " + finalHourText);
      //Validar que la hora inicial sea menor a la hora final
        if(new Date(initialHour).getTime() < new Date(finalHour).getTime()){
    
          const newEvent = {
            [daySelected] : [
              {
                name: title,
                id: idGenerator(),
                description: description,
                initialHour: initialHour,
                finalHour: finalHour,
                initialHourText: initialHourText,
                finalHourText: finalHourText,
                reminder: selectedReminder,
                reminderText: reminderValues[selectedReminder - 1].value,
                isAllDay: isAllDay,
                date: daySelected,
              },
            ],
          };

          // Resetear los valores
          setTitle("");
          setDescription("");
          closeModal();
          setFinalHourText("Seleccionar hora");
          setInitialHourText("Seleccionar hora");
          setSelectedReminder(3);
          setIsAllDay(false);
          setInitialHour(new Date());
          setFinalHour(new Date());
          onEventCreated(newEvent, editedName); 
          setEditedName("");
          changeModalVisible();
        } else {
          alert("La hora de inicio debe ser menor a la hora final");
        }
    } else {
      alert("Por favor, complete todos los campos");
    }
  };

  //ReminderValues
  const reminderValues = [
    { key: 1, value: "5 minutos antes" },
    { key: 2, value: "30 minutos antes" },
    { key: 3, value: "1 dia antes" },
    { key: 4, value: "1 semana antes" },
  ];

  return (
    <TouchableOpacity
      disabled={true}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isModalVisible ? "rgba(0,0,0,0.4)" : "transparent", // Cambia el fondo a oscuro cuando el modal está abierto
      }}
    >

      <View
        style={{
          height: HEIGHT,
          width: WIDTH,
          paddingTop: 0,
          backgroundColor: "white",
          borderRadius: 24,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            padding: 10,
            backgroundColor: "#8FC1A9",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={{
              position: "absolute",
              top: 5,
              right: 10,
            }}
          >
            <Icon name="close" size={30} color="white" style={{}} />
          </TouchableOpacity>

          <Text
            style={{
              margin: 5,
              fontSize: 12,
              fontWeight: "bold",
              opacity: 0.4,
            }}
          >
            {daySelected}
          </Text>

          <Text
            style={{
              margin: 5,
              marginStart: 9,
              fontSize: 26,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {modalTitle}
          </Text>

          <Text
            style={{
              margin: 5,
              marginStart: 9,
              fontSize: 12,
              fontWeight: "bold",
              opacity: 0.4,
            }}
          >
            Titulo
          </Text>

          <Input
            value={title}
            onChange={(event) => setTitle(event.nativeEvent.text)}
            type="text"
            placeholder="Titulo del Evento"
            placeholderTextColor={"white"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{
              color: "white",
              borderBottomWidth: 2,
              borderBottomColor: "#00000066",
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "column",
            padding: 15,
            flex: 1,
          }}
        >
          <Text
            style={{
              margin: 5,
              fontSize: 12,
              fontWeight: "bold",
              opacity: 0.4,
            }}
          >
            Descripcion
          </Text>

          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={setDescription}
            value={description}
            style={{
              borderWidth: 1,
              borderColor: "#00000066",
              borderRadius: 5,
              margin: 5,
              padding: 8,
              textAlignVertical: "top",
            }}
          />

          {!isAllDay && (
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  margin: 5,
                  fontSize: 12,
                  fontWeight: "bold",
                  opacity: 0.4,
                }}
              >
                Inicio
              </Text>

              <TouchableOpacity
                onPress={showInitialDatepicker}
                style={{
                  width: "90%",
                  borderBottomWidth: 1,
                  borderColor: "#00000066",
                  marginLeft: 5,
                }}
              >
                <Text style={{ fontSize: 16 }}>{initialHourText}</Text>
              </TouchableOpacity>
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
              <Text
                style={{
                  margin: 5,
                  fontSize: 12,
                  fontWeight: "bold",
                  opacity: 0.4,
                }}
              >
                Fin
              </Text>

              <TouchableOpacity
                onPress={showFinalDatepicker}
                style={{
                  width: "90%",
                  borderBottomWidth: 1,
                  borderColor: "#00000066",
                  marginLeft: 5,
                }}
              >
                <Text style={{ fontSize: 16 }}>{finalHourText}</Text>
              </TouchableOpacity>
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
          )}
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="ios-notifications"
                  size={20}
                  color="#808080"
                  style={{ marginTop: 15 }}
                />
                <SelectList
                  data={reminderValues}
                  setSelected={setSelectedReminder}
                  dropdownStyles={{
                    width: 150,
                    backgroundColor: "#F6F6F6",
                    borderWidth: 0,
                  }}
                  inputStyles={{ fontSize: 16, textAlign: "left" }}
                  placeholder={selectedReminder}
                  search={false}
                  boxStyles={{ width: 150, borderWidth: 0 }}
                  defaultOption={{ key: selectedReminder, value: reminderValues[selectedReminder-1].value }}
                  maxHeight={150}
                />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ marginTop: 10, fontSize: 16 }}>Todo el dia</Text>
              <Switch
                style={{ marginLeft: 10, position: "absolute", right: 0 }}
                trackColor={{ false: "grey", true: "green" }}
                ios_backgroundColor={"grey"}
                thumbColor={isAllDay ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={setIsAllDay}
                value={isAllDay}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleOnCreateEvent}
            style={{
              backgroundColor: "#8FC1A9",
              margin: 5,
              padding: 15,
              borderRadius: 20,
              width: "40%",
              alignItems: "center",
              position: "absolute",
              bottom: 15,
              right: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventModal;