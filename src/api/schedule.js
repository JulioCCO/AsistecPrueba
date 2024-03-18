import axios from "axios";

const API = "http://192.168.0.122:4000/api/schedule";

export const createSchedule = async (userId, schedule) => {
  try {
    const { data } = await axios.post(
      `${API}/registerSchedule/${userId}`,
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
          `${API}/getSchedules/${userId}`);
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
          `${API}/updateSchedule/${userId}`,
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
        const { data } = await axios.delete(`${API}/deleteSchedule/${userId}/${scheduleId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
};


