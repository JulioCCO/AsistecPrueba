import { useState, useEffect, createContext } from "react";
import { createEvent, fetchEvents, removeEvent, updateEvent } from "../api/events";
import { useAuth } from "../hooks/useAuth"

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const { auth } = useAuth();
    const [events, setEvents] = useState([{"init": "init"}]);

    const getEvents = async () => {
        try {
            const userEvents = await fetchEvents(auth.userId);
            setEvents(userEvents);
        } catch (error) {
            console.log("Error when getting events")
        }
    }

    useEffect(() => {
        getEvents();
    }, [auth]);

    const addEvent = async (newEvent) => {
        try {
            const eventCreated = await createEvent(auth.userId, newEvent);

            if (eventCreated) {
                setEvents([...events, eventCreated["event"]]);
            }
        } catch (error) {
            console.log("Error when adding event")
        }
    }

    const editEvent = async (updatedEvent) => {
        try {
            const data = await updateEvent(auth.userId, updatedEvent);
            console.log(data["event"])
            if (data) {
                const updatedEvents = events.map(event => event["_id"] === data["event"]["_id"]
                ? data["event"] : event)
                setEvents(updatedEvents);
            }
        } catch (error) {
            console.log("Error when updating event")   
        }
    }

    const deleteEvent = async (eventId) => {
        try {
            const data = await removeEvent(eventId, auth.userId);

            if (data) {
                const filteredEvents = events.filter(event => event["_id"] !== eventId)
                setEvents(filteredEvents);
            }
        } catch (error) {
            console.log("Errer when deleting event")
        }
    }


    return (
        <EventContext.Provider value={{
            events,
            addEvent,
            editEvent,
            deleteEvent
        }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventContext;