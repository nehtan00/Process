import React, { useState } from "react";

const wheelData = [
  {
    core: "Happy",
    color: "#FBBF24",
    children: [
      {
        label: "Playful",
        children: ["Cheeky", "Free", "Joyful", "Energetic", "Aroused", "Excited"],
      },
      {
        label: "Content",
        children: ["Interested", "Proud", "Accepted", "Powerful", "Peaceful", "Trusting"],
      },
      {
        label: "Optimistic",
        children: ["Thankful", "Sensitive", "Intimate", "Hopeful", "Inspired"],
      },
    ],
  },
  {
    core: "Sad",
    color: "#6366F1",
    children: [
      {
        label: "Lonely",
        children: ["Isolated", "Abandoned", "Victimized", "Fragile", "Grief", "Powerless", "Empty", "Remorseful"]
      },
      {
        label: "Vulnerable",
        children: ["Guilty", "Ashamed", "Inferior", "Embarrassed", "Disappointed", "Appalled", "Repelled"]
      },
      {
        label: "Despair",
        children: ["Depressed", "Hurt"]
      }
    ],
  },
  {
    core: "Angry",
    color: "#EF4444",
    children: [
      {
        label: "Let Down",
        children: ["Betrayed", "Resentful", "Disrespected", "Ridiculed", "Indignant", "Violated"]
      },
      {
        label: "Mad",
        children: ["Furious", "Jealous", "Provoked", "Hostile", "Infuriated", "Annoyed", "Withdrawn", "Numb"]
      },
      {
        label: "Aggressive",
        children: ["Frustrated", "Distant", "Critical"]
      }
    ],
  },
  {
    core: "Fearful",
    color: "#A21CAF",
    children: [
      {
        label: "Scared",
        children: ["Anxious", "Insecure", "Weak", "Rejected", "Threatened"]
      },
      {
        label: "Helpless",
        children: ["Frightened", "Overwhelmed", "Worried", "Inadequate", "Inferior", "Insignificant"]
      },
      {
        label: "Excluded",
        children: ["Persecuted", "Nervous", "Exposed"]
      }
    ],
  },
  {
    core: "Disgusted",
    color: "#92400E",
    children: [
      {
        label: "Disapproving",
        children: ["Disappointed", "Appalled", "Repelled"]
      },
      {
        label: "Disapproving",
        children: ["Disgusted", "Disapproving"]
      }
    ],
  },
  {
    core: "Bad",
    color: "#8B5CF6",
    children: [
      {
        label: "Bored",
        children: ["Busy", "Stressed", "Tired"]
      },
      {
        label: "Indifferent",
        children: ["Apathetic", "Uninterested"]
      }
    ],
  },
  {
    core: "Surprised",
    color: "#10B981",
    children: [
      {
        label: "Startled",
        children: ["Shocked", "Disillusioned", "Perplexed", "Astonished", "Awe"]
      },
      {
        label: "Confused",
        children: ["Amazed", "Excited"]
      }
    ],
  },
];

export default function FeelingsWheelModal({ open, onClose }) {
  const [selected, setSelected] = useState(null);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative flex flex-col items-center">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Feelings Wheel</h2>
        <div className="relative flex items-center justify-center" style={{ width: 350, height: 350 }}>
          <svg width={350} height={350} viewBox="0 0 350 350">
            <g>
              {wheelData.map((segment, i) => {
                const angle = (360 / wheelData.length);
                const startAngle = i * angle;
                const endAngle = startAngle + angle;
                const largeArc = angle > 180 ? 1 : 0;
                const r1 = 80, r2 = 170;
                const x1 = 175 + r1 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                const y1 = 175 + r1 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                const x2 = 175 + r2 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                const y2 = 175 + r2 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                const x3 = 175 + r2 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                const y3 = 175 + r2 * Math.sin((Math.PI * (endAngle - 90)) / 180);
                const x4 = 175 + r1 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                const y4 = 175 + r1 * Math.sin((Math.PI * (endAngle - 90)) / 180);
                const d = `M${x1},${y1} L${x2},${y2} A${r2},${r2} 0 ${largeArc} 1 ${x3},${y3} L${x4},${y4} A${r1},${r1} 0 ${largeArc} 0 ${x1},${y1} Z`;
                return (
                  <path
                    key={segment.core}
                    d={d}
                    fill={segment.color}
                    fillOpacity={selected === i ? 0.9 : 0.7}
                    stroke="#fff"
                    strokeWidth={2}
                    onClick={() => setSelected(i)}
                    style={{ cursor: "pointer" }}
                  />
                );
              })}
              {/* Center circle */}
              <circle cx={175} cy={175} r={70} fill="#fff" stroke="#ddd" strokeWidth={2} />
            </g>
            {/* Core emotion labels */}
            {wheelData.map((segment, i) => {
              const angle = (360 / wheelData.length) * i - 90 + (360 / wheelData.length) / 2;
              const r = 120;
              const x = 175 + r * Math.cos((Math.PI * angle) / 180);
              const y = 175 + r * Math.sin((Math.PI * angle) / 180) + 5;
              return (
                <text
                  key={segment.core + "-label"}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fontSize={18}
                  fontWeight="bold"
                  fill="#222"
                  style={{ pointerEvents: "none" }}
                >
                  {segment.core}
                </text>
              );
            })}
          </svg>
          {/* Details for selected segment */}
          {selected !== null && (
            <div className="absolute left-0 right-0 mx-auto top-1/2 -translate-y-1/2 bg-white bg-opacity-95 rounded-lg shadow-lg p-4 w-72 border border-purple-200 z-10">
              <h3 className="text-lg font-bold mb-2 text-center">{wheelData[selected].core}</h3>
              {wheelData[selected].children.map((group, idx) => (
                <div key={group.label} className="mb-2">
                  <div className="font-semibold text-purple-700">{group.label}</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {group.children.map((word) => (
                      <span key={word} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <button
                className="mt-2 w-full bg-purple-600 text-white rounded px-3 py-2 hover:bg-purple-700"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">Click a segment to explore emotions. Use the wheel to help identify your core emotion.</p>
      </div>
    </div>
  );
} 