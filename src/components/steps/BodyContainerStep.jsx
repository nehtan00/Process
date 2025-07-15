import React, { useState, useEffect } from "react";

export default function BodyContainerStep({ value, onChange }) {
  const [form, setForm] = useState(value || {
    color: "",
    shape: "",
    size: "",
    location: "",
    sound: "",
    texture: "",
    notes: "",
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

  return (
    <form className="space-y-6">
      <div>
        <label className="block font-semibold mb-1">1. What color is the emotion?</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.color}
          onChange={e => setForm({ ...form, color: e.target.value })}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">2. What shape is it?</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.shape}
          onChange={e => setForm({ ...form, shape: e.target.value })}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">3. How big is it?</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.size}
          onChange={e => setForm({ ...form, size: e.target.value })}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">4. Where is it located in your body?</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">5. If the emotion had a sound, what would it be?</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.sound}
          onChange={e => setForm({ ...form, sound: e.target.value })}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">6. If the emotion had a texture, what would it be?</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={form.texture}
          onChange={e => setForm({ ...form, texture: e.target.value })}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Notes or Observations</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />
      </div>
      <div className="text-gray-600 text-sm mt-2">
        <p>Close your eyes and imagine your body as a container for this emotion. Can you allow it to be there, without judgment, just observing it? As you breathe, imagine breathing into that space, creating more room for the emotion, without trying to push it away. Notice if it shifts or changes.</p>
      </div>
    </form>
  );
} 