import React, { useMemo } from "react";

// Wheel data structure: core, middle, outer
const wheelData = [
  {
    core: "Happy",
    color: "#FBBF24",
    middle: [
      {
        label: "Playful",
        outer: ["Cheeky", "Free", "Joyful", "Energetic", "Aroused", "Excited"],
      },
      {
        label: "Content",
        outer: ["Interested", "Proud", "Accepted", "Powerful", "Peaceful", "Trusting"],
      },
      {
        label: "Optimistic",
        outer: ["Thankful", "Sensitive", "Intimate", "Hopeful", "Inspired"],
      },
    ],
  },
  {
    core: "Sad",
    color: "#6366F1",
    middle: [
      {
        label: "Lonely",
        outer: ["Isolated", "Abandoned", "Victimized", "Fragile", "Grief", "Powerless", "Empty", "Remorseful"]
      },
      {
        label: "Vulnerable",
        outer: ["Guilty", "Ashamed", "Inferior", "Embarrassed", "Disappointed", "Appalled", "Repelled"]
      },
      {
        label: "Despair",
        outer: ["Depressed", "Hurt"]
      }
    ],
  },
  {
    core: "Angry",
    color: "#EF4444",
    middle: [
      {
        label: "Let Down",
        outer: ["Betrayed", "Resentful", "Disrespected", "Ridiculed", "Indignant", "Violated"]
      },
      {
        label: "Mad",
        outer: ["Furious", "Jealous", "Provoked", "Hostile", "Infuriated", "Annoyed", "Withdrawn", "Numb"]
      },
      {
        label: "Aggressive",
        outer: ["Frustrated", "Distant", "Critical"]
      }
    ],
  },
  {
    core: "Fearful",
    color: "#A21CAF",
    middle: [
      {
        label: "Scared",
        outer: ["Anxious", "Insecure", "Weak", "Rejected", "Threatened"]
      },
      {
        label: "Helpless",
        outer: ["Frightened", "Overwhelmed", "Worried", "Inadequate", "Inferior", "Insignificant"]
      },
      {
        label: "Excluded",
        outer: ["Persecuted", "Nervous", "Exposed"]
      }
    ],
  },
  {
    core: "Disgusted",
    color: "#92400E",
    middle: [
      {
        label: "Disapproving",
        outer: ["Disappointed", "Appalled", "Repelled"]
      },
      {
        label: "Disapproving",
        outer: ["Disgusted", "Disapproving"]
      }
    ],
  },
  {
    core: "Bad",
    color: "#8B5CF6",
    middle: [
      {
        label: "Bored",
        outer: ["Busy", "Stressed", "Tired"]
      },
      {
        label: "Indifferent",
        outer: ["Apathetic", "Uninterested"]
      }
    ],
  },
  {
    core: "Surprised",
    color: "#10B981",
    middle: [
      {
        label: "Startled",
        outer: ["Shocked", "Disillusioned", "Perplexed", "Astonished", "Awe"]
      },
      {
        label: "Confused",
        outer: ["Amazed", "Excited"]
      }
    ],
  },
];

// Helper to flatten all emotions for lookup
const allEmotions = (() => {
  const map = {};
  wheelData.forEach((core, i) => {
    map[core.core.toLowerCase()] = { core: core.core, coreIdx: i };
    core.middle.forEach((mid, j) => {
      map[mid.label.toLowerCase()] = { core: core.core, coreIdx: i, middle: mid.label, middleIdx: j };
      mid.outer.forEach((outer, k) => {
        map[outer.toLowerCase()] = { core: core.core, coreIdx: i, middle: mid.label, middleIdx: j, outer, outerIdx: k };
      });
    });
  });
  return map;
})();

export default function FeelingsWheel({ selectedEmotion, onSelectEmotion }) {
  const size = 400;
  const center = size / 2;
  
  // Find which segment is selected
  const selected = useMemo(() => {
    if (!selectedEmotion) return null;
    return allEmotions[selectedEmotion.toLowerCase()] || null;
  }, [selectedEmotion]);

  // Calculate SVG paths for each ring
  const coreSegments = useMemo(() => {
    const segmentAngle = (2 * Math.PI) / wheelData.length;
    return wheelData.map((emotion, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      const radius = 60;
      
      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);
      
      const largeArcFlag = segmentAngle > Math.PI ? 1 : 0;
      
      const path = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      return {
        path,
        emotion: emotion.core,
        color: emotion.color,
        index
      };
    });
  }, [center]);

  const middleSegments = useMemo(() => {
    const segments = [];
    wheelData.forEach((core, coreIndex) => {
      const coreSegmentAngle = (2 * Math.PI) / wheelData.length;
      const coreStartAngle = coreIndex * coreSegmentAngle;
      const middleSegmentAngle = coreSegmentAngle / core.middle.length;
      
      core.middle.forEach((middle, middleIndex) => {
        const startAngle = coreStartAngle + (middleIndex * middleSegmentAngle);
        const endAngle = coreStartAngle + ((middleIndex + 1) * middleSegmentAngle);
        const innerRadius = 60;
        const outerRadius = 120;
        
        const x1 = center + innerRadius * Math.cos(startAngle);
        const y1 = center + innerRadius * Math.sin(startAngle);
        const x2 = center + innerRadius * Math.cos(endAngle);
        const y2 = center + innerRadius * Math.sin(endAngle);
        const x3 = center + outerRadius * Math.cos(endAngle);
        const y3 = center + outerRadius * Math.sin(endAngle);
        const x4 = center + outerRadius * Math.cos(startAngle);
        const y4 = center + outerRadius * Math.sin(startAngle);
        
        const largeArcFlag = middleSegmentAngle > Math.PI ? 1 : 0;
        
        const path = [
          `M ${x1} ${y1}`,
          `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          `L ${x3} ${y3}`,
          `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
          'Z'
        ].join(' ');
        
        segments.push({
          path,
          emotion: middle.label,
          color: core.color,
          coreIndex,
          middleIndex
        });
      });
    });
    return segments;
  }, [center]);

  const outerSegments = useMemo(() => {
    const segments = [];
    wheelData.forEach((core, coreIndex) => {
      const coreSegmentAngle = (2 * Math.PI) / wheelData.length;
      const coreStartAngle = coreIndex * coreSegmentAngle;
      
      core.middle.forEach((middle, middleIndex) => {
        const middleSegmentAngle = coreSegmentAngle / core.middle.length;
        const middleStartAngle = coreStartAngle + (middleIndex * middleSegmentAngle);
        const outerSegmentAngle = middleSegmentAngle / middle.outer.length;
        
        middle.outer.forEach((outer, outerIndex) => {
          const startAngle = middleStartAngle + (outerIndex * outerSegmentAngle);
          const endAngle = middleStartAngle + ((outerIndex + 1) * outerSegmentAngle);
          const innerRadius = 120;
          const outerRadius = 180;
          
          const x1 = center + innerRadius * Math.cos(startAngle);
          const y1 = center + innerRadius * Math.sin(startAngle);
          const x2 = center + innerRadius * Math.cos(endAngle);
          const y2 = center + innerRadius * Math.sin(endAngle);
          const x3 = center + outerRadius * Math.cos(endAngle);
          const y3 = center + outerRadius * Math.sin(endAngle);
          const x4 = center + outerRadius * Math.cos(startAngle);
          const y4 = center + outerRadius * Math.sin(startAngle);
          
          const largeArcFlag = outerSegmentAngle > Math.PI ? 1 : 0;
          
          const path = [
            `M ${x1} ${y1}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `L ${x3} ${y3}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
            'Z'
          ].join(' ');
          
          segments.push({
            path,
            emotion: outer,
            color: core.color,
            coreIndex,
            middleIndex,
            outerIndex
          });
        });
      });
    });
    return segments;
  }, [center]);

  const handleSegmentClick = (emotion) => {
    onSelectEmotion(emotion);
  };

  const isSelected = (emotion) => {
    if (!selected) return false;
    return selectedEmotion?.toLowerCase() === emotion.toLowerCase();
  };

  const isInSelectedSection = (segment) => {
    if (!selected) return false;
    
    if (selected.core && segment.coreIndex === selected.coreIdx) {
      return true;
    }
    if (selected.middle && segment.coreIndex === selected.coreIdx && segment.middleIndex === selected.middleIdx) {
      return true;
    }
    if (selected.outer && segment.coreIndex === selected.coreIdx && segment.middleIndex === selected.middleIdx && segment.outerIndex === selected.outerIdx) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-bold text-gray-800">Feelings Wheel</div>
      <div className="relative">
        <svg width={size} height={size} className="drop-shadow-xl">
          {/* Outer ring segments */}
          {outerSegments.map((segment, index) => (
            <path
              key={`outer-${index}`}
              d={segment.path}
              fill={isInSelectedSection(segment) ? segment.color : '#f8fafc'}
              stroke="#e2e8f0"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-300 hover:opacity-90 hover:stroke-2"
              onClick={() => handleSegmentClick(segment.emotion)}
            />
          ))}
          
          {/* Middle ring segments */}
          {middleSegments.map((segment, index) => (
            <path
              key={`middle-${index}`}
              d={segment.path}
              fill={isInSelectedSection(segment) ? segment.color : '#f1f5f9'}
              stroke="#e2e8f0"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-300 hover:opacity-90 hover:stroke-2"
              onClick={() => handleSegmentClick(segment.emotion)}
            />
          ))}
          
          {/* Core segments */}
          {coreSegments.map((segment, index) => (
            <path
              key={`core-${index}`}
              d={segment.path}
              fill={isInSelectedSection(segment) ? segment.color : '#ffffff'}
              stroke="#e2e8f0"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-300 hover:opacity-90 hover:stroke-3"
              onClick={() => handleSegmentClick(segment.emotion)}
            />
          ))}
          
          {/* Center circle */}
          <circle
            cx={center}
            cy={center}
            r="20"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="2"
            className="cursor-pointer hover:stroke-3 transition-all duration-300"
            onClick={() => handleSegmentClick('')}
          />
          
          {/* Emotion labels */}
          {coreSegments.map((segment, index) => {
            const angle = (index * (2 * Math.PI) / wheelData.length) + ((2 * Math.PI) / wheelData.length / 2);
            const radius = 40;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            
            return (
              <text
                key={`core-label-${index}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold pointer-events-none"
                fill={isInSelectedSection(segment) ? "#ffffff" : "#475569"}
              >
                {segment.emotion}
              </text>
            );
          })}
        </svg>
        
        {/* Selected emotion display */}
        {selectedEmotion && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-200">
            <span className="text-sm font-semibold text-gray-700">
              Selected: <span className="text-blue-600">{selectedEmotion}</span>
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-sm text-gray-500 text-center max-w-md">
        Click any emotion to select and focus that section. The wheel will highlight related emotions.
      </div>
    </div>
  );
} 