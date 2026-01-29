"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

interface SnackbarProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number;
}

export default function Snackbar({ 
  message, 
  type = "success", 
  onClose, 
  duration = 3000 
}: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: "bg-green-500",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    error: {
      bg: "bg-red-500",
      icon: <XCircle className="w-5 h-5" />,
    },
    info: {
      bg: "bg-blue-500",
      icon: <Info className="w-5 h-5" />,
    },
    warning: {
      bg: "bg-yellow-500",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
  };

  const { bg, icon } = styles[type];

  return (
    <div
      className={`fixed top-4 right-4 ${bg} text-white px-6 py-4 rounded-lg shadow-2xl z-[100] flex items-center gap-3 min-w-[320px] animate-in slide-in-from-top-5 fade-in zoom-in-95 duration-300`}
    >
      {icon}
      <span className="flex-1 font-medium">{message}</span>
      <button
        onClick={onClose}
        className="hover:bg-white/20 rounded p-1 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

