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
  const {eventItems, setEventItems} = useData();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  //Function to refresh the notifications, events and components
  const { getNotifications, refreshEventData, setEventTransaction, setAllEventsDeleted } = useData();

  const { events, addEvent } = useEvent()

  useEffect(() => {
    if (showNotification) {
      setShowNotification(false);
    }
  }, [showNotification, events]);

  const changeModalVisible = () => {
    if(isModalVisible) {
      setSelectedEvent(null);
    }
    setIsModalVisible(!isModalVisible);
  }


  const handleCreateEvent= (event) => {
    /* This is because eventItems has {"init": "init"} 
    when it's created to avoid visual bug
    */
    addEvent(event)
      if(eventItems[0].init === "init") {
        setEventItems([event])
      }else {
        setEventItems([...eventItems,event])
      }
    setNewEvent(event);
    setEventTransaction(true);
    setShowNotification(true);
  }

  
  const handleEditEvent = (eventEdited, eventId) => {

    // Create a new array with the edited event
    setEventItems(prevArray=> {
      return prevArray.map(event => {
        if(event.id === eventId) {
          return eventEdited;
        } else {
          return event;
        }

      })
    })
    setNewEvent(eventEdited);
    setEventTransaction(true);
    setShowNotification(true);
    setItemInfo(eventEdited);
  }
   
  const handleDeleteEvent = (item) => {
    const newItemsArray = eventItems.filter(event => event.name != item.name);

    if(newItemsArray.length === 0) {
        setEventItems([{"init": "init"}]);
        setAllEventsDeleted(true);
        setEventTransaction(true);
    } else {
      setEventItems(newItemsArray)
      setEventTransaction(true);
    }
    getNotifications();
    refreshEventData();
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
        eventCalendarItems={events}
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