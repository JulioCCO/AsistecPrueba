import axios from 'axios';
import { SERVER_HOST_DIR } from "@env"
export const createEvent = async (userId, event) => {
    try {
        const { data } = await axios.post(`${SERVER_HOST_DIR}/api/events/registerEvent/${userId}`, event);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const fetchEvents = async (userId) => {
    console.log("siu")
    console.log(`${SERVER_HOST_DIR}/api/events/getEvents/${userId}`)
    try {
        const { data } = await axios(`${SERVER_HOST_DIR}/api/events/getEvents/${userId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
};

export const updateEvent = async (userId, updatedEvent) => {
    try {
        const { data } = await axios.put(`${SERVER_HOST_DIR}/api/events/updateEvent/${userId}`, updatedEvent);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const removeEvent = async (eventId, userId) => {
    try {
        const { data } = await axios.delete(`${SERVER_HOST_DIR}/api/events/deleteEvent/${userId}/${eventId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}