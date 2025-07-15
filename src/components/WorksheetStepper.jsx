import React, { useState } from "react";
import FeelingWheelStep from "./steps/FeelingWheelStep";
import WhatsUnderneathStep from "./steps/WhatsUnderneathStep";
import BodyContainerStep from "./steps/BodyContainerStep";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const steps = [
  {
    label: "Feeling Wheel Exploration",
    component: FeelingWheelStep,
    key: "feelingWheel"
  },
  {
    label: "What's Underneath?",
    component: WhatsUnderneathStep,
    key: "whatsUnderneath"
  },
  {
    label: "Body as a Container",
    component: BodyContainerStep,
    key: "bodyContainer"
  },
];

export default function WorksheetStepper({ selectedEmotion }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({
    feelingWheel: {},
    whatsUnderneath: [],
    bodyContainer: {},
  });
  const [status, setStatus] = useState("");

  const handleStepChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setStatus("Saving...");
    try {
      await addDoc(collection(db, "worksheets"), {
        ...answers,
        created: serverTimestamp(),
      });
      setStatus("Saved to cloud!");
    } catch (e) {
      setStatus("Error saving: " + e.message);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([
      JSON.stringify(answers, null, 2)
    ], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "worksheet_answers.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(answers, null, 2));
    setStatus("Copied to clipboard!");
    setTimeout(() => setStatus("") , 1200);
  };

  const StepComponent = steps[current].component;
  const stepKey = steps[current].key;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="flex items-center mb-8">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white transition-all duration-300 ${
                idx === current ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg" : "bg-gray-300"
              }`}
            >
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-12 h-1 mx-3 transition-all duration-300 ${
                idx < current ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-300"
              }`} />
            )}
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{steps[current].label}</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
      </div>
      
      <StepComponent
        value={answers[stepKey]}
        onChange={(val) => handleStepChange(stepKey, val)}
        selectedEmotion={selectedEmotion}
      />
      
      <div className="flex justify-between mt-8">
        <button
          className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          ← Back
        </button>
        <button
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          disabled={current === steps.length - 1}
        >
          Next →
        </button>
      </div>
      
      <div className="flex gap-3 mt-8 justify-end">
        <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-md" onClick={handleSave}>
          💾 Save
        </button>
        <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 shadow-md" onClick={handleDownload}>
          📥 Download
        </button>
        <button className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-all duration-300 shadow-md" onClick={handleCopy}>
          📋 Copy
        </button>
      </div>
      
      {status && (
        <div className="mt-4 text-center text-sm font-medium text-purple-700 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
          {status}
        </div>
      )}
    </div>
  );
} 