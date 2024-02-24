import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

import moment from "moment";
import { idGenerator } from "../../helpers/IdGenerator";
import EventModalTop from "./EventModalTop";
import EventModalBody from "./EventModalBody";
import useData from "../../hooks/useData";
import { u } from "react-native-big-calendar";

//Window Dimensions
const WIDTH = Dimensions.get("window").width - 70;
const HEIGHT = Dimensions.get("window").height - 160;

const EventModal = ({
  changeModalVisible,
  daySelected,
  handleCreateEvent,
  handleEditEvent,
  isModalVisible,
  selectedEvent,
}) => {
  const { userDatabaseID } = useData();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    userId: userDatabaseID,
    initialHour: new Date(),
    finalHour: new Date(),
    initialHourText: "Seleccionar hora",
    finalHourText: "Seleccionar hora",
    showInitialHour: false,
    showFinalHour: false,
    selectedReminder: 3,
    isAllDay: false,
    modalTitle: "Crear evento",
    buttonText: "Crear",
    editedName: "",
  });

  const {
    title,
    description,
    initialHour,
    finalHour,
    initialHourText,
    finalHourText,
    showInitialHour,
    showFinalHour,
    selectedReminder,
    isAllDay,
    modalTitle,
    buttonText,
    editedName,
  } = eventData;

  const onInitialHourChange = (event, selectedHour) => {
    setEventData({
      ...eventData,
      showInitialHour: false,
      initialHour: selectedHour || initialHour,
      initialHourText: moment(selectedHour || initialHour).format("hh:mm a"),
    });
  };

  const onFinalHourChange = (event, selectedHour) => {
    setEventData({
      ...eventData,
      showFinalHour: false,
      finalHour: selectedHour || finalHour,
      finalHourText: moment(selectedHour || finalHour).format("hh:mm a"),
    });
  };

  const showInitialDatepicker = () => {
    setEventData({ ...eventData, showInitialHour: true });
  };
  const showFinalDatepicker = () => {
    setEventData({ ...eventData, showFinalHour: true });
  };

  const closeModal = () => {
    changeModalVisible();
  };

  useEffect(() => {
    if (selectedEvent !== null) {
      setEventData({
        ...eventData,
        ...selectedEvent,
        modalTitle: "Editar evento",
        buttonText: "Aceptar",
        editedName: selectedEvent.name,
        title: selectedEvent.name,
      });
    }
  }, []);

  useEffect(() => {
    if (isAllDay) {
      setEventData({
        ...eventData,
        initialHourText: "12:01 am",
        finalHourText: "11:59 pm",
        initialHour: new Date(0, 0, 0, 0, 1, 0, 0),
        finalHour: new Date(0, 0, 0, 23, 59, 0, 0),
      });
    }
  }, [isAllDay]);

  const handleOnCreateEvent = () => {
    // Validate that all fields are complete
    if (
      (title &&
        description &&
        initialHourText !== "Seleccionar hora" &&
        finalHourText !== "Seleccionar hora" &&
        selectedReminder) ||
      isAllDay
    ) {
      const initialHourToString = initialHour.toString();
      const finalHourToString = finalHour.toString();
      // Validate that the start time is less than the end time.
      if (new Date(initialHour).getTime() < new Date(finalHour).getTime()) {
        const newEvent = {
          name: title,
          userId: userDatabaseID,
          description,
          initialHour: initialHourToString,
          finalHour: finalHourToString,
          initialHourText,
          finalHourText,
          reminder: selectedReminder,
          reminderText: reminderValues[selectedReminder - 1].value,
          isAllDay,
          date: daySelected,
        };

        // Reset values
        const resetEventData = {
          title: "",
          userId: userDatabaseID,
          description: "",
          initialHour: new Date(),
          finalHour: new Date(),
          id: idGenerator(),
          initialHourText: "Seleccionar hora",
          finalHourText: "Seleccionar hora",
          selectedReminder: 3,
          isAllDay: false,
          modalTitle: "Crear evento",
          buttonText: "Crear",
          editedName: "",
        };

        setEventData(resetEventData);
        closeModal();
        if (selectedEvent !== null) {
          handleEditEvent(newEvent, newEvent.id);
        } else handleCreateEvent(newEvent);
      } else {
        alert("La hora de inicio debe ser menor a la hora final");
      }
    } else {
      alert("Por favor, complete todos los campos");
    }
  };

  // ReminderValues
  const reminderValues = [
    { key: 1, value: "5 minutos antes" },
    { key: 2, value: "30 minutos antes" },
    { key: 3, value: "1 dia antes" },
    { key: 4, value: "1 semana antes" },
  ];

  return (
    <TouchableOpacity
      disabled={true}
      style={[
        styles.container,
        { backgroundColor: isModalVisible ? "rgba(0,0,0,0.4)" : "transparent" },
      ]}
    >
      <View style={styles.generalView}>
        <EventModalTop
          closeModal={closeModal}
          daySelected={daySelected}
          modalTitle={modalTitle}
          title={title}
          setEventData={setEventData}
          eventData={eventData}
        />

        <EventModalBody
          setEventData={setEventData}
          eventData={eventData}
          description={description}
          isAllDay={isAllDay}
          showInitialDatepicker={showInitialDatepicker}
          initialHourText={initialHourText}
          showInitialHour={showInitialHour}
          initialHour={initialHour}
          onInitialHourChange={onInitialHourChange}
          showFinalDatepicker={showFinalDatepicker}
          finalHourText={finalHourText}
          showFinalHour={showFinalHour}
          finalHour={finalHour}
          onFinalHourChange={onFinalHourChange}
          reminderValues={reminderValues}
          selectedReminder={selectedReminder}
          handleOnCreateEvent={handleOnCreateEvent}
          buttonText={buttonText}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  generalView: {
    height: HEIGHT,
    width: WIDTH,
    paddingTop: 0,
    backgroundColor: "white",
    borderRadius: 24,
  },
});

export default EventModal;
