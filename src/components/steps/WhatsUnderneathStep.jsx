import React, { useState, useEffect } from "react";

export default function WhatsUnderneathStep({ value, onChange }) {
  const [layers, setLayers] = useState(value && value.length ? value : [
    { prompt: "I feel [Surface Emotion] because...", value: "" },
  ]);

  useEffect(() => {
    if (onChange) onChange(layers);
    // eslint-disable-next-line
  }, [layers]);

  useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(layers)) {
      setLayers(value);
    }
    // eslint-disable-next-line
  }, [value]);

  const addLayer = () => {
    setLayers([
      ...layers,
      { prompt: "And beneath that, I really feel...", value: "" },
    ]);
  };

  const updateLayer = (idx, val) => {
    setLayers(layers.map((l, i) => (i === idx ? { ...l, value: val } : l)));
  };

  return (
    <form className="space-y-6">
      {layers.map((layer, idx) => (
        <div key={idx}>
          <label className="block font-semibold mb-1">{layer.prompt}</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={layer.value}
            onChange={e => updateLayer(idx, e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        className="mt-2 px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
        onClick={addLayer}
      >
        Add another layer
      </button>
    </form>
  );
} 