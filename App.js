import React from "react";
import { DataProvider } from "./src/context/DataProvider";
import InitApp from "./InitApp";
import { AuthProvider } from "./src/context/AuthProvider";
import { EventProvider } from "./src/context/EventProvider";
import { ActivityProvider } from "./src/context/ActivityProvider";
import { ScheduleProvider } from "./src/context/ScheduleProvider.js";
import { DateProvider } from "./src/context/DateProvider.js";

const App = () => {
  return (
    <AuthProvider>
      <EventProvider>
        <ScheduleProvider>
          <DateProvider>
            <ActivityProvider>
              <DataProvider>
                <InitApp />
              </DataProvider>
            </ActivityProvider>
          </DateProvider>
        </ScheduleProvider>
      </EventProvider>
    </AuthProvider>
  );
};

export default App;
