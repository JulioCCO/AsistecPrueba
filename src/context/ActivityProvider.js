import { useState, useEffect, createContext } from "react";
import {
  createActivity,
  fetchActivities,
  updateActivity,
  removeActivity,
} from "../api/activity";
import { useSchedule } from "../hooks/useSchedule";

const changeFormatDate = (lista) => {
  return lista.map((item) => ({
    ...item,
    start: new Date(item.start),
    end: new Date(item.end),
  }));
};

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {

  const { authSchedule } = useSchedule();
  const [scheduleElements, setScheduleElements] = useState([]); // lista con el estado de las actividades que pertenecen a un calendario

  const getActivities = async () => {
    try {
      const userActivity = await fetchActivities(authSchedule._id); // consultar sobre cual auth debe usarse aqui
      setScheduleElements(userActivity);
    } catch (error) {
      console.log("Error when getting activities");
    }
  };

  useEffect(() => {
     getActivities();
  }, [authSchedule]);

  const addActivity = async (newActivity) => {
    try {
      const activityCreated = await createActivity(authSchedule._id, newActivity);
      if (activityCreated) {
        getActivities();
      }
    } catch (error) {
      console.log("Error when adding activity");
    }
  };

  const editActivity = async (updatedActivity) => {
    try {
      const data = await updateActivity(authSchedule._id, updatedActivity);
      console.log(data["activity"]);
      if (data) {
        const updatedActivities = scheduleElements.map((schedule) =>
          schedule["_id"] === data["activity"]["_id"]
            ? data["activity"]
            : schedule
        );
        setScheduleElements(updatedActivities);
      }
    } catch (error) {
      console.log("Error when updating activity");
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      const data = await removeActivity(activityId, authSchedule._id);

      if (data) {
        const filteredActivities = scheduleElements.filter(
          (schedule) => schedule["_id"] !== activityId
        );
        setScheduleElements(filteredActivities);
      }
    } catch (error) {
      console.log("Error when deleting activity");
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        scheduleElements,
        addActivity,
        editActivity,
        deleteActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContext;
