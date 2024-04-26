import axios from "axios";
import { SERVER_HOST_DIR } from "@env"

export const createDate = async (activityId, dateObj) => {
    try {
        const { data } =
            await axios.post(`${SERVER_HOST_DIR}/api/date/createDateModel/${activityId}`, dateObj);
        return data;
    } catch (error) {
        if (error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const getAllActivityDates = async (activityId) => {
    try {
        const { data } =
            await axios.get(`${SERVER_HOST_DIR}/api/date/getAllDatesModels/${activityId}`)
        return (data);
    } catch (error) {
        if (error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const deleteOneDateByID = async (activityId, dateId) => {
    try {
        const { data } =
            await axios.delete(`${SERVER_HOST_DIR}/api/date/deleteByIdDateModel/${activityId}/${dateId}`);
        return (data);
    } catch (error) {
        if (error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const deleteAllSchudaleDates = async (activityId) => {
    try {
        const { data } =
            await axios.delete(`${SERVER_HOST_DIR}/api/date/deleteAllDatesModels/${activityId}`);
        return (data);
    } catch (error) {
        if (error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const updateDate = async (activityId, dateObjUpdateData) => {
    try {
        const { data } =
            await axios.put(`${SERVER_HOST_DIR}/api/date/updateDateModel/${activityId}`, dateObjUpdateData);
        return (data);
    } catch (error) {
        if (error.response) {
            alert(error.response?.data.msg);
        }
    }
}