"use client";

import { useState } from "react";
import { Plus, Star, TrendingUp, TrendingDown } from "lucide-react";
import Modal from "@/components/modal";

export default function ScorecardsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [ratings, setRatings] = useState({
    quality: 0,
    timeliness: 0,
    communication: 0,
    professionalism: 0,
    compliance: 0,
  });
  const [comments, setComments] = useState("");

  const vendors = [
    {
      id: "vendor-001",
      name: "Tom Reynolds",
      avgRating: 4.7,
      totalReviews: 24,
      trend: "up",
      lastReview: "2026-01-10",
    },
    {
      id: "vendor-002",
      name: "Mike Chen",
      avgRating: 4.9,
      totalReviews: 31,
      trend: "up",
      lastReview: "2026-01-08",
    },
    {
      id: "vendor-003",
      name: "Lisa Rodriguez",
      avgRating: 4.5,
      totalReviews: 18,
      trend: "down",
      lastReview: "2025-12-28",
    },
  ];

  const handleSubmitRating = () => {
    console.log("Submitting rating:", { selectedVendor, ratings, comments });
    setShowAddModal(false);
    setRatings({ quality: 0, timeliness: 0, communication: 0, professionalism: 0, compliance: 0 });
    setComments("");
    setSelectedVendor(null);
  };

  const renderStars = (rating: number, interactive: boolean = false, onChange?: (value: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange && onChange(star)}
            disabled={!interactive}
            className={`${interactive ? "cursor-pointer hover:scale-110" : ""} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Vendor Scorecards
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Rate vendor performance and track history
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Rating
        </button>
      </div>

      {/* Vendors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {vendor.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {vendor.totalReviews} reviews
                </p>
              </div>
              <div className="flex items-center gap-1">
                {vendor.trend === "up" ? (
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {vendor.avgRating}
              </span>
              {renderStars(Math.round(vendor.avgRating))}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Last review: {new Date(vendor.lastReview).toLocaleDateString()}
            </div>

            <button
              onClick={() => {
                setSelectedVendor(vendor.id);
                setShowAddModal(true);
              }}
              className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Add New Rating
            </button>
          </div>
        ))}
      </div>

      {/* Add Rating Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add Vendor Rating"
          footer={
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRating}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Submit Rating
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            {!selectedVendor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Vendor
                </label>
                <select
                  value={selectedVendor || ""}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Choose a vendor</option>
                  {vendors.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quality of Work
              </label>
              {renderStars(ratings.quality, true, (value) =>
                setRatings((prev) => ({ ...prev, quality: value }))
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timeliness
              </label>
              {renderStars(ratings.timeliness, true, (value) =>
                setRatings((prev) => ({ ...prev, timeliness: value }))
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Communication
              </label>
              {renderStars(ratings.communication, true, (value) =>
                setRatings((prev) => ({ ...prev, communication: value }))
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Professionalism
              </label>
              {renderStars(ratings.professionalism, true, (value) =>
                setRatings((prev) => ({ ...prev, professionalism: value }))
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Compliance
              </label>
              {renderStars(ratings.compliance, true, (value) =>
                setRatings((prev) => ({ ...prev, compliance: value }))
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comments (Optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Add any additional feedback..."
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
