import { useState, useEffect, createContext } from "react";
import {
  createActivity,
  fetchActivities,
  updateActivity,
  removeActivity,
} from "../api/activity";
import { useSchedule } from "../hooks/useSchedule";
import { useDateObj } from "../hooks/useDateObj";
import { disableExpoCliLogging } from "expo/build/logs/Logs";


const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {

  const { updateSingleDate, createNewDate, deleteOneDate, deleteAllDates, getAllDates } = useDateObj();
  const { currentScheduleKey } = useSchedule();


  const [activities, setActivities] = useState([]); // lista con el estado de las actividades que pertenecen a un calendario

  // Este use Effect que se ejecuta al cargar el provider hace que se haga la consulta sin datos,
  useEffect(() => {
    if (currentScheduleKey === undefined) return; //Si es undefinido no haga nada
    console.log('authSchedule', currentScheduleKey);
    getActivities();
  }, [currentScheduleKey]);

  useEffect(() => {
    console.log('\nactivities', activities, '\n');
  }, [activities])

  const addDateIdsToActivities = async (activitiesList) => {
    try {
      const updatedActivities = await Promise.all(activitiesList.map(async (activity) => {
        console.log('activity', activity);
        const allDates = await getAllDates(activity._id);
        console.log('allDates', allDates);
        if (allDates.length > 0) {
          const dateModelIDs = allDates.map((day) => (day._id ));
          console.log('dateModelIDs', dateModelIDs)
          return { ...activity, daysList:dateModelIDs };
        } else {
          return activity; // Devuelve la actividad sin cambios si no hay fechas
        }
      }));
      console.log('updatedActivities', updatedActivities);
      setActivities(updatedActivities); // guardar la actividad con todos sus datos actualizados
    } catch (error) {
      console.log("Error when adding date IDs to activities");
    }
  };

  const getActivities = async () => {
    try {
      const userActivities = await fetchActivities(currentScheduleKey); // consultar sobre cual auth debe usarse aqui
      console.log('userActivities', userActivities);
      // agregar los ids de las fechas a usar 
      await addDateIdsToActivities(userActivities);
      //setActivities(userActivities);
    } catch (error) {
      console.log("Error when getting activities");
    }
  };


  const addActivity = async (newActivity) => {
    try {
      const activityCreated = await createActivity(currentScheduleKey, newActivity);
      if (activityCreated !== undefined) {
        getActivities();
        console.log('activityCreated.activity._id', activityCreated.activity._id)
        return activityCreated.activity._id
      }
    } catch (error) {
      console.log("Error when adding activity");
    }
  };

  const editActivity = async (updatedActivity) => {
    try {
      const data = await updateActivity(currentScheduleKey, updatedActivity);
      console.log(data["activity"]);
      if (data) {
        const updatedActivities = activities.map((schedule) =>
          schedule["_id"] === data["activity"]["_id"]
            ? data["activity"]
            : schedule
        );
        setActivities(updatedActivities);
      }
    } catch (error) {
      console.log("Error when updating activity");
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      const data = await removeActivity(activityId, currentScheduleKey);

      if (data) {
        const filteredActivities = activities.filter(
          (schedule) => schedule["_id"] !== activityId
        );
        setActivities(filteredActivities);
      }
    } catch (error) {
      console.log("Error when deleting activity");
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        editActivity,
        deleteActivity,
        getActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContext;
