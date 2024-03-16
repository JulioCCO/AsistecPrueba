import { useContext } from "react";
import ActivityContext from "../context/ActivityProvider";

export const useActivity = () => {
    return(useContext(ActivityContext));
}