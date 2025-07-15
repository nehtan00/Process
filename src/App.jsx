import React, { useState } from "react";
import WorksheetStepper from "./components/WorksheetStepper";
import FeelingsWheel from "./components/FeelingsWheel";

function App() {
  const [selectedEmotion, setSelectedEmotion] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 text-gray-900">
      <header className="p-6 flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Emotional Processing Worksheets
        </h1>
        {selectedEmotion && (
          <div className="mt-2 sm:mt-0 text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            💭 Selected: <span className="font-semibold text-blue-700">{selectedEmotion}</span>
          </div>
        )}
      </header>
      
      <div className="flex flex-col xl:flex-row gap-8 p-6 max-w-7xl mx-auto">
        {/* Feelings Wheel - Always visible */}
        <div className="xl:w-1/3 flex justify-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <FeelingsWheel 
              selectedEmotion={selectedEmotion}
              onSelectEmotion={setSelectedEmotion}
            />
          </div>
        </div>
        
        {/* Worksheets */}
        <div className="xl:w-2/3">
          <WorksheetStepper selectedEmotion={selectedEmotion} />
        </div>
      </div>
    </div>
  );
}

export default App;
