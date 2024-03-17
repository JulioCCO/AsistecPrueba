import { useContext } from "react";
import ScheduleContext from "../context/ScheduleProvider.js";

export const useSchedule = () => {
  return(useContext(ScheduleContext));
};
