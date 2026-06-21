

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useBalance } from "../COMPONENTS/BalanceContext";
import {
  CreditCard,
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Plus,
  Copy,
  AlertCircle,
  Download,
} from "lucide-react";

const Cards = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useBalance();
  const [showCardNumbers, setShowCardNumbers] = useState({});

  // Get the user's name dynamically
  const cardHolderName = user?.full_name || user?.username || "Card Holder";

  const cards = [
    {
      id: 1,
      type: "Visa",
      last4: "4456",
      expiry: "09/26",
      color: "bg-gradient-to-r from-green-600 to-emerald-600",
      holder: cardHolderName,
      status: "active",
      limit: "$30,000",
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8923",
      expiry: "12/25",
      color: "bg-gradient-to-r from-emerald-600 to-teal-600",
      holder: cardHolderName,
      status: "active",
      limit: "$50,000",
    },
  ];

  const toggleCardNumber = (id) => {
    setShowCardNumbers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleFreeze = (id) => {
    alert(`Card ${id} frozen/unfrozen`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Cards</h1>
        </div>

        {/* Add New Card Button */}
        <button
          onClick={() => alert("Request new card")}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6 flex items-center justify-center gap-3 group"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-semibold">Request New Card</span>
        </button>

        {/* Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${card.color} text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}
            >
              {/* Background Decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                {/* Card Type & Status */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm opacity-80">{card.type}</p>
                    <p className="text-xs opacity-60 mt-1">{card.holder}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${card.status === 'active' ? 'bg-green-400/30' : 'bg-red-400/30'}`}>
                    {card.status === 'active' ? 'Active' : 'Frozen'}
                  </div>
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-mono tracking-widest">
                      **** **** **** {card.last4}
                    </p>
                    <button
                      onClick={() => toggleCardNumber(card.id)}
                      className="p-1 hover:bg-white/20 rounded-full transition"
                    >
                      {showCardNumbers[card.id] ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expiry & Limit */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs opacity-60">Expires</p>
                    <p className="font-semibold">{card.expiry}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-60">Limit</p>
                    <p className="font-semibold">{card.limit}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-60">CVV</p>
                    <p className="font-semibold">•••</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => toggleFreeze(card.id)}
                    className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                  >
                    {card.status === 'active' ? (
                      <>
                        <Lock size={16} /> Freeze
                      </>
                    ) : (
                      <>
                        <Unlock size={16} /> Unfreeze
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => alert("View card details")}
                    className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                  >
                    <Copy size={16} /> Details
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => alert("Download statement")}
                    className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1"
                  >
                    <Download size={14} /> Statement
                  </button>
                  <button
                    onClick={() => alert("Report lost/stolen")}
                    className="flex-1 bg-red-500/30 hover:bg-red-500/40 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1"
                  >
                    <AlertCircle size={14} /> Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;