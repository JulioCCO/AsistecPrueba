import moment from "moment";

export const calculateTimingNotification = (date, timing) => {
    let notificationDate = new Date(date);
    notificationDate = moment(notificationDate)

    switch (timing) {
    case "5 minutos antes":
      return notificationDate.subtract(5, "minutes");
    case "30 minutos antes":
      return notificationDate.subtract(30, "minutes");
    case "1 dia antes":
      return notificationDate.subtract(1, "days");
    case "1 semana antes":
      return notificationDate.subtract(1, "weeks");
    default:
      return notificationDate; // No valid timing specified, returns original date
  }
};
