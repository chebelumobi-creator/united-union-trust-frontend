import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Plus,
  Calendar,
  CheckCircle,
  AlertCircle,
  Zap,
  Wifi,
  Phone,
  Droplet,
  Home,
  Tv,
  CreditCard,
  MoreHorizontal,
  Clock,
  Search
} from "lucide-react";

const Payments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("unpaid");
  const [searchTerm, setSearchTerm] = useState("");

  const bills = [
    {
      id: 1,
      name: "Electricity",
      icon: Zap,
      color: "bg-yellow-500",
      amount: "$125.00",
      dueDate: "Dec 15, 2026",
      status: "unpaid",
    },
    {
      id: 2,
      name: "Internet",
      icon: Wifi,
      color: "bg-blue-500",
      amount: "$89.99",
      dueDate: "Dec 18, 2026",
      status: "unpaid",
    },
    {
      id: 3,
      name: "Mobile Phone",
      icon: Phone,
      color: "bg-green-500",
      amount: "$65.00",
      dueDate: "Dec 20, 2026",
      status: "unpaid",
    },
    {
      id: 4,
      name: "Water",
      icon: Droplet,
      color: "bg-cyan-500",
      amount: "$45.50",
      dueDate: "Dec 10, 2026",
      status: "paid",
    },
    {
      id: 5,
      name: "Rent",
      icon: Home,
      color: "bg-purple-500",
      amount: "$1,200.00",
      dueDate: "Dec 1, 2026",
      status: "paid",
    },
    {
      id: 6,
      name: "Netflix",
      icon: Tv,
      color: "bg-red-500",
      amount: "$15.99",
      dueDate: "Dec 25, 2026",
      status: "unpaid",
    },
  ];

  const filteredBills = bills.filter(bill =>
    bill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unpaidBills = filteredBills.filter(bill => bill.status === "unpaid");
  const paidBills = filteredBills.filter(bill => bill.status === "paid");
  const displayedBills = activeTab === "unpaid" ? unpaidBills : paidBills;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-200 rounded-full transition"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payments</h1>
          </div>
          <button
            onClick={() => alert("Add new payment")}
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition flex items-center gap-2"
          >
            <Plus size={20} /> Add Payment
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
          />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-800">{bills.length}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-2xl font-bold text-yellow-600">{unpaidBills.length}</p>
            <p className="text-xs text-gray-500">Unpaid</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{paidBills.length}</p>
            <p className="text-xs text-gray-500">Paid</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab("unpaid")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "unpaid"
                ? "bg-green-600 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Unpaid ({unpaidBills.length})
          </button>
          <button
            onClick={() => setActiveTab("paid")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "paid"
                ? "bg-green-600 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Paid ({paidBills.length})
          </button>
        </div>

        {/* Payments List */}
        <div className="space-y-4">
          {displayedBills.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-500">No payments in this category</p>
            </div>
          ) : (
            displayedBills.map((bill) => (
              <div
                key={bill.id}
                className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`${bill.color} p-3 rounded-xl text-white`}>
                    <bill.icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{bill.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Calendar size={12} />
                      <span>Due: {bill.dueDate}</span>
                      {bill.status === "unpaid" && (
                        <span className="flex items-center gap-1 text-red-500">
                          <AlertCircle size={12} /> Overdue
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-gray-800">{bill.amount}</p>
                  {bill.status === "unpaid" ? (
                    <button
                      onClick={() => alert(`Pay ${bill.name} bill`)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                      <CheckCircle size={14} /> Paid
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;