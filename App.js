import React from "react";
import { DataProvider } from "./src/context/DataProvider";
import InitApp from "./InitApp";
import { AuthProvider } from "./src/context/AuthProvider";
import { EventProvider } from "./src/context/EventProvider";

const App = () => {


  return (
    <AuthProvider>
      <EventProvider>
        <DataProvider>
          <InitApp />
        </DataProvider>
      </EventProvider>
    </AuthProvider>
  );
};

export default App;
