import React, { useState } from "react";

import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import EventListItem from "./EventListItem";

const Agenda = ({
    item, isDeleting, setIsDeleting, setUnselectedEvent, 
    setSelectedDayEvents, itemInfo, setItemInfo, onDelete}) => {
    
    const [selectedEventName, setSelectedEventName] = useState("");

    const handleDelete = (item) => {
        onDelete(item);
        setIsDeleting(false);
    }

    const handleLongPress = (item) => {
        setIsDeleting(true);
        setItemInfo(item)
        setSelectedEventName(item["name"]);
    }

    return (
        <>
            <TouchableOpacity
                key={item["id"]}
                onLongPress={() => handleLongPress(item)}
                onPress={ () => {
                    setIsDeleting(false);
                    setUnselectedEvent(false);
                    setItemInfo(item);
                    setSelectedDayEvents(item["date"]);
                }}
            >
                
                {
                    isDeleting && itemInfo["name"] === selectedEventName
                        ? (
                            <TouchableOpacity onPress={() => handleDelete(item)}>
                                <View 
                                style={{ 
                                    backgroundColor: "#FF0000", 
                                    padding: 20, 
                                    margin: 10,
                                    borderRadius: 10, 
                                    flexDirection: "row", 
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 5
                                }}>
                                <Ionicons name="trash-bin-outline" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        )
                        : (
                            <EventListItem 
                                item={item} />
                        )
                }
            </TouchableOpacity>
        </>
    )
}

export default Agenda;