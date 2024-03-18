import axios from 'axios';

const API = 'http://192.168.0.113:4000/api/activity'

export const createActivity = async (ScheduleId, activity) => {
    try {
        const { data } = await axios.post(`${API}/registerActivity/${ScheduleId}`, activity);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const fetchActivities = async (ScheduleId) => {
    try {
        const { data } = await axios.get(`${API}/getActivities/${ScheduleId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
};

export const updateActivity = async (ScheduleId, updatedActivity) => {
    try {
        const { data } = await axios.put(`${API}/updateActivity/${ScheduleId}`, updatedActivity);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const removeActivity = async (activityId, ScheduleId) => {
    try {
        const { data } = await axios.delete(`${API}/deleteActivity/${ScheduleId}/${activityId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}
