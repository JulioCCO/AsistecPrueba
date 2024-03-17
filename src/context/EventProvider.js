import { useState, useEffect, createContext } from "react";
import {
  createEvent,
  fetchEvents,
  removeEvent,
  updateEvent,
} from "../api/events";
import { useAuth } from "../hooks/useAuth";
import { calculateTimingNotification } from "../helpers/calculateTimingNotification";
import { formatTime } from "../helpers/formatTime";
import moment from "moment";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { auth } = useAuth();
  const [events, setEvents] = useState([{ init: "init" }]);
  const [notifications, setNotifications] = useState([]);

  const getEvents = async () => {
    try {
      const userEvents = await fetchEvents(auth.userId);
      setEvents(userEvents);
    } catch (error) {
      console.log("Error when getting events");
    }
  };

  const getNotifications = () => {
    try {
      let currentDate = moment().toISOString();
      if (events.length > 0 && events[0].hasOwnProperty("init") === false) {
        const currentNotifications = events?.map((event) => {
          const hour = formatTime(event).trim();
          let date = new Date(`${event["date"]}T${hour}:00`);
          date = calculateTimingNotification(date, event["reminderText"]);
          date = new Date(date);
          currentDate = new Date(currentDate);
          return { date: date.getTime(), event };
        });
        currentNotifications.sort((a, b) => {
          return a.date - b.date;
        });
        if (currentNotifications.length > 0) {
          setNotifications(currentNotifications);
        } else {
          setNotifications([]);
        }
      } if (events.length === 0) {
        setNotifications([]);
      }
    } catch (error) {
      console.log("Error getNotifications: ", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, [auth]);

  useEffect(() => {
    getNotifications();
  }, [events]);

  const addEvent = async (newEvent) => {
    try {
      const eventCreated = await createEvent(auth.userId, newEvent);

      if (eventCreated) {
        setEvents([...events, eventCreated["event"]]);
      }
    } catch (error) {
      console.log("Error when adding event");
    }
  };

  const editEvent = async (updatedEvent) => {
    try {
      const data = await updateEvent(auth.userId, updatedEvent);
      console.log(data["event"]);
      if (data) {
        const updatedEvents = events.map((event) =>
          event["_id"] === data["event"]["_id"] ? data["event"] : event
        );
        setEvents(updatedEvents);
      }
    } catch (error) {
      console.log("Error when updating event");
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const data = await removeEvent(eventId, auth.userId);

      if (data) {
        const filteredEvents = events.filter(
          (event) => event["_id"] !== eventId
        );
        console.log(filteredEvents);
        setEvents(filteredEvents);

      }
    } catch (error) {
      console.log("Errer when deleting event");
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        editEvent,
        deleteEvent,
        notifications,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
