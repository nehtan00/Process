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

export default function WorksheetStepper() {
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white ${
                idx === current ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-8 h-1 bg-gray-300 mx-2" />
            )}
          </div>
        ))}
      </div>
      <StepComponent
        value={answers[stepKey]}
        onChange={(val) => handleStepChange(stepKey, val)}
      />
      <div className="flex justify-between mt-8">
        <button
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          Back
        </button>
        <button
          className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
          onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          disabled={current === steps.length - 1}
        >
          Next
        </button>
      </div>
      <div className="flex gap-2 mt-8 justify-end">
        <button className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700" onClick={handleSave}>Save</button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={handleDownload}>Download</button>
        <button className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700" onClick={handleCopy}>Copy</button>
      </div>
      {status && <div className="mt-2 text-center text-sm text-purple-700">{status}</div>}
    </div>
  );
} 