"use client";

import { Plus } from "lucide-react";

interface MobileFloatingActionButtonProps {
  onClick: () => void;
  label?: string;
}

export default function MobileFloatingActionButton({
  onClick,
  label = "Add",
}: MobileFloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 transition-all hover:scale-110 active:scale-95 z-40 md:hidden flex items-center justify-center"
      aria-label={label}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
