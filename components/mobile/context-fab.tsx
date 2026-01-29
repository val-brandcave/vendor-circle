"use client";

import { Plus } from "lucide-react";

interface ContextFabProps {
  onClick: () => void;
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export default function ContextFab({
  onClick,
  label = "Add",
  icon: Icon = Plus,
  className = "",
}: ContextFabProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-20 right-4 z-40 w-14 h-14 bg-primary hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${className}`}
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}
