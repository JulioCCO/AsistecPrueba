import React from "react";
import { DataProvider } from "./src/context/DataProvider";
import InitApp from "./InitApp";
import { AuthProvider } from "./src/context/AuthProvider";
import { EventProvider } from "./src/context/EventProvider";
import { ActivityProvider } from "./src/context/ScheduleProvider";
const App = () => {


  return (
    <AuthProvider>
      <ActivityProvider>
      <EventProvider>
        <DataProvider>
          <InitApp />
        </DataProvider>
      </EventProvider>
      </ActivityProvider>
    </AuthProvider>
  );
};

export default App;
