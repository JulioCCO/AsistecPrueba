import { useContext } from "react";
import EventContext from "../context/EventProvider";

export const useEvent = () => {
    return(useContext(EventContext));
}