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
  const [currentScheduleKey, setCurrentScheduleKey] = useState("");
  const [currentScheduleData, setCurrentScheduleData] = useState(undefined);
  const [schedules, setschedules] = useState([]); // Lista con los horarios del estudiante

  useEffect(() => {
    console.log('auth', auth)
    if (auth !== undefined) getSchedules();
  }, [auth]);

  useEffect(() => {
    if (schedules.length > 0) {
      setCurrentScheduleKey(schedules[0].key);
    }
  }, [schedules])

  useEffect(() => {
    schedules.map((schedule) => {
      if (schedule.key === currentScheduleKey) {
        setCurrentScheduleData(schedule);
      }
    })
  }, [currentScheduleKey])

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
        const updatedSchedules = schedules.map((schedule) => {
          if (schedule.key === updatedSchedule._id) {
            schedule.value = updatedSchedule.name;
          }
          return schedule;
        });
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
        currentScheduleKey,
        setCurrentScheduleKey,
        currentScheduleData,
        setCurrentScheduleData,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;