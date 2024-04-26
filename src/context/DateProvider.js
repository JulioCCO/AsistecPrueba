import { createContext } from 'react';
import {
    createDate,
    updateDate,
    getAllActivityDates,
    deleteOneDateByID,
    deleteAllSchudaleDates,
} from '../api/dateApi';


const DateContext = createContext();


export const DateProvider = ({ children }) => {
    

    const getAllDates = async (activityId) => {
        try {
            const data = await getAllActivityDates(activityId);
            return data;
        } catch (error) {
            console.log('Error al obtener las fechas.', error);
            throw new error;
        }
    }

    const createNewDate = async (activityId, dateObj) => {
        try {
            const data = await createDate(activityId, dateObj);
            return data;
        } catch (error) {
            console.log('Error al crear nueva fecha.', error);
            throw new error;
        }
    }

    const updateSingleDate = async (activityId, newDateObj) => {
        try {
            const data = await updateDate(activityId, newDateObj);
            return data;
        } catch (error) {
            console.log('Error al actualizar la fecha.', error);
            throw new error;
        }
    }

    const deleteOneDate = async (activityId, dateId) => {
        try {
            const data = await deleteOneDateByID(activityId, dateId);
            return data;
        } catch (error) {
            console.log('Error al eliminar fecha.', error);
            throw new error;
        }
    }

    const deleteAllDates = async (activityId) => {
        try {
            const data = await deleteAllSchudaleDates(activityId);
            return data;
        } catch (error) {
            console.log('Error al eliminar todas las fechas.', error);
            throw new error;
        }
    }

    return (
        <DateContext.Provider
            value={{
                getAllDates,
                createNewDate,
                updateSingleDate,
                deleteOneDate,
                deleteAllDates,
            }}
        >
            {children}
        </DateContext.Provider>
    );
};

export default DateContext;