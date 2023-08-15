/* This function takes a time in 12-hour format and
converts it to 24-hour format. */
export const formatTime = (item) => {
    // Event hour
    const {initialHourText} = item;
    const [hours, minutes] = initialHourText.split(":")
    let adjustedHours = parseInt(hours);
    const AMPM = initialHourText.slice(-2);

    if(AMPM === "pm" && adjustedHours !== 12) {
      adjustedHours += 12;
    } else if(AMPM === "am" && adjustedHours === 12) {
      adjustedHours = 0;
    }

    return(`${adjustedHours.toString()}:${minutes.slice(0, 2)}`)
}