import React, { useState, useEffect } from "react";

import {
  View,
  TouchableOpacity,
  Modal, StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import moment from "moment";

import EventModal from "../components/Events/EventModal";
import EventCalendar from "../components/Events/EventCalendar";
import PushNotification from "../components/Notification/PushNotification";
import useData from "../hooks/useData";
import { useEvent } from "../hooks/useEvent";


const EventosScreen = () => {
  const [daySelected, setDaySelected] = useState(moment().format("YYYY-MM-DD"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemInfo, setItemInfo] = useState({});
  const { eventItems, setEventItems } = useData();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [newEvent, setNewEvent] = useState({});

  const { addEvent, editEvent } = useEvent()

  const changeModalVisible = () => {
    if (isModalVisible) {
      setSelectedEvent(null);
    }
    setIsModalVisible(!isModalVisible);
  }

  const handleCreateEvent = (event) => {
    addEvent(event)
    /* This is because eventItems has {"init": "init"} 
    when it's created to avoid visual bug
    */
    if (eventItems[0].init === "init") {
      setEventItems([event])
    } else {
      setEventItems([...eventItems, event])
    }
    setNewEvent(event);
    (true);
    setShowNotification(true);
  }

  const handleEditEvent = (eventEdited) => {
    editEvent(eventEdited)
    setItemInfo(eventEdited);
  }

  const handleDeleteEvent = (item) => {
    const newItemsArray = eventItems.filter(event => event.name != item.name);

    if (newItemsArray.length === 0) {
      setEventItems([{ "init": "init" }]);
    } else {
      setEventItems(newItemsArray)
    }
  }

  return (
    <View
      style={styles.container}
    >
      {
        showNotification ? (
          <PushNotification item={newEvent} />
        ) : null
      }

      {/* Item that shows a calendar and allows to select a day */}
      <EventCalendar
        daySelected={daySelected}
        setDaySelected={setDaySelected}
        changeModalVisible={changeModalVisible}
        setSelectedEvent={setSelectedEvent}
        itemInfo={itemInfo}
        setItemInfo={setItemInfo}
        handleDeleteEvent={handleDeleteEvent}
      />

      {/* Button to create new event (Icon at bottom right) */}
      <TouchableOpacity
        onPress={changeModalVisible}
        style={styles.createEvent}
      >
        <Icon name="plus" type="font-awesome" color="#ffffff" size={24} />
      </TouchableOpacity>

      {/* Modal that allows to inserting data to create a new event */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={changeModalVisible}
      >
        <EventModal
          changeModalVisible={changeModalVisible}
          daySelected={daySelected}
          isModalVisible={isModalVisible}
          handleCreateEvent={handleCreateEvent}
          handleEditEvent={handleEditEvent}
          selectedEvent={selectedEvent}

        />
      </Modal>
    </View>
  );

};


// These are all the styles of this screen
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  createEvent: {
    position: "absolute",
    backgroundColor: "#5B83B0",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 15,
    right: 15,
  }
});

export default EventosScreen;