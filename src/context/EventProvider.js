import { useState, useEffect, createContext } from "react";
import { createEvent, fetchEvents } from "../api/events";
import { useAuth } from "../hooks/useAuth"

const EventContext = createContext();

export const EventProvider = ({children}) => {
    const { auth } = useAuth();
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        const userEvents = await fetchEvents(auth.userId);
        setEvents(userEvents);
    }

    useEffect(() => {
        getEvents();
    }, [auth]);

    const addEvent = async (newEvent) => {
        const eventCreated = await createEvent(auth.userId, newEvent);
        setEvents([...events, eventCreated]);
    }

    const updateEvent = () => {

    }

    const deleteEvent = () => {

    }


    return(
        <EventContext.Provider value={{
            events,
            addEvent
        }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventContext;