import axios from 'axios';
import { SERVER_HOST_DIR } from "@env"

export const createActivity = async (ScheduleId, activity) => {
    try {
        const { data } = await axios.post(`${SERVER_HOST_DIR}/api/activity/registerActivity/${ScheduleId}`, activity);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const fetchActivities = async (ScheduleId) => {
    try {
        const { data } = await axios.get(`${SERVER_HOST_DIR}/api/activity/getActivities/${ScheduleId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
};

export const updateActivity = async (ScheduleId, updatedActivity) => {
    try {
        const { data } = await axios.put(`${SERVER_HOST_DIR}/api/activity/updateActivity/${ScheduleId}`, updatedActivity);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const removeActivity = async (activityId, ScheduleId) => {
    try {
        const { data } = await axios.delete(`${SERVER_HOST_DIR}/api/activity/deleteActivity/${ScheduleId}/${activityId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}
