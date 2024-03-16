import React from "react";
import { DataProvider } from "./src/context/DataProvider";
import InitApp from "./InitApp";
import { AuthProvider } from "./src/context/AuthProvider";
import { EventProvider } from "./src/context/EventProvider";
import { ActivityProvider } from "./src/context/ActivityProvider";
import { ScheduleProvider } from "./src/context/ScheduleProvider.js";
const App = () => {
  return (
    <AuthProvider>
      <ScheduleProvider>
        <ActivityProvider>
          <EventProvider>
            <DataProvider>
              <InitApp />
            </DataProvider>
          </EventProvider>
        </ActivityProvider>
      </ScheduleProvider>
    </AuthProvider>
  );
};

export default App;
