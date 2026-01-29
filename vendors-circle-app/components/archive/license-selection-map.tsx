"use client";

import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { ZoomIn, ZoomOut, RotateCcw, Info, CheckCircle2 } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface LicenseSelectionMapProps {
  selectedStates: string[];
  onStatesChange: (states: string[]) => void;
  title?: string;
  description?: string;
  maxSelections?: number;
}

export default function LicenseSelectionMap({ 
  selectedStates, 
  onStatesChange,
  title = "Select Your Licensed States",
  description = "Click on states where you hold active licenses",
  maxSelections
}: LicenseSelectionMapProps) {
  const [position, setPosition] = useState({ coordinates: [-97, 38], zoom: 1 });
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleStateClick = (stateCode: string) => {
    if (maxSelections && !selectedStates.includes(stateCode) && selectedStates.length >= maxSelections) {
      // Don't allow selecting more than max
      return;
    }
    
    if (selectedStates.includes(stateCode)) {
      // Deselect
      onStatesChange(selectedStates.filter(s => s !== stateCode));
    } else {
      // Select
      onStatesChange([...selectedStates, stateCode]);
    }
  };

  // Get color based on selection state
  const getStateColor = (stateCode: string) => {
    if (selectedStates.includes(stateCode)) {
      return "#2652B1"; // Blue for selected
    }
    return "#E5E7EB"; // Gray for unselected
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
    const isSelected = selectedStates.includes(stateCode);
    
    setTooltipContent(`${geo.properties.name}${isSelected ? ' ✓' : ''}`);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const handleClickGeo = (geo: any) => {
    const stateCode = geo.properties.name === "District of Columbia" ? "DC" : 
                     stateCodeMap[geo.properties.name] || "";
    handleStateClick(stateCode);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <div className="group relative">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                {description}. Click again to deselect.
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
        
        {/* Selection Counter */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>
            {selectedStates.length} state{selectedStates.length !== 1 ? 's' : ''} selected
            {maxSelections && ` (max ${maxSelections})`}
          </span>
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
                  const isSelected = selectedStates.includes(stateCode);
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getStateColor(stateCode)}
                      stroke={isSelected ? "#1d3f8f" : "#FFFFFF"}
                      strokeWidth={isSelected ? 2 : 0.5}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          fill: isSelected ? "#1d3f8f" : "#60A5FA",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseMove={(e) => handleMouseMove(e, geo)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClickGeo(geo)}
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
            License Status
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#2652B1" }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#E5E7EB" }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Not Licensed</span>
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
              <div className="text-xs text-gray-400 mt-0.5">Click to toggle</div>
            </div>
          </div>
        )}
      </div>

      {/* Selected States List */}
      {selectedStates.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex flex-wrap gap-2">
            {selectedStates.sort().map((stateCode) => (
              <div
                key={stateCode}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-full text-sm font-medium"
              >
                <span>{stateCode}</span>
                <button
                  onClick={() => handleStateClick(stateCode)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${stateCode}`}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
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
