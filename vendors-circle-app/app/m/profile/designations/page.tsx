"use client";

import { useState } from "react";
import { Award, Plus, Trash2 } from "lucide-react";
import SwipeableCard from "@/components/mobile/swipeable-card";

export default function DesignationsPage() {
  const [designations] = useState([
    { id: "1", name: "MAI", fullName: "Member of Appraisal Institute", year: "2015" },
    { id: "2", name: "SRA", fullName: "Senior Residential Appraiser", year: "2012" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 space-y-3">
        {designations.map((designation) => (
          <SwipeableCard
            key={designation.id}
            rightActions={[
              {
                label: "Delete",
                icon: Trash2,
                color: "red",
                onClick: () => console.log("Delete", designation.id),
              },
            ]}
            className="rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {designation.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {designation.fullName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Since {designation.year}
                </p>
              </div>
            </div>
          </SwipeableCard>
        ))}
        
        <button className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add Designation
        </button>
      </div>
    </div>
  );
}
