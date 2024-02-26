import React, { useEffect, useState } from "react";

import { TouchableOpacity, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import EventListItem from "./EventListItem";
import { useEvent } from "../../hooks/useEvent";

const Agenda = ({
  item, isDeleting, setIsDeleting, setUnselectedEvent,
  setSelectedDayEvents, itemInfo, setItemInfo, handleDeleteEvent }) => {

  const [selectedEventName, setSelectedEventName] = useState("");
  const { deleteEvent } = useEvent();

  const handleDelete = (eventId) => {
    deleteEvent(eventId)
    setIsDeleting(false);
  }

  const handleLongPress = (item) => {
    setIsDeleting(true);
    setItemInfo(item);
    setSelectedEventName(item["name"]);
  };

  return (
    <>
      <TouchableOpacity
        key={item.id}
        onLongPress={() => handleLongPress(item)}
        onPress={() => {
          setIsDeleting(false);
          setUnselectedEvent(false);
          setItemInfo(item);
          setSelectedDayEvents(item["date"]);
        }}
      >
        {isDeleting && itemInfo["name"] === selectedEventName ? (
          <TouchableOpacity onPress={() => handleDelete(item["_id"])}>
            <View
              style={styles.deleteButton}
            >
              <Ionicons name="trash-bin-outline" size={24} color="white" />
            </View>
          </TouchableOpacity>
        ) : (
          <EventListItem item={item} />
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "#FF0000",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default Agenda;
