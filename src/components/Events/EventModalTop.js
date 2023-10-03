import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

const EventModalTop = ({
    closeModal,
    daySelected, 
    modalTitle,
    title,
    setEventData,
    eventData
}) => {

  return (
    <View style={styles.topModal}>
        <TouchableOpacity
        onPress={closeModal}
        style={styles.closeModalBtn}
        >
        <Icon name="close" size={30} color="white" style={{}} />
        </TouchableOpacity>

        <Text style={styles.daySelected}>{daySelected}</Text>
        <Text style={styles.modalTitle}>{modalTitle}</Text>
        <Text style={styles.title}>Titulo</Text>

        <Input
          value={title}
          onChange={(event) =>
              setEventData({ ...eventData, title: event.nativeEvent.text })
          }
          type="text"
          placeholder="Titulo del Evento"
          placeholderTextColor={"white"}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.userEventTitleText}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  topModal: {
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "#8FC1A9",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "relative"
  },

  closeModalBtn: {
    position: "absolute",
    top: 5,
    right: 10,
  },

  daySelected: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },

  modalTitle: {
    margin: 5,
    marginStart: 9,
    fontSize: 26,
    fontWeight: "bold",
    color: "white"
  },

  title: {
    margin: 5,
    marginStart: 9,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },

  userEventTitleText: {
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#00000066"
  },

});

export default EventModalTop;