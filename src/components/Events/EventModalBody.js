import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";

const  EventModalBody = ({ 
    setEventData,
    eventData,
    description,
    isAllDay,
    showInitialDatepicker,
    initialHourText,
    showInitialHour,
    initialHour,
    onInitialHourChange,
    showFinalDatepicker,
    finalHourText,
    showFinalHour,
    finalHour,
    onFinalHourChange,
    reminderValues,
    selectedReminder,
    handleOnCreateEvent,
    buttonText
}) => {
  
  return (
    <View style={styles.bodyView}>
        <Text style={styles.description}>Descripción</Text>

        <TextInput
        multiline
        numberOfLines={4}
        onChangeText={(text) =>
            setEventData({ ...eventData, description: text })
        }
        value={description}
        style={styles.userDescriptionText}
        />

        {!isAllDay && (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.init}>Inicio</Text>

                <TouchableOpacity
                onPress={showInitialDatepicker}
                style={styles.hourText}
                >
                <Text style={{ fontSize: 16 }}>{initialHourText}</Text>
                </TouchableOpacity>
                {showInitialHour && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(initialHour)}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onInitialHourChange}
                />
                )}
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.end}>Fin</Text>

                <TouchableOpacity
                onPress={showFinalDatepicker}
                style={styles.hourText}
                >
                <Text style={{ fontSize: 16 }}>{finalHourText}</Text>
                </TouchableOpacity>
                {showFinalHour && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(finalHour)}
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
                    setSelected={(value) =>
                    setEventData({ ...eventData, selectedReminder: value })
                    }
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
                onValueChange={(value) =>
                    setEventData({ ...eventData, isAllDay: value })
                }
                value={isAllDay}
                />
            </View>
        </View>

        <TouchableOpacity
        onPress={handleOnCreateEvent}
        style={styles.createEventBtn}
        >
        <Text style={styles.btnText}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  bodyView: {
    width: "100%",
    flexDirection: "column",
    padding: 15,
    flex: 1,
  },

  description: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },

  userDescriptionText: {
    borderWidth: 1,
    borderColor: "#00000066",
    borderRadius: 5,
    margin: 5,
    padding: 8,
    textAlignVertical: "top"
  },

  init: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },

  hourText: {
    width: "90%",
    borderBottomWidth: 1,
    borderColor: "#00000066",
    marginLeft: 5,
  },

  end: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.4,
  },

  createEventBtn: {
    backgroundColor: "#8FC1A9",
    margin: 5,
    padding: 15,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
  },

  btnText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  }
})

export default EventModalBody;