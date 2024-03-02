import { useState, useEffect, createContext } from "react";
import {
  createActivity,
  fetchActivities,
  updateActivity,
  removeActivity,
  removeActivityByIdRelacion,
} from "../api/schedule";
import { useAuth } from "../hooks/useAuth";
const changeFormatDate = (lista) => {
return lista.map(item => ({
...item,
start: new Date(item.start),
end: new Date(item.end)
}));
};
const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const { auth } = useAuth();
  const [scheduleElements, setScheduleElements] = useState([]);

  const getActivities = async () => {
    try {
      const userActivity = await fetchActivities(auth.userId);
      const listaModificada = changeFormatDate(userActivity);
      setScheduleElements(listaModificada);
    } catch (error) {
      console.log("Error when getting activities");
    }
  };

  useEffect(() => {
    getActivities();
  }, [auth]);

  const addActivity = async (newActivity, ultimoLista) => {
    try {
      const activityCreated = await createActivity(auth.userId, newActivity);
      if (activityCreated && ultimoLista) {
        getActivities();
      }
    } catch (error) {
      console.log("Error when adding activity");
    }
  };

  const editActivity = async (updatedActivity) => {
    try {
      const data = await updateActivity(auth.userId, updatedActivity);
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
      const data = await removeActivity(activityId, auth.userId);

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
const deleteActivityByRelationId = async (idRelacion) => {
try {
const data = await removeActivityByIdRelacion(idRelacion, auth.userId);
if (data) {
const filteredActivities = scheduleElements.filter(
(schedule) => schedule["idRelacion"] !== idRelacion
);
setScheduleElements(filteredActivities);
}
}
catch (error) {
console.log("Error when deleting activity by relation id");
}
}

  return (
    <ActivityContext.Provider
      value={{
        scheduleElements,
        addActivity,
        editActivity,
        deleteActivity,
        deleteActivityByRelationId,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContext;
