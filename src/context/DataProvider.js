import moment from "moment";
import { useState, useEffect, createContext } from "react";
import { calculateTimingNotification } from "../helpers/calculateTimingNotification";
import { formatTime } from "../helpers/formatTime";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    

    const [eventItems, setEventItems] = useState({"init": "init"});
    const [listaComponents, setListaComponents] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Para el adecuado funcionamiento de los componentes, se debe tener un id unico para cada uno de ellos
    // Para ello, se debe tener un contador que se incremente cada vez que se cree un componente

    const [ultimoId, setUltimoId] = useState(0); // Ultimo id de la lista de componentes
    const [ultimoIdRelacion, setUltimoIdRelacion] = useState(0); // Ultimo id de la lista de componentes

    const getNotifications = () => {
        try {
            let currentDate = moment().toISOString();
    
            const events = Object.entries(eventItems)?.map(([date, events]) => ({
                date,
                events
            }));

            // const currentNotifications = events?.flatMap(event =>
            //     {
            //         if(event["events"] !== "init") {
            //             return event["events"].filter(finalEvent => {
            //                 let date = new Date(finalEvent["initialHour"]);
            //                 date = calculateTimingNotification(date, finalEvent["reminderText"]);
            //                 date = new Date(date);
            //                 currentDate = new Date(currentDate);
            //                 return date.getTime() === currentDate.getTime() || date.getTime() < currentDate.getTime();
            //             });
            //         }
            //     }
            // );              

            const currentNotifications = events?.flatMap(event =>
                {
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

};

export { DataProvider };
export default DataContext;