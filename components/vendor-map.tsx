"use client";

import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { ZoomIn, ZoomOut, RotateCcw, Info } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface VendorMapProps {
  vendors: Array<{
    id: string;
    states: string[];
  }>;
  selectedState: string;
  onStateClick: (stateCode: string) => void;
}

export default function VendorMap({ vendors, selectedState, onStateClick }: VendorMapProps) {
  const [position, setPosition] = useState({ coordinates: [-97, 38], zoom: 1 });
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Calculate vendor count per state
  const vendorCountByState = useMemo(() => {
    const counts: Record<string, number> = {};
    vendors.forEach(vendor => {
      vendor.states.forEach(state => {
        counts[state] = (counts[state] || 0) + 1;
      });
    });
    return counts;
  }, [vendors]);

  // Get color based on vendor count
  const getStateColor = (stateCode: string) => {
    const count = vendorCountByState[stateCode] || 0;
    
    // Selected state gets blue border/highlight
    if (stateCode === selectedState && count > 0) {
      return "#3B82F6"; // Blue for selected
    }
    
    // Color scale: gray for 0, darker greens for 1+
    if (count === 0) return "#E5E7EB"; // Gray
    if (count <= 2) return "#86EFAC"; // Medium-light green (darker than before)
    if (count <= 5) return "#4ADE80"; // Medium green (darker)
    if (count <= 10) return "#22C55E"; // Strong green (darker)
    return "#16A34A"; // Deep green (darker)
  };

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [-97, 38], zoom: 1 });
  };

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>, geo: any) => {
    const stateCode = geo.properties.name === "District of Columbia" ? "DC" : 
                     stateCodeMap[geo.properties.name] || "";
    const count = vendorCountByState[stateCode] || 0;
    
    if (count > 0) {
      setTooltipContent(`${geo.properties.name} • ${count} vendor${count !== 1 ? 's' : ''}`);
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const handleStateClick = (geo: any) => {
    const stateCode = geo.properties.name === "District of Columbia" ? "DC" : 
                     stateCodeMap[geo.properties.name] || "";
    const count = vendorCountByState[stateCode] || 0;
    
    if (count > 0) {
      onStateClick(stateCode);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Vendor Distribution by State
          </h2>
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
              Hover over states to see vendor counts. Click a state to filter the table below.
            </div>
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            disabled={position.zoom >= 4}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            disabled={position.zoom <= 1}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Reset view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gray-50 dark:bg-gray-900" style={{ height: "450px" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          className="w-full h-full"
          projectionConfig={{
            scale: 1000,
          }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates as [number, number]}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateCode = geo.properties.name === "District of Columbia" ? "DC" : 
                                   stateCodeMap[geo.properties.name] || "";
                  const count = vendorCountByState[stateCode] || 0;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getStateColor(stateCode)}
                      stroke={stateCode === selectedState && count > 0 ? "#2563EB" : "#FFFFFF"}
                      strokeWidth={stateCode === selectedState && count > 0 ? 2 : 0.5}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          fill: count > 0 ? "#F59E0B" : "#E5E7EB",
                          outline: "none",
                          cursor: count > 0 ? "pointer" : "default",
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseMove={(e) => handleMouseMove(e, geo)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleStateClick(geo)}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
            Vendors per State
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#E5E7EB" }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">0</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#86EFAC" }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">1-2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#4ADE80" }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">3-5</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#22C55E" }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">6-10</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#16A34A" }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">10+</span>
            </div>
          </div>
        </div>

        {/* Tooltip */}
        {tooltipContent && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${tooltipPosition.x + 10}px`,
              top: `${tooltipPosition.y - 10}px`,
            }}
          >
            <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-xl">
              {tooltipContent}
              <div className="text-xs text-gray-400 mt-0.5">Click to filter</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// State name to state code mapping
const stateCodeMap: Record<string, string> = {
  "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
  "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE",
  "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
  "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
  "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
  "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
  "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
  "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT",
  "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV",
  "Wisconsin": "WI", "Wyoming": "WY"
};
