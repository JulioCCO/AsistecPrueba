import React, { useState } from "react";

import { FlatList, View, Text, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

import moment from "moment";

import EventItem from "./EventItem";

import Agenda from "./Agenda";

// Setting up the calendar in Spanish
LocaleConfig.locales["es"] = {
  monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  monthNamesShort: ["Ene.", "Feb.", "Mar", "Abr", "May.", "Jun", "Jul.", "Ago", "Sept.", "Oct.", "Nov.", "Dic."],
  dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."],
  today: "Hoy"
};
LocaleConfig.defaultLocale = "es";

const EventCalendar = ({
  daySelected, setDaySelected, eventCalendarItems,
  changeModalVisible, setSelectedEvent, itemInfo, setItemInfo,
  handleDeleteEvent }) => {

  const [selectedDayEvents, setSelectedDayEvents] = useState(new Date());
  const [unselectedEvent, setUnselectedEvent] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const sortData = (data) => {
    try {
      if (data && data[daySelected] && Array.isArray(data[daySelected])) {
        return data[daySelected].sort((a, b) =>
          new Date(a.initialHour).getTime() - new Date(b.initialHour).getTime()
        );
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Calendar
        onDayPress={day => {
          setDaySelected(day.dateString);
          setUnselectedEvent(true);
          setIsDeleting(false);
        }}
        markingType={"custom"}
        markedDates={Object.keys(eventCalendarItems).reduce((obj, date) => {
          obj[date] = {
            marked: true
          }
          obj[daySelected] = {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "green",
            customStyles: {
              container: {
                backgroundColor: "#F4F4F4",
                borderRadius: 7,
                borderColor: "#8FC1A9",
                borderWidth: 1
              },
              text: {
                fontWeight: "600",
                color: "#8FC1A9"
              }
            }
          }
          obj[moment().format("YYYY-MM-DD")] = {
            customStyles: {
              container: {
                backgroundColor: "#8FC1A9",
                borderRadius: 7
              },
              text: {
                color: "#FFFFFF",
                fontWeight: "bold"
              },
            }
          }
          return obj;
        }, {})}
        theme={{
          arrowColor: "#8FC1A9",
          calendarBackground: "#F4F4F4"
        }}
      />
      {
        unselectedEvent
          ?
          eventCalendarItems[daySelected]
            ? (
              <View style={{ flexDirection: "row", paddingHorizontal: 5,  }}>
                {/* Display the day of the month */}
                <View style={{ paddingTop: 12 }}>
                  {/* Display the abbreviated weekday name in Spanish */}
                  <Text style={styles.dayText}>
                    {moment(daySelected).format("ddd")}
                  </Text>

                  {/* Display the day of the month */}
                  <View style={styles.dayNumber}>
                    <Text style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "white"
                    }}>
                      {moment(daySelected).date()}
                    </Text>
                  </View>
                </View>
                <View style={{height: "80%", flex: 1, flexDirection: "column", marginTop:1 }}>
                  <FlatList
                    style={{ height: "80%", flexDirection: "column" }}
                    data={ sortData(eventCalendarItems)}
                    renderItem={({ item }) => {
                      return (
                        <Agenda
                          item={item}
                          isDeleting={isDeleting}
                          setIsDeleting={setIsDeleting}
                          setUnselectedEvent={setUnselectedEvent}
                          setSelectedDayEvents={setSelectedDayEvents}
                          itemInfo={itemInfo}
                          setItemInfo={setItemInfo}
                          handleDeleteEvent={handleDeleteEvent} />
                      )
                    }}
                    keyExtractor={item => item["id"]}
                    
                  />
                </View>
              </View>
            )
            : (
              <View style={{ alignItems: "center" }}>
                <Text style={{ marginTop: 10, fontSize: 14 }}>
                  No hay eventos para mostrar
                </Text>
              </View>
            )
          :
          (
            <EventItem
              itemInfo={itemInfo}
              selectedDayEvents={selectedDayEvents}
              changeModalVisible={changeModalVisible}
              setSelectedEvent={setSelectedEvent}
            />
          )

      }


    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row"
  },

  dayText: {
    fontSize: 15,
    textAlign: "center",
    color: "#8FC1A9"
  },

  dayNumber: {
    backgroundColor: "#8FC1A9",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  NotificationContainer: {
    gap: 10,
    marginLeft: 10,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },

  progressBar: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
    marginBottom: 5
  }
})



export default EventCalendar;