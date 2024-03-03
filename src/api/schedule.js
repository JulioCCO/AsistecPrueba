import axios from 'axios';

const API = 'http://192.168.0.110:4000/api/schedule'
export const createActivity = async (userId, activity) => {
    try {
        const { data } = await axios.post(`${API}/registerActivity/${userId}`, activity);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const fetchActivities = async (userId) => {
    try {
        const { data } = await axios(`${API}/getActivities/${userId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
};

export const updateActivity = async (userId, updatedActivity) => {
    try {
        const { data } = await axios.put(`${API}/updateActivity/${userId}`, updatedActivity);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const removeActivity = async (activityId, userId) => {
    try {
        const { data } = await axios.delete(`${API}/deleteActivity/${userId}/${activityId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}
export const removeActivityByIdRelacion = async (idRelacion, userId) => {
    try {
        const { data } = await axios.delete(`${API}/deleteActivitiesByRelationId/${userId}/${idRelacion}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}