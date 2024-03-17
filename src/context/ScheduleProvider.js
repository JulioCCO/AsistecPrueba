import React, { useState } from "react";
import {
  createSchedule,
  getUserSchedule,
  updateSchedule,
  removeSchedule,
} from "../api/schedule";

import { useAuth } from "../hooks/useAuth";

const ActivityContext = createContext();

export const ScheduleProvider = ({ children }) => {

  
  const { auth } = useAuth();

  const [authSchedule, setAuthSchedule] = useState({});

  const [schedules, setschedules] = useState([]); // Lista con los horarios del estudiante

  const getSchedules = async () => {
    try {
      const userSchedules = await getUserSchedule(auth.userId); 
      setschedules(userSchedules);
    } catch (error) {
      console.log("Error when getting schedules");
    }
  };

  useEffect(() => {
    getSchedules();
  }, [auth]);

  const addSchedule = async (newSchedule) => {
    try {
      const scheduleCreated = await createSchedule(auth.userId, newSchedule);
      if (scheduleCreated) getSchedules();
    } catch (error) {
      console.log("Error when adding schedule");
    }
  };

  const editSchedule = async (updatedSchedule) => {
    try {
      const data = await updateSchedule(
        auth.userId,
        updatedSchedule
      );
      if (data) {
        const updatedSchedules = schedules.map(
          (value) =>
            value["_id"] === data["schedule"]["_id"] && data["schedule"]
        );
        setschedules(updatedSchedules);
      }
    } catch (error) {
      console.log("Error when updating schedule");
    }
  };

  const deleteSchedule = async (scheduleId) => {
    try {
      const data = await removeSchedule(auth.userId, scheduleId);
      if (data) {
        const filterData = schedules.filter(
          (value) => value["_id"] !== scheduleId
        );
        setschedules(filterData);
      }
    } catch (error) {
      console.log("Error when deleting schedule");
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        schedules,
        getSchedules,
        addSchedule,
        editSchedule,
        deleteSchedule,
        authSchedule, 
        setAuthSchedule
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ScheduleProvider;
