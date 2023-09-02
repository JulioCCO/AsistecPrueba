import {
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import EventModal from "../components/Events/EventModal";
import EventCalendar from "../components/Events/EventCalendar";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "../components/Notification/PushNotification";
import { useEffect } from "react";

const EventosScreen = () => {
  const [daySelected, setDaySelected] = useState(moment().format("YYYY-MM-DD"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemInfo, setItemInfo] = useState({});
  
  // const {eventItems, setEventItems} = useData();
  const [eventItems, setEventItems] = useState({"init": "init"});
  // const {getNotifications} = useData();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [newEvent, setNewEvent] = useState({});

  useEffect(() => {
    if (showNotification) {
      setShowNotification(false);
    }
  }, [showNotification]);

  const handleEventCreated = (event, oldName) => {
    const eventDate = Object.keys(event)[0];
    const eventsDates = Object.keys(eventItems);

    if(eventItems["init"]) {
      delete eventItems["init"]
    }

    // Si ya hay un evento en la fecha seleccionada, se agrega el nuevo evento
    if(eventsDates.includes(eventDate) && selectedEvent === null) {
      setEventItems({...eventItems, [eventDate] : [...eventItems[eventDate], event[eventDate][0]]});
      // Se guarda el evento en el AsyncStorage
      AsyncStorage.setItem("storedEvents", JSON.stringify({...eventItems, [eventDate] : [...eventItems[eventDate], event[eventDate][0]]}));
      setNewEvent(event[eventDate][0]);
      setShowNotification(true);
    }

    // Si ya hay un evento en la fecha seleccionada y se esta editando, se actualiza el evento
    else if(eventsDates.includes(eventDate) && selectedEvent !== null) {

      

      // Se actualiza el evento
      const newEventItems = eventItems[eventDate].map((item) => {
        // Si el nombre del evento es igual al nombre del evento seleccionado, se actualiza el evento esto en caso de que se haya cambiado el nombre

        //se verifica si se cambio el nombre
        if(oldName !== "") {

          if(item.name === oldName) {

            return event[eventDate][0];
          }
    
        } else{

        if(item.name === selectedEvent.name) {

          return event[eventDate][0];
        }
        }
        return item;
      });
      setEventItems({...eventItems, [eventDate] : newEventItems});
      // Se guarda el evento en el AsyncStorage
      AsyncStorage.setItem("storedEvents", JSON.stringify({...eventItems, [eventDate] : newEventItems}));
      setNewEvent(event[eventDate][0]);
      setShowNotification(true);
      setItemInfo(event[Object.keys(event)][0]);

    } else {
      setEventItems({...eventItems, [eventDate] : event[eventDate]});
      // Se guarda el evento en el AsyncStorage
      AsyncStorage.setItem("storedEvents", JSON.stringify({...eventItems, [eventDate] : event[eventDate]}));
      setNewEvent(event[eventDate][0]);
      setShowNotification(true);
    }
  }

  const changeModalVisible = () => {

    if(isModalVisible) {
      setSelectedEvent(null);
    }
    setIsModalVisible(!isModalVisible);
  
  };

  const onDelete = (item) => {
    const itemToDelete = eventItems[item["date"]];
    const newItemsArray = itemToDelete.filter(event => event["name"] != item["name"]);

    if(newItemsArray.length === 0) {
      delete eventItems[item["date"]];
      AsyncStorage.setItem("storedEvents", JSON.stringify(eventItems));

      if(Object.keys(eventItems).length === 0) {
        setEventItems({"init": "init"});
        // Se guarda el evento en el AsyncStorage
        AsyncStorage.setItem("storedEvents", JSON.stringify({"init": "init"}));
      }
    } else {
      setEventItems({...eventItems, [item["date"]]: newItemsArray})
      // Se guarda el evento en el AsyncStorage
      AsyncStorage.setItem("storedEvents", JSON.stringify({...eventItems, [item["date"]]: newItemsArray}));
    }
    // getNotifications();
  }


  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        backgroundColor: "#FFFFFF"
      }}
    >
      {
        showNotification ? (
          <PushNotification item={newEvent} />
        ) : null
      }

      <EventCalendar
        daySelected={daySelected}
        setDaySelected={setDaySelected}
        eventCalendarItems={eventItems}
        changeModalVisible={changeModalVisible}
        setSelectedEvent={setSelectedEvent}
        itemInfo={itemInfo}
        setItemInfo={setItemInfo}
        onDelete={onDelete}
      />

      <TouchableOpacity
        onPress={changeModalVisible}
        style={{
          position: "absolute",
          backgroundColor: "#5B83B0",
          borderRadius: 30,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          bottom: 15,
          right: 15,
        }}
      >
        <Icon name="plus" type="font-awesome" color="#ffffff" size={24} />
      </TouchableOpacity>

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
          onEventCreated={handleEventCreated}
          selectedEvent={selectedEvent}

        />
      </Modal>
    </View>
  );
};

export default EventosScreen;