import moment from 'moment';

const currentDate = new Date(moment().format('YYYY-MM-DD'));
export const calculatePercentage = (date) => {
    // Calculate the number of days between the given date and the current date
    let days = Math.round((new Date(date) - currentDate) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
        // If the date has already passed or is today, return 100% and a red color
        return { percentage: 1, color: "#F10B0B" };
    }
    if (days >= 20) {
        // If the date is more than 20 days away, set it to 19 so that the percentage doesn't exceed 100%
        days = 19;
    }
    
    // Calculate the percentage of time that has passed, based on a maximum of 20 days
    const percentageChange = Math.abs(1 - ((days / 20)).toFixed(2));
    if (percentageChange > 0.75) {
        // If more than 75% of the time has passed, return a red color
        return { percentage: percentageChange, color: "#F10B0B" };
    }
    if (percentageChange > 0.25 && percentageChange <= 0.5) {
        // If between 25% and 50% of the time has passed, return a yellow color
        return { percentage: percentageChange, color: "#E3D447" };
    }
    if (percentageChange <= 0.75 && percentageChange > 0.5) {
        // If between 50% and 75% of the time has passed, return an orange color
        return { percentage: percentageChange, color: "#EC7752" };
    }
    // If less than 25% of the time has passed, return a green color
    return { percentage: percentageChange, color: "#64B149" };
    
}