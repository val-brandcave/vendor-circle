"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Crown, Zap } from "lucide-react";

export default function SubscriptionSettingsPage() {
  const router = useRouter();

  const currentPlan = {
    name: "Professional",
    price: 199,
    billingCycle: "monthly",
    features: [
      "Up to 10 team members",
      "Unlimited appraiser profiles",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
    ],
    nextBilling: "2026-02-13",
  };

  const plans = [
    {
      name: "Starter",
      price: 99,
      description: "Perfect for small offices",
      features: [
        "Up to 3 team members",
        "5 appraiser profiles",
        "Email support",
        "Basic analytics",
      ],
    },
    {
      name: "Professional",
      price: 199,
      description: "Most popular for growing businesses",
      features: [
        "Up to 10 team members",
        "Unlimited appraiser profiles",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
      ],
      current: true,
    },
    {
      name: "Enterprise",
      price: 499,
      description: "For large appraisal offices",
      features: [
        "Unlimited team members",
        "Unlimited appraiser profiles",
        "24/7 phone support",
        "Custom integrations",
        "Dedicated account manager",
        "API access",
      ],
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <button
        onClick={() => router.push("/business/settings")}
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Settings
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Subscription & Billing
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Manage your subscription plan and billing information
      </p>

      {/* Current Plan */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5" />
              <h2 className="text-xl font-bold">Current Plan</h2>
            </div>
            <p className="text-2xl font-bold mb-1">{currentPlan.name}</p>
            <p className="text-blue-100">
              ${currentPlan.price}/{currentPlan.billingCycle}
            </p>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
            Active
          </span>
        </div>
        <div className="mt-6 pt-6 border-t border-blue-400/30">
          <p className="text-sm text-blue-100">
            Next billing date:{" "}
            {new Date(currentPlan.nextBilling).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Available Plans */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Available Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border-2 ${
              plan.current
                ? "border-blue-500"
                : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            } transition-all`}
          >
            {plan.current && (
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
                <Check className="w-5 h-5" />
                <span className="text-sm font-semibold">Current Plan</span>
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {plan.name}
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              ${plan.price}
              <span className="text-lg text-gray-500 dark:text-gray-400">/mo</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {plan.description}
            </p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                plan.current
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-700 text-white"
              }`}
              disabled={plan.current}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
