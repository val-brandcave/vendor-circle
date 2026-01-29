"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState([
    "Commercial",
    "Residential",
    "Multi-Family",
    "Land",
  ]);

  const availableSpecialties = [
    "Industrial",
    "Retail",
    "Agricultural",
    "Vacant Land",
  ];

  const handleRemove = (specialty: string) => {
    setSpecialties(specialties.filter(s => s !== specialty));
  };

  const handleAdd = (specialty: string) => {
    if (!specialties.includes(specialty)) {
      setSpecialties([...specialties, specialty]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4">
        {/* Current Specialties */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Your Specialties
          </h3>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-white"
              >
                {specialty}
                <button
                  onClick={() => handleRemove(specialty)}
                  className="hover:bg-primary-700 rounded-full p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Add More */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Add More
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableSpecialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => handleAdd(specialty)}
                disabled={specialties.includes(specialty)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  specialties.includes(specialty)
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
