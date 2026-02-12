import React, { useRef, useEffect, useState } from 'react';
import * as go from 'gojs';
import { FaCompress, FaExpand, FaMinus, FaPlus, FaRedo } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

interface GoJSWrapperProps {
  teamData: any[];
  setSelectedMember: (member: any) => void;
}

const GoJSWrapper: React.FC<GoJSWrapperProps> = ({ teamData, setSelectedMember }) => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [diagram, setDiagram] = useState<go.Diagram | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Toggle Full Screen Mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      diagramRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // Zoom Controls
  const handleZoomIn = () => {
    if (diagram) diagram.commandHandler.increaseZoom();
  };

  const handleZoomOut = () => {
    if (diagram) diagram.commandHandler.decreaseZoom();
  };

  const handleResetZoom = () => {
    if (diagram) diagram.commandHandler.resetZoom();
  };

  useEffect(() => {
    const $ = go.GraphObject.make;
    // Note: License key should be handled properly, removed for open source compliance if not available
    // go.Diagram.licenseKey = "YOUR_LICENSE_KEY"; 

    const myDiagram = $(go.Diagram, diagramRef.current as HTMLDivElement, {
      initialAutoScale: go.Diagram.Uniform, // Show all nodes by default (fit to screen)
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, // Enable zooming with mouse wheel
      layout: $(go.TreeLayout, {
        treeStyle: go.TreeLayout.StyleLastParents,
        arrangement: go.TreeLayout.ArrangementHorizontal,
        angle: 90,
        layerSpacing: 50,
        alternateAngle: 90,
        alternateLayerSpacing: 50,
        alternateAlignment: go.TreeLayout.AlignmentBus,
        alternateNodeSpacing: 30,
      }),
      "undoManager.isEnabled": true,
      "click": function (e) {
        const part = e.subject.part;
        if (part instanceof go.Node) {
          setSelectedMember(part.data);
        }
      }
    });

    // Define Colors based on Department Level or Type
    const getBrushColor = (dept: string) => {
      if (!dept) return isDark ? "#1e293b" : "#FFFFFF";
      if (dept.includes("Board")) return isDark ? "#6EC9C4" : "#16284F"; // Swapped or lightened for dark
      if (dept.includes("Executive Leadership")) return "#0C7C92";
      if (dept.includes("General Management")) return "#4F46E5";
      if (dept.includes("IT")) return "#8B5CF6";
      if (dept.includes("Construction")) return "#F59E0B";
      if (dept.includes("Corporate")) return "#10B981";
      if (dept.includes("Legal")) return "#EF4444";
      return isDark ? "#94a3b8" : "#64748B"; // Slate Default
    };

    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        cursor: "pointer",
        isShadowed: true,
        shadowOffset: new go.Point(0, 4),
        shadowBlur: 10,
        shadowColor: "rgba(0,0,0,0.15)",
        selectionAdorned: false,
        mouseEnter: (e, node: any) => {
          // Enhanced hover effect: Scale up simulation + Shadow
          node.diagram.model.setDataProperty(node.data, "highlight", true);
          node.isShadowed = true;
          node.shadowOffset = new go.Point(0, 12);
          node.shadowBlur = 20;
          node.shadowColor = "rgba(0,0,0,0.3)";

          // Subtle Scale animation (via binding)
          const shape = node.findObject("SHAPE");
          if (shape) shape.stroke = "#3b82f6"; // Blue border highlight

          // Programmatic Zoom-to-fit-node on Hover (Optional, subtle approach)
          // Note: Direct aggressive zooming on hover is UX-hostile. 
          // Instead, we focus on making the node 'pop'. 
        },
        mouseLeave: (e, node: any) => {
          node.diagram.model.setDataProperty(node.data, "highlight", false);
          node.isShadowed = true;
          node.shadowOffset = new go.Point(0, 4);
          node.shadowBlur = 10;
          node.shadowColor = "rgba(0,0,0,0.15)";

          const shape = node.findObject("SHAPE");
          if (shape) shape.stroke = null;
        }
      },
      // Animation binding for 'scale' property of the Node
      new go.Binding("scale", "highlight", (h) => h ? 1.1 : 1).makeTwoWay(),

      $(go.Shape, "RoundedRectangle",
        {
          name: "SHAPE",
          fill: isDark ? "#1e293b" : "#ffffff",
          strokeWidth: 0, // Default no border
          stroke: null,
          parameter1: 10, // Corner radius
        },
        new go.Binding("fill", "highlight", (h) => h ? (isDark ? "#334155" : "#F0FDFA") : (isDark ? "#1e293b" : "#ffffff"))
      ),
      $(
        go.Panel,
        "Vertical",
        { padding: 0 },

        // Header Strip
        $(go.Panel, "Auto",
          { stretch: go.GraphObject.Horizontal },
          $(go.Shape, "RoundedRectangle",
            {
              parameter1: 10,
              fill: "#16284F",
              strokeWidth: 0,
              height: 8 // Height of the top colored strip
            },
            new go.Binding("fill", "dept", (d) => getBrushColor(d))
          ),
          // Mask the bottom corners of the strip to be square so it sits on top like a header
          $(go.Shape, "Rectangle",
            {
              alignment: go.Spot.Bottom,
              height: 4,
              fill: "transparent",
              strokeWidth: 0
            }
          )
        ),

        $(
          go.Panel,
          "Table",
          {
            padding: new go.Margin(12, 16, 12, 16),
            defaultAlignment: go.Spot.Left,
            stretch: go.Stretch.Fill,
          },
          $(
            go.TextBlock,
            {
              row: 0,
              font: "bold 14px 'Inter', sans-serif",
              stroke: isDark ? "#f8fafc" : "#1e293b",
              wrap: go.TextBlock.WrapFit,
              width: 200,
              textAlign: "center",
              alignment: go.Spot.Center
            },
            new go.Binding("text", "title")
          ),
          $(
            go.Shape, "LineH",
            {
              row: 1,
              stroke: "#e2e8f0",
              strokeWidth: 1,
              height: 1,
              stretch: go.GraphObject.Horizontal,
              margin: new go.Margin(8, 0, 8, 0)
            }
          ),
          $(
            go.TextBlock,
            {
              row: 2,
              font: "500 12px 'Inter', sans-serif",
              stroke: isDark ? "#94a3b8" : "#64748b",
              wrap: go.TextBlock.WrapFit,
              width: 200,
              textAlign: "center",
              alignment: go.Spot.Center
            },
            new go.Binding("text", "name", (n) => n ? n : "Position Open")
          )
        )
      )
    );

    // Animation configuration
    myDiagram.animationManager.isEnabled = true;
    myDiagram.animationManager.duration = 400; // Smoother regular animations

    myDiagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.Orthogonal,
        corner: 20,
        selectable: false
      },
      $(go.Shape, { strokeWidth: 2, stroke: isDark ? "#475569" : "#cbd5e1" }), // Link Line
      $(go.Shape, { toArrow: "Standard", fill: isDark ? "#475569" : "#cbd5e1", stroke: null }) // Arrowhead
    );

    myDiagram.model = $(go.TreeModel, { nodeDataArray: teamData });
    setDiagram(myDiagram);

    // Listen for fullscreen chnage to update state if user presses ESC
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      myDiagram.div = null;
    };
  }, [teamData, setSelectedMember, isDark]);

  return (
    <div className={`relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-xl transition-all duration-300 group ${isFullScreen ? 'fixed inset-0 z-[100] h-screen w-screen rounded-none' : 'w-full max-w-[90vw] h-[75vh]'}`}>

      {/* Controls Toolbar */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-100 opacity-100 transition-opacity">
        <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 text-gray-700 rounded-md transition-colors" title="Zoom In">
          <FaPlus />
        </button>
        <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 text-gray-700 rounded-md transition-colors" title="Zoom Out">
          <FaMinus />
        </button>
        <button onClick={handleResetZoom} className="p-2 hover:bg-gray-100 text-gray-700 rounded-md transition-colors" title="Reset Zoom">
          <FaRedo />
        </button>
        <div className="w-full h-px bg-gray-200 my-1"></div>
        <button onClick={toggleFullScreen} className="p-2 hover:bg-blue-50 text-blue-600 rounded-md transition-colors" title="Toggle Fullscreen">
          {isFullScreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>

      <div
        ref={diagramRef}
        className="w-full h-full bg-slate-50"
        style={{ outline: "none" }}
      />

      {/* Legend / Info Overlay */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-gray-100 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#16284F]"></div> Board</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#0C7C92]"></div> Exec</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div> IT</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div> Const.</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#10B981]"></div> Corp.</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#EF4444]"></div> Legal</div>
        </div>
      </div>

    </div>
  );
};

export default GoJSWrapper;
