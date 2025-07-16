import React, { useMemo, useState, useRef } from "react";

// Proper Plutchik Wheel of Emotions structure
const wheelData = [
  {
    core: "Joy",
    color: "#FBBF24",
    middle: [
      {
        label: "Serenity",
        outer: ["Content", "Peaceful", "Relaxed", "Calm", "Tranquil"]
      },
      {
        label: "Ecstasy",
        outer: ["Elated", "Euphoric", "Thrilled", "Exhilarated", "Overjoyed"]
      }
    ],
  },
  {
    core: "Trust",
    color: "#10B981",
    middle: [
      {
        label: "Acceptance",
        outer: ["Welcoming", "Open", "Receptive", "Approving", "Understanding"]
      },
      {
        label: "Admiration",
        outer: ["Respectful", "Appreciative", "Grateful", "Honored", "Valued"]
      }
    ],
  },
  {
    core: "Fear",
    color: "#A21CAF",
    middle: [
      {
        label: "Apprehension",
        outer: ["Uneasy", "Worried", "Concerned", "Anxious", "Nervous"]
      },
      {
        label: "Terror",
        outer: ["Panicked", "Horrified", "Petrified", "Alarmed", "Frightened"]
      }
    ],
  },
  {
    core: "Surprise",
    color: "#F59E0B",
    middle: [
      {
        label: "Distraction",
        outer: ["Confused", "Bewildered", "Perplexed", "Puzzled", "Mystified"]
      },
      {
        label: "Amazement",
        outer: ["Astonished", "Stunned", "Shocked", "Awed", "Wonderstruck"]
      }
    ],
  },
  {
    core: "Sadness",
    color: "#6366F1",
    middle: [
      {
        label: "Pensiveness",
        outer: ["Melancholy", "Reflective", "Thoughtful", "Contemplative", "Somber"]
      },
      {
        label: "Grief",
        outer: ["Devastated", "Heartbroken", "Mournful", "Despairing", "Hopeless"]
      }
    ],
  },
  {
    core: "Disgust",
    color: "#92400E",
    middle: [
      {
        label: "Boredom",
        outer: ["Uninterested", "Apathetic", "Indifferent", "Unmotivated", "Disengaged"]
      },
      {
        label: "Loathing",
        outer: ["Revolted", "Repulsed", "Disgusted", "Appalled", "Horrified"]
      }
    ],
  },
  {
    core: "Anger",
    color: "#EF4444",
    middle: [
      {
        label: "Annoyance",
        outer: ["Irritated", "Frustrated", "Exasperated", "Agitated", "Bothered"]
      },
      {
        label: "Rage",
        outer: ["Furious", "Enraged", "Livid", "Incensed", "Infuriated"]
      }
    ],
  },
  {
    core: "Anticipation",
    color: "#F97316",
    middle: [
      {
        label: "Interest",
        outer: ["Curious", "Engaged", "Focused", "Attentive", "Involved"]
      },
      {
        label: "Vigilance",
        outer: ["Alert", "Watchful", "Cautious", "Careful", "Mindful"]
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
  const [hoveredRing, setHoveredRing] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredOuter, setHoveredOuter] = useState(null);
  const size = 900;
  const center = size / 2;
  const svgRef = useRef();
  
  // Find which segment is selected
  const selected = useMemo(() => {
    if (!selectedEmotion) return null;
    return allEmotions[selectedEmotion.toLowerCase()] || null;
  }, [selectedEmotion]);

  // Calculate SVG paths for each ring with expansion
  const coreSegments = useMemo(() => {
    const segmentAngle = (2 * Math.PI) / wheelData.length;
    const isExpanded = hoveredRing === 'core';
    const radius = isExpanded ? 120 : 80;
    
    return wheelData.map((emotion, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      
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
        index,
        startAngle,
        endAngle,
        radius,
        isExpanded
      };
    });
  }, [center, hoveredRing]);

  const middleSegments = useMemo(() => {
    const segments = [];
    const isExpanded = hoveredRing === 'middle';
    const innerRadius = isExpanded ? 140 : 100;
    const outerRadius = isExpanded ? 260 : 180;
    
    wheelData.forEach((core, coreIndex) => {
      const coreSegmentAngle = (2 * Math.PI) / wheelData.length;
      const coreStartAngle = coreIndex * coreSegmentAngle;
      const middleSegmentAngle = coreSegmentAngle / core.middle.length;
      
      core.middle.forEach((middle, middleIndex) => {
        const startAngle = coreStartAngle + (middleIndex * middleSegmentAngle);
        const endAngle = coreStartAngle + ((middleIndex + 1) * middleSegmentAngle);
        
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
          middleIndex,
          startAngle,
          endAngle,
          innerRadius,
          outerRadius,
          isExpanded
        });
      });
    });
    return segments;
  }, [center, hoveredRing]);

  const outerSegments = useMemo(() => {
    const segments = [];
    const isExpanded = hoveredRing === 'middle' && hoveredSection;
    const innerRadius = isExpanded ? 280 : 200;
    const outerRadius = isExpanded ? 380 : 260;
    let pathId = 0;
    wheelData.forEach((core, coreIndex) => {
      const coreSegmentAngle = (2 * Math.PI) / wheelData.length;
      const coreStartAngle = coreIndex * coreSegmentAngle;
      const middleSegmentAngle = coreSegmentAngle / core.middle.length;
      core.middle.forEach((middle, middleIndex) => {
        const startAngle = coreStartAngle + (middleIndex * middleSegmentAngle);
        const segmentAngle = middleSegmentAngle / middle.outer.length;
        middle.outer.forEach((outer, outerIndex) => {
          const outerStartAngle = startAngle + (outerIndex * segmentAngle);
          const outerEndAngle = startAngle + ((outerIndex + 1) * segmentAngle);
          const x1 = center + innerRadius * Math.cos(outerStartAngle);
          const y1 = center + innerRadius * Math.sin(outerStartAngle);
          const x2 = center + innerRadius * Math.cos(outerEndAngle);
          const y2 = center + innerRadius * Math.sin(outerEndAngle);
          const x3 = center + outerRadius * Math.cos(outerEndAngle);
          const y3 = center + outerRadius * Math.sin(outerEndAngle);
          const x4 = center + outerRadius * Math.cos(outerStartAngle);
          const y4 = center + outerRadius * Math.sin(outerStartAngle);
          const largeArcFlag = segmentAngle > Math.PI ? 1 : 0;
          const path = [
            `M ${x1} ${y1}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `L ${x3} ${y3}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
            'Z'
          ].join(' ');
          // Arc path for textPath
          const arcRadius = (innerRadius + outerRadius) / 2;
          const arcStartX = center + arcRadius * Math.cos(outerStartAngle);
          const arcStartY = center + arcRadius * Math.sin(outerStartAngle);
          const arcEndX = center + arcRadius * Math.cos(outerEndAngle);
          const arcEndY = center + arcRadius * Math.sin(outerEndAngle);
          const arcPath = `M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${arcEndX} ${arcEndY}`;
          segments.push({
            path,
            arcPath,
            arcId: `arc-path-${coreIndex}-${middleIndex}-${outerIndex}`,
            emotion: outer,
            color: core.color,
            coreIndex,
            middleIndex,
            outerIndex,
            startAngle: outerStartAngle,
            endAngle: outerEndAngle,
            innerRadius,
            outerRadius,
            isExpanded,
            isVisible: isExpanded || !hoveredRing
          });
        });
      });
    });
    return segments;
  }, [center, hoveredRing, hoveredSection]);

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

  const isHovered = (emotion) => {
    return hoveredSection === emotion;
  };

  // Helper function to position text labels
  const getLabelPosition = (startAngle, endAngle, radius) => {
    const midAngle = (startAngle + endAngle) / 2;
    const x = center + radius * Math.cos(midAngle);
    const y = center + radius * Math.sin(midAngle);
    return { x, y, angle: midAngle };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-bold text-gray-800">Feelings Wheel</div>
      <div className="relative">
        <svg ref={svgRef} width={size} height={size} className="drop-shadow-xl">
          {/* Outer ring segments - always visible but expand on hover */}
          {outerSegments.map((segment, index) => {
            // Calculate arc length for dynamic font size
            const arcLength = segment.arcPath ? (() => {
              const r = (segment.innerRadius + segment.outerRadius) / 2;
              return r * (segment.endAngle - segment.startAngle);
            })() : 100;
            // Dynamic font size
            const baseFont = segment.isExpanded || hoveredOuter === index ? 18 : 12;
            const fontSize = Math.min(baseFont, Math.floor(arcLength / (segment.emotion.length * 0.6)));
            // On hover, rotate upright and pop out
            const isHovered = hoveredOuter === index;
            return (
              <g key={`outer-${index}`}
                onMouseEnter={() => setHoveredOuter(index)}
                onMouseLeave={() => setHoveredOuter(null)}
                style={{ opacity: segment.isVisible ? 1 : 0.3 }}>
                <path
                  d={segment.path}
                  fill={isSelected(segment.emotion) ? segment.color : (segment.isExpanded ? '#f8fafc' : '#f1f5f9')}
                  stroke="#e2e8f0"
                  strokeWidth={isHovered ? 3 : 1}
                  className="cursor-pointer transition-all duration-500 hover:opacity-90 hover:stroke-2"
                  onClick={() => handleSegmentClick(segment.emotion)}
                  style={{
                    filter: isHovered ? 'drop-shadow(0 0 8px #888)' : undefined,
                    transform: isHovered ? 'scale(1.08)' : undefined,
                    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)'
                  }}
                />
                <defs>
                  <path id={segment.arcId} d={segment.arcPath} />
                </defs>
                <text
                  fontSize={fontSize}
                  fontWeight={isHovered ? 'bold' : 'semibold'}
                  fill={isSelected(segment.emotion) ? "#ffffff" : "#64748b"}
                  style={{
                    letterSpacing: 1,
                    opacity: segment.isVisible ? (segment.isExpanded || isHovered ? 1 : 0.7) : 0.3,
                    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                  }}
                >
                  <textPath
                    xlinkHref={`#${segment.arcId}`}
                    startOffset="50%"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    dominantBaseline="middle"
                    style={{
                      textTransform: 'capitalize',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                    }}
                  >
                    {segment.emotion}
                  </textPath>
                </text>
                {/* Popout on hover */}
                {isHovered && (
                  <foreignObject
                    x={center - 100}
                    y={center - segment.outerRadius - 60}
                    width={200}
                    height={50}
                    style={{ pointerEvents: 'none' }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#222',
                      background: 'rgba(255,255,255,0.95)',
                      borderRadius: 12,
                      boxShadow: '0 4px 24px 0 #0002',
                      textAlign: 'center',
                      pointerEvents: 'none',
                    }}>
                      {segment.emotion}
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
          
          {/* Middle ring segments */}
          {middleSegments.map((segment, index) => (
            <g key={`middle-${index}`}>
              <path
                d={segment.path}
                fill={isInSelectedSection(segment) ? segment.color : '#f1f5f9'}
                stroke="#e2e8f0"
                strokeWidth="1"
                className="cursor-pointer transition-all duration-500 hover:opacity-90 hover:stroke-2"
                onClick={() => handleSegmentClick(segment.emotion)}
                onMouseEnter={() => {
                  setHoveredRing('middle');
                  setHoveredSection(segment.emotion);
                }}
                onMouseLeave={() => {
                  setHoveredRing(null);
                  setHoveredSection(null);
                }}
              />
              {/* Middle ring labels */}
              <text
                x={getLabelPosition(segment.startAngle, segment.endAngle, segment.isExpanded ? 200 : 140).x}
                y={getLabelPosition(segment.startAngle, segment.endAngle, segment.isExpanded ? 200 : 140).y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none transition-all duration-500"
                fill={isInSelectedSection(segment) ? "#ffffff" : "#64748b"}
                style={{
                  fontSize: segment.isExpanded ? '18px' : '12px',
                  fontWeight: segment.isExpanded ? 'bold' : 'semibold',
                  opacity: segment.isExpanded ? 1 : 0.9
                }}
              >
                {segment.emotion}
              </text>
            </g>
          ))}
          
          {/* Core segments */}
          {coreSegments.map((segment, index) => (
            <g key={`core-${index}`}>
              <path
                d={segment.path}
                fill={isInSelectedSection(segment) ? segment.color : '#ffffff'}
                stroke="#e2e8f0"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-500 hover:opacity-90 hover:stroke-3"
                onClick={() => handleSegmentClick(segment.emotion)}
                onMouseEnter={() => {
                  setHoveredRing('core');
                  setHoveredSection(segment.emotion);
                }}
                onMouseLeave={() => {
                  setHoveredRing(null);
                  setHoveredSection(null);
                }}
              />
              {/* Core emotion labels */}
              <text
                x={getLabelPosition(segment.startAngle, segment.endAngle, segment.isExpanded ? 80 : 50).x}
                y={getLabelPosition(segment.startAngle, segment.endAngle, segment.isExpanded ? 80 : 50).y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none transition-all duration-500"
                fill={isInSelectedSection(segment) ? "#ffffff" : "#475569"}
                style={{
                  fontSize: segment.isExpanded ? '20px' : '12px',
                  fontWeight: 'bold',
                  opacity: segment.isExpanded ? 1 : 1
                }}
              >
                {segment.emotion}
              </text>
            </g>
          ))}
          
          {/* Center circle */}
          <circle
            cx={center}
            cy={center}
            r="30"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="2"
            className="cursor-pointer hover:stroke-3 transition-all duration-300"
            onClick={() => handleSegmentClick('')}
          />
        </svg>
        
        {/* Selected emotion display */}
        {selectedEmotion && !hoveredRing && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-200">
            <span className="text-sm font-semibold text-gray-700">
              Selected: <span className="text-blue-600">{selectedEmotion}</span>
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-sm text-gray-500 text-center max-w-md">
        Hover over any ring to expand and see all emotions clearly. Click to select.
      </div>
    </div>
  );
} 