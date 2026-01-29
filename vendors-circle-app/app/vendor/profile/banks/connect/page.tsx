"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Building2, Check } from "lucide-react";

export default function ConnectBankPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  // Mock bank list
  const banks = [
    {
      id: "bank-001",
      name: "First National Bank",
      logo: "/logos/banks/generic-bank-logo.svg",
      departments: ["Residential Lending", "Commercial Lending", "Private Banking"],
    },
    {
      id: "bank-002",
      name: "Capital One",
      logo: "/logos/banks/32px-Capital_One_logo.svg.png",
      departments: ["Mortgage", "Home Loans", "Refinancing"],
    },
    {
      id: "bank-003",
      name: "TD Bank",
      logo: "/logos/banks/32px-TD_Bank.svg.png",
      departments: ["Mortgage Services", "Commercial Real Estate"],
    },
  ];

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedBankData = banks.find((b) => b.id === selectedBank);

  const toggleDepartment = (dept: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleConnect = () => {
    console.log("Connecting to bank:", selectedBank, "departments:", selectedDepartments);
    router.push("/vendor/profile");
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <button
          onClick={() => router.push("/vendor/profile")}
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Connect to Bank
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Search and connect to banks you work with
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search banks..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Bank List */}
        {!selectedBank && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBanks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => setSelectedBank(bank.id)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-all border-2 border-transparent hover:border-primary"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {bank.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {bank.departments.length} departments
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Department Selection */}
        {selectedBank && selectedBankData && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select Departments
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Choose which departments at {selectedBankData.name} you want to connect with:
              </p>
              <div className="space-y-2">
                {selectedBankData.departments.map((dept) => (
                  <label
                    key={dept}
                    className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDepartments.includes(dept)}
                      onChange={() => toggleDepartment(dept)}
                      className="w-5 h-5 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-gray-900 dark:text-white font-medium">{dept}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedBank(null)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Back
              </button>
              <button
                onClick={handleConnect}
                disabled={selectedDepartments.length === 0}
                className="flex-1 px-6 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
