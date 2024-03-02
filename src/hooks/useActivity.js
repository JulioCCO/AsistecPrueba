import { useContext } from "react";
import ActivityContext from "../context/ScheduleProvider";

export const useActivity = () => {
    return(useContext(ActivityContext));
}