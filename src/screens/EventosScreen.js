import React, { useState, useEffect } from "react";

import {
  View,
  TouchableOpacity,
  Modal, StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import EventModal from "../components/Events/EventModal";
import EventCalendar from "../components/Events/EventCalendar";
import PushNotification from "../components/Notification/PushNotification";

const EventosScreen = () => {
  const [daySelected, setDaySelected] = useState(moment().format("YYYY-MM-DD"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemInfo, setItemInfo] = useState({});
  const [eventItems, setEventItems] = useState({"init": "init"});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [newEvent, setNewEvent] = useState({});

  useEffect(() => {
    if (showNotification) {
      setShowNotification(false);
    }
  }, [showNotification]);

  const changeModalVisible = () => {
    if(isModalVisible) {
      setSelectedEvent(null);
    }
    setIsModalVisible(!isModalVisible);
  }

  const handleCreateEvent = (event, oldName) => {
    const eventDate = Object.keys(event)[0];
    const eventsDates = Object.keys(eventItems);

    /* This is because eventItems has "init": "init" 
    when it's created to avoid visual bug
    */
    if(eventItems["init"]) {
      delete eventItems["init"]
    }

    // If there is already an event on the selected date, the new event is added.
    if(eventsDates.includes(eventDate) && selectedEvent === null) {
      setEventItems({...eventItems, [eventDate] : [...eventItems[eventDate], event[eventDate][0]]});
      // Event is saved in the AsyncStorage
      AsyncStorage.setItem("storedEvents", JSON.stringify({...eventItems, [eventDate] : [...eventItems[eventDate], event[eventDate][0]]}));
      setNewEvent(event[eventDate][0]);
      setShowNotification(true);
    }

    // If there is already an event on the selected date and it is being edited, the event is updated.
    else if(eventsDates.includes(eventDate) && selectedEvent !== null) {
      handleEditEvent(event, oldName, eventItems, eventDate);
    } else {
      setEventItems({...eventItems, [eventDate] : event[eventDate]});
      // Event is saved in the AsyncStorage
      AsyncStorage.setItem("storedEvents", JSON.stringify({...eventItems, [eventDate] : event[eventDate]}));
      setNewEvent(event[eventDate][0]);
      setShowNotification(true);
    }
  }

  const handleEditEvent = (event, oldName, eventItems, eventDate) => {
    // The event is updated
    const newEventItems = eventItems[eventDate].map((item) => {
      /* If the name of the event is equal to the name of the selected event, 
      the event is updated if the name has been changed. */

      // Check if the name has been changed
      if(oldName !== "" && item.name === oldName) return event[eventDate][0];
      if(item.name === selectedEvent.name) return event[eventDate][0];

      return item;
    });

    setEventItems({...eventItems, [eventDate] : newEventItems});
    // Event is saved in the AsyncStorage
    AsyncStorage.setItem("storedEvents", JSON.stringify({...eventItems, [eventDate] : newEventItems}));
    setNewEvent(event[eventDate][0]);
    setShowNotification(true);
    setItemInfo(event[Object.keys(event)][0]);
  }
   
  const handleDeleteEvent = (item) => {
    const itemToDelete = eventItems[item["date"]];
    const newItemsArray = itemToDelete.filter(event => event["name"] != item["name"]);

    if(newItemsArray.length === 0) {
      delete eventItems[item["date"]];
      AsyncStorage.setItem("storedEvents", JSON.stringify(eventItems));

      if(Object.keys(eventItems).length === 0) {
        setEventItems({"init": "init"});
        // Event is saved in the AsyncStorage
        AsyncStorage.setItem("storedEvents", JSON.stringify({"init": "init"}));
      }
    } else {
      setEventItems({...eventItems, [item["date"]]: newItemsArray})
      // Event is saved in the AsyncStorage
      AsyncStorage.setItem("storedEvents", JSON.stringify({...eventItems, [item["date"]]: newItemsArray}));
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
        eventCalendarItems={eventItems}
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