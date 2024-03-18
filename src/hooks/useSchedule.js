import { useContext } from "react";
import ScheduleContext from "../context/ScheduleProvider";

export const useSchedule = () => {
  return(useContext(ScheduleContext));
};
