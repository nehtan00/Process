import React, { useState } from "react";
import WorksheetStepper from "./components/WorksheetStepper";
import FeelingsWheelModal from "./components/FeelingsWheelModal";

function App() {
  const [showWheel, setShowWheel] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900">
      <header className="p-6 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold">Emotional Processing Worksheets</h1>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          onClick={() => setShowWheel(true)}
        >
          Open Feelings Wheel
        </button>
      </header>
      <main className="max-w-2xl mx-auto py-10 px-4">
        <WorksheetStepper />
      </main>
      <FeelingsWheelModal open={showWheel} onClose={() => setShowWheel(false)} />
      {/* Floating button for mobile */}
      <button
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg md:hidden z-50 hover:bg-purple-700 transition"
        onClick={() => setShowWheel(true)}
        aria-label="Open Feelings Wheel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      </button>
    </div>
  );
}

export default App;
