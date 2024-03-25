import React, { useState, useEffect, createContext } from "react";
import {
  createSchedule,
  getUserSchedule,
  updateSchedule,
  removeSchedule,
} from "../api/schedule";

import { useAuth } from "../hooks/useAuth";

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const { auth } = useAuth();

  const [currentSchedule, setCurrentSchedule] = useState("");

  const [schedules, setschedules] = useState([]); // Lista con los horarios del estudiante

  const getSchedules = async () => {
    try {
      const userSchedules = await getUserSchedule(auth.userId);
      let newArray = userSchedules.map((schedule) => {
        return {
          key: schedule._id,
          value: schedule.name,
        };
      });
      setschedules(newArray);
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
      const data = await updateSchedule(auth.userId, updatedSchedule);
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
          (value) => value["key"] !== scheduleId
        );
        setschedules(filterData);
      }
    } catch (error) {
      console.log("Error when deleting schedule");
    }
  };

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        getSchedules,
        addSchedule,
        editSchedule,
        deleteSchedule,
        currentSchedule,
        setCurrentSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;