import React, { useMemo, useState, useRef } from "react";

// New data structure matching the provided wheel image
const wheelData = [
  {
    core: "Happy",
    color: "#FFD93B", // bright yellow
    middle: [
      {
        label: "Playful",
        color: "#FFD93B",
        outer: [
          { label: "Aroused", color: "#FFE066" },
          { label: "Cheeky", color: "#FFD23F" },
          { label: "Free", color: "#FFB627" },
          { label: "Joyful", color: "#FFB300" },
          { label: "Curious", color: "#FFD93B" },
          { label: "Inquisitive", color: "#F7C948" },
          { label: "Successful", color: "#F4D35E" },
          { label: "Confident", color: "#F7B801" },
          { label: "Respected", color: "#F9A602" },
          { label: "Valued", color: "#F6C700" },
          { label: "Courageous", color: "#F7B801" },
          { label: "Creative", color: "#F7C948" }
        ]
      },
      {
        label: "Content",
        color: "#FFE066",
        outer: [
          { label: "Proud", color: "#FFE066" },
          { label: "Accepted", color: "#F9F871" },
          { label: "Powerful", color: "#F7D716" },
          { label: "Peaceful", color: "#F7E06B" },
          { label: "Trusting", color: "#F7E06B" },
          { label: "Optimistic", color: "#F7E06B" }
        ]
      },
      {
        label: "Interested",
        color: "#F7C948",
        outer: [
          { label: "Hopeful", color: "#F7C948" },
          { label: "Inspired", color: "#F7B801" },
          { label: "Loving", color: "#FFD23F" },
          { label: "Thankful", color: "#FFD93B" },
          { label: "Sensitive", color: "#FFE066" },
          { label: "Intimate", color: "#F7C948" }
        ]
      }
    ]
  },
  {
    core: "Surprised",
    color: "#4ECDC4", // teal
    middle: [
      {
        label: "Excited",
        color: "#4ECDC4",
        outer: [
          { label: "Energetic", color: "#63E6BE" },
          { label: "Eager", color: "#36CFC9" },
          { label: "Astonished", color: "#38B2AC" },
          { label: "Awe", color: "#4ECDC4" }
        ]
      },
      {
        label: "Amazed",
        color: "#63E6BE",
        outer: [
          { label: "Shocked", color: "#63E6BE" },
          { label: "Disillusioned", color: "#48C9B0" },
          { label: "Perplexed", color: "#4ECDC4" }
        ]
      },
      {
        label: "Confused",
        color: "#38B2AC",
        outer: [
          { label: "Startled", color: "#38B2AC" },
          { label: "Stressed", color: "#36CFC9" },
          { label: "Tired", color: "#4ECDC4" }
        ]
      }
    ]
  },
  {
    core: "Bad",
    color: "#9D4EDD", // purple
    middle: [
      {
        label: "Bored",
        color: "#B983FF",
        outer: [
          { label: "Indifferent", color: "#B983FF" },
          { label: "Apathetic", color: "#A084E8" },
          { label: "Busy", color: "#9D4EDD" }
        ]
      },
      {
        label: "Stressed",
        color: "#7F6EDB",
        outer: [
          { label: "Overwhelmed", color: "#7F6EDB" },
          { label: "Rushed", color: "#9D4EDD" }
        ]
      },
      {
        label: "Tired",
        color: "#A084E8",
        outer: [
          { label: "Sleepy", color: "#A084E8" },
          { label: "Unfocused", color: "#B983FF" },
          { label: "Drained", color: "#9D4EDD" }
        ]
      }
    ]
  },
  {
    core: "Fearful",
    color: "#FF6F61", // coral
    middle: [
      {
        label: "Scared",
        color: "#FF6F61",
        outer: [
          { label: "Helpless", color: "#FFB3AB" },
          { label: "Frightened", color: "#FF6F61" },
          { label: "Overwhelmed", color: "#FF8C82" },
          { label: "Worried", color: "#FFB3AB" }
        ]
      },
      {
        label: "Anxious",
        color: "#FF8C82",
        outer: [
          { label: "Insecure", color: "#FF8C82" },
          { label: "Weak", color: "#FFB3AB" },
          { label: "Rejected", color: "#FF6F61" },
          { label: "Threatened", color: "#FF8C82" }
        ]
      },
      {
        label: "Rejected",
        color: "#FFB3AB",
        outer: [
          { label: "Insignificant", color: "#FFB3AB" },
          { label: "Excluded", color: "#FF8C82" },
          { label: "Persecuted", color: "#FF6F61" },
          { label: "Nervous", color: "#FFB3AB" }
        ]
      }
    ]
  },
  {
    core: "Angry",
    color: "#D7263D", // red
    middle: [
      {
        label: "Let Down",
        color: "#F46036",
        outer: [
          { label: "Betrayed", color: "#F46036" },
          { label: "Resentful", color: "#D7263D" },
          { label: "Disrespected", color: "#F46036" }
        ]
      },
      {
        label: "Humiliated",
        color: "#D7263D",
        outer: [
          { label: "Ridiculed", color: "#D7263D" },
          { label: "Indignant", color: "#F46036" },
          { label: "Violated", color: "#D7263D" }
        ]
      },
      {
        label: "Bitter",
        color: "#A71D31",
        outer: [
          { label: "Mad", color: "#A71D31" },
          { label: "Aggressive", color: "#D7263D" },
          { label: "Frustrated", color: "#F46036" },
          { label: "Distant", color: "#A71D31" },
          { label: "Critical", color: "#D7263D" }
        ]
      }
    ]
  },
  {
    core: "Disgusted",
    color: "#A0522D", // brown
    middle: [
      {
        label: "Disapproving",
        color: "#C97C5D",
        outer: [
          { label: "Disappointed", color: "#C97C5D" },
          { label: "Appalled", color: "#A0522D" },
          { label: "Repelled", color: "#C97C5D" }
        ]
      },
      {
        label: "Disappointed",
        color: "#A0522D",
        outer: [
          { label: "Nauseated", color: "#A0522D" },
          { label: "Awkward", color: "#C97C5D" },
          { label: "Embarrassed", color: "#A0522D" }
        ]
      },
      {
        label: "Repelled",
        color: "#7C3F00",
        outer: [
          { label: "Horrified", color: "#7C3F00" },
          { label: "Uncomfortable", color: "#A0522D" },
          { label: "Judgmental", color: "#C97C5D" }
        ]
      }
    ]
  },
  {
    core: "Sad",
    color: "#3A0CA3", // blue
    middle: [
      {
        label: "Lonely",
        color: "#5F4B8B",
        outer: [
          { label: "Isolated", color: "#5F4B8B" },
          { label: "Abandoned", color: "#3A0CA3" },
          { label: "Victimized", color: "#5F4B8B" }
        ]
      },
      {
        label: "Vulnerable",
        color: "#3A0CA3",
        outer: [
          { label: "Fragile", color: "#3A0CA3" },
          { label: "Grief", color: "#5F4B8B" },
          { label: "Powerless", color: "#3A0CA3" }
        ]
      },
      {
        label: "Despair",
        color: "#1B1B3A",
        outer: [
          { label: "Guilty", color: "#1B1B3A" },
          { label: "Empty", color: "#3A0CA3" },
          { label: "Remorseful", color: "#5F4B8B" }
        ]
      }
    ]
  }
];

// Helper to flatten all emotions for lookup
const allEmotions = (() => {
  const map = {};
  wheelData.forEach((core, i) => {
    map[core.core.toLowerCase()] = { core: core.core, coreIdx: i };
    core.middle.forEach((mid, j) => {
      map[mid.label.toLowerCase()] = { core: core.core, coreIdx: i, middle: mid.label, middleIdx: j };
      mid.outer.forEach((outer, k) => {
        map[outer.label.toLowerCase()] = { core: core.core, coreIdx: i, middle: mid.label, middleIdx: j, outer: outer.label, outerIdx: k };
      });
    });
  });
  return map;
})();

export default function FeelingsWheel({ selectedEmotion, onSelectEmotion }) {
  const [hoveredRing, setHoveredRing] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredOuter, setHoveredOuter] = useState(null);
  const containerRef = useRef();
  const [size, setSize] = useState(600); // Default, will update on mount
  const center = size / 2;
  const svgRef = useRef();
  
  // Responsive resize effect
  React.useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize(Math.min(rect.width, rect.height));
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          color: middle.color,
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
    // Use more of the available space
    const innerRadius = isExpanded ? size * 0.47 : size * 0.36;
    const outerRadius = isExpanded ? size * 0.5 : size * 0.42;
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
          // Use the new color property for each outer segment
          const outerColor = typeof outer === 'object' && outer.color ? outer.color : middle.color;
          const outerLabel = typeof outer === 'object' && outer.label ? outer.label : outer;
          segments.push({
            path,
            arcPath,
            arcId: `arc-path-${coreIndex}-${middleIndex}-${outerIndex}`,
            emotion: outerLabel,
            color: outerColor,
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
  }, [center, hoveredRing, hoveredSection, size]);

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
    <div ref={containerRef} className="flex flex-col items-center w-full h-full min-h-[500px]">
      <div className="mb-4 text-xl font-bold text-gray-800">Feelings Wheel</div>
      <div className="relative w-full h-full flex items-center justify-center" style={{minHeight: 500}}>
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-xl w-full h-auto"
        >
          {/* Outer ring segments - always visible but expand on hover */}
          {outerSegments.map((segment, index) => {
            // Calculate arc length for dynamic font size
            const arcLength = segment.arcPath ? (() => {
              const r = (segment.innerRadius + segment.outerRadius) / 2;
              return r * (segment.endAngle - segment.startAngle);
            })() : 100;
            // Dynamic font size
            const baseFont = segment.isExpanded || hoveredOuter === index ? size * 0.025 : size * 0.017;
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
                  fill={segment.color}
                  stroke="#e2e8f0"
                  strokeWidth={isHovered ? 3 : 1}
                  className="cursor-pointer"
                  onClick={() => handleSegmentClick(segment.emotion)}
                  style={{
                    filter: isHovered ? 'drop-shadow(0 0 12px #888)' : undefined,
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.35s cubic-bezier(.4,2,.6,1), filter 0.35s cubic-bezier(.4,2,.6,1)',
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
                    transition: 'font-size 0.35s cubic-bezier(.4,2,.6,1), opacity 0.35s cubic-bezier(.4,2,.6,1)',
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
                      transition: 'all 0.35s cubic-bezier(.4,2,.6,1)',
                    }}
                  >
                    {segment.emotion}
                  </textPath>
                </text>
                {/* Popout on hover */}
                {isHovered && (
                  <foreignObject
                    x={center - size * 0.18}
                    y={center - segment.outerRadius - size * 0.09}
                    width={size * 0.36}
                    height={size * 0.09}
                    style={{ pointerEvents: 'none', transition: 'all 0.35s cubic-bezier(.4,2,.6,1)' }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: size * 0.045,
                      fontWeight: 700,
                      color: '#222',
                      background: 'rgba(255,255,255,0.97)',
                      borderRadius: 12,
                      boxShadow: '0 4px 24px 0 #0002',
                      textAlign: 'center',
                      pointerEvents: 'none',
                      opacity: 1,
                      transition: 'all 0.35s cubic-bezier(.4,2,.6,1)',
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