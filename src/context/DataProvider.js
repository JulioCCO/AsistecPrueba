import { useState, useEffect, createContext } from "react";

import moment from "moment";

import { calculateTimingNotification } from "../helpers/calculateTimingNotification";
import { formatTime } from "../helpers/formatTime";

import {getEvents, updateEvents, registerEvents, deleteEvents} from "../api/events";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [eventItems, setEventItems] = useState([{"init": "init"}] );
    const [listaComponents, setListaComponents] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [eventTransaction, setEventTransaction] = useState(false);
    const [userDatabaseID, setUserDatabaseID] = useState("calendarioEventosPrueba");
    const [allEventsDeleted, setAllEventsDeleted] = useState(false);

    // For the proper functioning of the components, you must have a unique id for each one of them.
    // To do this, you must have a counter that is incremented each time a component is created.

    const [ultimoId, setUltimoId] = useState(0); // Last id of the components list
    const [ultimoIdRelacion, setUltimoIdRelacion] = useState(0); // Last id of the components list

    const getNotifications = () => {
        try {
            let currentDate = moment().toISOString();

            // Get events keys and create new object
            const events = Object.entries(eventItems)?.map(([date, events]) => ({
                date,
                events
            }));

            const currentNotifications = events?.flatMap(event => {
                // Because when events is created, it has "init": "init"
                if (event["events"] !== "init") {
                    return event["events"].filter(finalEvent => {
                        const hour = formatTime(finalEvent).trim();
                        let date = new Date(`${finalEvent["date"]}T${hour}:00`);
                        date = calculateTimingNotification(date, finalEvent["reminderText"]);
                        date = new Date(date);
                        currentDate = new Date(currentDate);
                        return date.getTime();
                    });
                }
            }
            );

            currentNotifications.sort((a, b) => {
                const hourA = formatTime(a).trim();
                const hourB = formatTime(b).trim();
                const dateA = new Date(`${a["date"]}T${hourA}:00`);
                const dateB = new Date(`${b["date"]}T${hourB}:00`);
                return dateA.getTime() - dateB.getTime();
            });

            if (currentNotifications.length > 0 && currentNotifications[0]) {
                setNotifications(currentNotifications);
            } else {
                setNotifications([])
            }
        } catch (error) {
            console.log("Error getNotifications: ", error);
        }

    }

    const refreshEventData = async () => {
        try {
            console.log("refreshing data")
            if(eventItems["init"]) {
                if(allEventsDeleted) {
                    console.log("deleting: ", eventItems);
                    //when the user is deleting the only event that he has on the database
                    await deleteEvents(userDatabaseID);
                }
                
            } 
            else if( await getEvents(userDatabaseID) === null) {
                console.log("registering: ", eventItems);
                //when the user has no events on the database and have to create a new document
                await registerEvents(eventItems, userDatabaseID);
            }

            else {
                console.log("refreshing: ", eventItems);
                //whe the user has events on the database and wants to add a new one or edit one
                await updateEvents(eventItems, userDatabaseID);
            }
        } catch (error) {
            console.error('Error registering event:', error);
        }
        setEventTransaction(false);
        setAllEventsDeleted(false);
    };

    const createEvent = async (event) => {
        try {
            await registerEvents(event, userDatabaseID);
        } catch (error) {
            console.error('Error registering event:', error);
        }
    }

    const loadEvents = async (userId) => {
        try {

            console.log("Loading events...");

            // Get events from API with the user id
            const events = await getEvents(userId);

            // Check if events is not null
            if (events !== null) {
                console.log("Event data:", events);
                if (JSON.stringify(events) !== JSON.stringify(eventItems)) {
                    setEventItems(events);
                }
            } else {
                console.log("No events found for the user.");
            }
        } catch (error) {
            console.log("Error loading events:", error);
            throw error; 
        }
    };

    // Load events from API when the component is mounted for the first time
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Load events from API
    //             await loadEvents("calendarioEventosPrueba");   
    //         } catch (error) {
    //             console.error("Error in useEffect:", error);
    
    //             // Handle Axios errors with status code 400
    //             if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
    //                 // Handle the 400 status code error here
    //                 console.log("Request failed with status code 400:", error.response.data);
    //             }
    //         }
    //     };
    
    //     fetchData()
    // }, []);

    //Register the eventItems object when event is created or edited or deleted
    // useEffect(() => {
    //     if(eventTransaction){
    //         refreshEventData();
    //     }
    // }
    // , [eventTransaction]);

    //Update all the times when the eventItems state is updated
    // useEffect(() => {

    //     getNotifications();
    // }, [eventItems]);

    return (
        <DataContext.Provider value={{
            eventItems,
            setEventItems,
            listaComponents,
            setListaComponents,
            getNotifications,
            ultimoId,
            setUltimoId,
            ultimoIdRelacion,
            setUltimoIdRelacion,
            notifications,
            eventTransaction,
            setEventTransaction,
            refreshEventData,
            setAllEventsDeleted,
            userDatabaseID,
        }}>
            {children}
        </DataContext.Provider>
    );

}

export { DataProvider };
export default DataContext;