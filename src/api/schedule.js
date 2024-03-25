import axios from "axios";
import { SERVER_HOST_DIR } from "@env"

export const createSchedule = async (userId, schedule) => {
  try {
    const { data } = await axios.post(
      `${SERVER_HOST_DIR}/api/schedule/registerSchedule/${userId}`,
      schedule
    );
    return(data);

  } catch (error) {
    if(error.response){
        alert(error.response?.data.msg);
    }
  }
};

export const getUserSchedule = async (userId) => {
    try {
        const { data } = await axios.get(
          `${SERVER_HOST_DIR}/api/schedule/getSchedules/${userId}`);
        return(data);
    
      } catch (error) {
        if(error.response){
            alert(error.response?.data.msg);
        }
      }
};

export const updateSchedule = async (userId, schedule) => {

    try {
        const { data } = await axios.put(
          `${SERVER_HOST_DIR}/api/schedule/updateSchedule/${userId}`,
          schedule
        );
        return(data);
    
      } catch (error) {
        if(error.response){
            alert(error.response?.data.msg);
        }
      }
};

// Cuando se remueve el calendario, se debe remover tambien las actividades de este.
export const removeSchedule = async (userId, scheduleId) => {
    try {
        const { data } = await axios.delete(`${SERVER_HOST_DIR}/api/schedule/deleteSchedule/${userId}/${scheduleId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
};


