import { useState, useEffect, useRef } from "react";

import { Platform } from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { formatTime } from "../../helpers/formatTime";
import { calculateTimingNotification } from "../../helpers/calculateTimingNotification";

// Set default notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const PushNotification = ({item}) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  const notificationListener = useRef();

  // Define function to send a notification
  const sendNotification = async (item) => {
    try {
      const hour = formatTime(item).trim();
      let desiredNotificationTime = new Date(`${item.date}T${hour}:00`);
      desiredNotificationTime = calculateTimingNotification(desiredNotificationTime, item["reminderText"]);
      desiredNotificationTime = new Date(desiredNotificationTime);
  
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Asistec",
          body: `Tienes un evento cercano ${item.name}`, // Include the provided body in the notification
        },
        trigger: desiredNotificationTime,
      });
    } catch (error) {
      console.log("Error sendNotification: ", error);
    }
  };

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Add a listener for notifications received while app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Send a notification using the provided body
    sendNotification(item);

    // Cleanup listeners when component unmounts
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  // Function to register the device for push notifications
  async function registerForPushNotificationsAsync() {

    try {
      // Set up notification channel for Android devices
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
  
      // Check if device is supported and has notification permissions
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        let token = (await Notifications.getExpoPushTokenAsync()).data;
      } else {
        alert("Must use physical device for Push Notifications");
      }
  
      return null;
      
    } catch (error) {
      console.log("Error registerForPushNotificationsAsync: ", error);
    }
  }

}

export default PushNotification;
