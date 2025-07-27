import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MilkingSession from "./components/MilkingSession";
import HistoryPage from "./components/HistoryPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MilkingSession />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
