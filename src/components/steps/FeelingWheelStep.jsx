import React, { useState, useEffect } from "react";

export default function FeelingWheelStep({ value, onChange, selectedEmotion }) {
  const [form, setForm] = useState(value || {
    coreEmotion: "",
    bodyLocation: "",
    emotionMessage: "",
    emotionNeed: "",
    release: "",
  });

  useEffect(() => {
    if (onChange) onChange(form);
    // eslint-disable-next-line
  }, [form]);

  useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(form)) {
      setForm(value);
    }
    // eslint-disable-next-line
  }, [value]);

  // Sync with selected emotion from wheel
  useEffect(() => {
    if (selectedEmotion && selectedEmotion !== form.coreEmotion) {
      setForm(prev => ({ ...prev, coreEmotion: selectedEmotion }));
    }
  }, [selectedEmotion]);

  return (
    <form className="space-y-6">
      <div>
        <label className="block font-semibold mb-2 text-gray-800">1. What is the primary emotion you are feeling right now?</label>
        <input
          type="text"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
          placeholder="Use the Feelings Wheel if needed"
          value={form.coreEmotion}
          onChange={e => setForm({ ...form, coreEmotion: e.target.value })}
        />
        {selectedEmotion && (
          <div className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            💡 Selected from wheel: <span className="font-semibold">{selectedEmotion}</span>
          </div>
        )}
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-800">2. Where in your body do you notice this emotion? What does it feel like physically?</label>
        <input
          type="text"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
          placeholder="e.g., tightness in chest, knot in stomach, restless legs"
          value={form.bodyLocation}
          onChange={e => setForm({ ...form, bodyLocation: e.target.value })}
        />
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-800">3. If this emotion could speak, what message would it have for you?</label>
        <input
          type="text"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
          placeholder="What does this emotion want you to know?"
          value={form.emotionMessage}
          onChange={e => setForm({ ...form, emotionMessage: e.target.value })}
        />
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-800">4. What does this emotion need from you?</label>
        <input
          type="text"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
          placeholder="e.g., space, rest, express, cry, move"
          value={form.emotionNeed}
          onChange={e => setForm({ ...form, emotionNeed: e.target.value })}
        />
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-800">5. Acknowledge and Release</label>
        <textarea
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
          rows="4"
          placeholder="I acknowledge this feeling of [Emotion]. I allow myself to feel it fully. I am releasing [specific tension/thought] associated with it."
          value={form.release}
          onChange={e => setForm({ ...form, release: e.target.value })}
        />
      </div>
    </form>
  );
} 