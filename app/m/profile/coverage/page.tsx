"use client";

import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";

export default function CoverageAreasPage() {
  const [coverageAreas] = useState([
    { state: "FL", stateName: "Florida", counties: ["Hillsborough", "Pinellas", "Pasco", "Polk", "Manatee", "Sarasota", "Lee", "Collier"] },
    { state: "GA", stateName: "Georgia", counties: ["Fulton", "DeKalb", "Cobb", "Gwinnett", "Clayton"] },
    { state: "AL", stateName: "Alabama", counties: ["Jefferson", "Mobile", "Madison"] },
    { state: "SC", stateName: "South Carolina", counties: ["Charleston", "Greenville"] },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 space-y-3">
        {coverageAreas.map((area) => (
          <div
            key={area.state}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {area.stateName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {area.counties.length} counties
                </p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {area.counties.slice(0, 3).map((county) => (
                <span
                  key={county}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                >
                  {county}
                </span>
              ))}
              {area.counties.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  +{area.counties.length - 3} more
                </span>
              )}
            </div>
          </div>
        ))}
        
        <button className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add Coverage Area
        </button>
      </div>
    </div>
  );
}
