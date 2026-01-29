"use client";

import { Building2, Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export default function ConnectedBanksPage() {
  const banks = [
    { id: "1", name: "Finance Bank", logo: "/logos/banks/generic-bank-logo.svg", connected: "Jan 2024", scope: "Commercial", region: "Tampa, FL" },
    { id: "2", name: "Capital One", logo: "/logos/banks/32px-Capital_One_logo.svg.png", connected: "Mar 2024", scope: "Residential", region: "Orlando, FL" },
    { id: "3", name: "Wells Fargo", logo: "/logos/banks/generic-bank-logo.svg", connected: "Jun 2024", scope: "Multi-Family", region: "Miami, FL" },
    { id: "4", name: "Bank of America", logo: "/logos/banks/generic-bank-logo.svg", connected: "Aug 2024", scope: "Commercial", region: "Jacksonville, FL" },
    { id: "5", name: "Chase Bank", logo: "/logos/banks/generic-bank-logo.svg", connected: "Oct 2024", scope: "Residential", region: "Atlanta, GA" },
    { id: "6", name: "TD Bank", logo: "/logos/banks/32px-TD_Bank.svg.png", connected: "Nov 2024", scope: "Land", region: "Savannah, GA" },
    { id: "7", name: "PNC Bank", logo: "/logos/banks/generic-bank-logo.svg", connected: "Dec 2024", scope: "Commercial", region: "Birmingham, AL" },
    { id: "8", name: "SunTrust", logo: "/logos/banks/64px-SunTrust_Banks_logo.svg.png", connected: "Dec 2024", scope: "Residential", region: "Columbia, SC" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 space-y-3">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0 p-1.5">
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {bank.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Connected {bank.connected}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Building2 className="w-4 h-4" />
                <span>{bank.scope}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{bank.region}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
