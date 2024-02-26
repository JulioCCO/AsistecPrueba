import axios from 'axios';

const API = 'http://192.168.1.144:4000/api/events'
export const createEvent = async (userId, event) => {
    try {
        const { data } = await axios.post(`${API}/registerEvent/${userId}`, event);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
}

export const fetchEvents = async (userId) => {
    try {
        const { data } = await axios(`${API}/getEvents/${userId}`);
        return(data);
    } catch (error) {
        if(error.response) {
            alert(error.response?.data.msg);
        }
    }
};

export const updateEvents = async (event, userID) => {
    try {
        const eventDocument = {
            eventItems: event
        }
        const response = await axios.put(`${API}/updateEvent/${userID}`, eventDocument, {validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
        });
        const { data, status } = response;

        // Check if the response status is 404 (Not Found)
        if (status === 404) {
            console.log("No events found for the user.");
            return null;
        }

        // Check if the response status is 200 (OK)
        else if (status === 200) {
            return data.eventItems;
        }
        // Handle unexpected server response
        else {
            console.log(`Unexpected server response: ${status}`);
            return null;
        }
    } catch (error) {
        // Handle errors during the request
        console.error("Error in updateEvents request:", error);
        throw error; // Re-throw the error to be handled in the calling function
    }
}

export const deleteEvents = async (userID) => {
    try {
        const response = await axios.delete(`${API}/deleteEvent/${userID}`);
        const { data, status } = response;

        // Check if the response status is 404 (Not Found)
        if (status === 404) {
            console.log("No events found for the user.");
            return null;
        }

        // Check if the response status is 200 (OK)
        else if (status === 200) {
            return "OK";
        }
        // Handle unexpected server response
        else {
            console.log(`Unexpected server response: ${status}`);
            return null;
        }
    } catch (error) {
        // Handle errors during the request
        console.error("Error in deleteEvents request:", error);
        throw error; // Re-throw the error to be handled in the calling function
    }
}