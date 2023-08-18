import React from "react";
import { DataProvider } from "./src/context/DataProvider";
import InitApp from "./InitApp";

const App = () => {


  return (
    <DataProvider>
    <InitApp/>
    </DataProvider>
  );
};

export default App;
