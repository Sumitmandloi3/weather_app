import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import CitiesTable from "./components/CitiesTable";
import WeatherPage from "./components/WeatherPage";
import "./App.css"; // Assuming you have a CSS file for styling

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Routes>
      <Route  path="/" Component={CitiesTable} />
      <Route path="/WeatherPage/:cityName" Component={WeatherPage} />
      </Routes>
     
    </div>
  );
};

export default App;
