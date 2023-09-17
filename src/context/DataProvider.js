import { useState, useEffect, createContext } from "react";

import moment from "moment";

import { calculateTimingNotification } from "../helpers/calculateTimingNotification";
import { formatTime } from "../helpers/formatTime";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [eventItems, setEventItems] = useState({"init": "init"});
    const [listaComponents, setListaComponents] = useState([]);
    const [notifications, setNotifications] = useState([]);

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

            const currentNotifications = events?.flatMap(event =>
                {
                    // Because when events is created, it has "init": "init"
                    if(event["events"] !== "init") {
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

            if(currentNotifications.length > 0 && currentNotifications[0]) {
                setNotifications(currentNotifications);
            } else {
                setNotifications([])
            }
        } catch (error) {
            console.log("Error getNotifications: ", error);
        }
            
    }

    useEffect(() => {
        getNotifications();
        console.log("eventItems: ", eventItems);
    }, [eventItems]);

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
            notifications }}>
            {children}
        </DataContext.Provider>
    );

}

export { DataProvider };
export default DataContext;