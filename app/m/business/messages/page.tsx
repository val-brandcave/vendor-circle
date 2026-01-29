"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MobileMessagesPage() {
  const router = useRouter();
  const [view, setView] = useState<"list" | "thread">("list");
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: "conv-001",
      name: "Mike Chen",
      lastMessage: "Thanks for the update",
      timestamp: "2026-01-13T14:30:00",
      unreadCount: 2,
    },
    {
      id: "conv-002",
      name: "Lisa Rodriguez",
      lastMessage: "Can you review my areas?",
      timestamp: "2026-01-12T11:20:00",
      unreadCount: 0,
    },
  ];

  const messages = [
    {
      id: "msg-001",
      content: "Hi Sarah, I updated my license",
      timestamp: "2026-01-13T14:25:00",
      isOwn: false,
    },
    {
      id: "msg-002",
      content: "Great! I can see it now",
      timestamp: "2026-01-13T14:28:00",
      isOwn: true,
    },
  ];

  if (view === "thread") {
    return (
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        {/* Thread Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("list")}
              className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <span className="font-semibold text-blue-600 dark:text-blue-400">MC</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">Mike Chen</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Appraiser</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.isOwn
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-full focus:ring-2 focus:ring-primary focus:outline-none text-gray-900 dark:text-white"
            />
            <button
              disabled={!newMessage.trim()}
              className="p-3 bg-primary text-white rounded-full disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h1>
      </div>

      {/* Conversations */}
      <div className="p-4 space-y-3">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => {
              setSelectedConv(conv.id);
              setView("thread");
            }}
            className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {conv.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{conv.name}</p>
                  {conv.unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {conv.lastMessage}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {new Date(conv.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
