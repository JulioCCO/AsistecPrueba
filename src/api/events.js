import axios from 'axios';

const API = 'http://192.168.1.106:4000/api/events'
export const registerEvents = (event,userID) => {
    try {
        const eventDocument = {
            _id: userID,
            eventItems: event
        }
        axios.post(`${API}/registerEvent`, eventDocument)
            .then(res => {
                console.log('API response:', res.data);
            })
    } catch (error) {
        console.error('Error registering event:', error);
    }
}

export const getEvents = async (userID) => {
    try {
        const response = await axios.get(`${API}/getEvent/${userID}`);
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
        console.error("Error in getEvents request:", error);
        throw error; // Re-throw the error to be handled in the calling function
    }
};

export const updateEvents = async (event, userID) => {
    try {
        const eventDocument = {
            eventItems: event
        }
        const response = await axios.put(`${API}/updateEvent/${userID}`, eventDocument);
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