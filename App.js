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
      <EventProvider>
        <ScheduleProvider>
          <ActivityProvider>
            <DataProvider>
              <InitApp />
            </DataProvider>
          </ActivityProvider>
        </ScheduleProvider>
      </EventProvider>
    </AuthProvider>
  );
};

export default App;
