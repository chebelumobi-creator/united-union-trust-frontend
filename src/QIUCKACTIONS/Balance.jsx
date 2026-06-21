import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Eye, EyeOff, TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useBalance } from "../COMPONENTS/BalanceContext";
import { getHistory } from "../api";

export default function Balance() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { balance, user } = useBalance();
  const [showBalance, setShowBalance] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getHistory();
        const transactions = res.data;

        const spent = transactions
          .filter((t) => t.transaction_type === "transfer" || t.transaction_type === "withdrawal")
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const received = transactions
          .filter((t) => t.transaction_type === "deposit")
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        setTotalSpent(spent);
        setTotalReceived(received);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} className="text-indigo-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('balancePage.title')}</h1>
        </div>

        {/* Main Balance Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 shadow-xl mb-6 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-200 text-sm">{t('balancePage.totalBalance')}</p>
              <div className="flex items-center gap-3 mt-2">
                <h2 className="text-3xl font-bold text-white">
                  {showBalance ? `$${balance.toLocaleString()}.00 USD` : "••••••••"}
                </h2>
                <button onClick={() => setShowBalance(!showBalance)} className="text-indigo-200 hover:text-white">
                  {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={18} className="text-green-500" />
              <p className="text-xs text-gray-500">{t('balancePage.totalDeposited')}</p>
            </div>
            <p className="text-xl font-bold text-green-600">${totalReceived.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={18} className="text-red-500" />
              <p className="text-xs text-gray-500">{t('balancePage.totalSpent')}</p>
            </div>
            <p className="text-xl font-bold text-red-600">${totalSpent.toLocaleString()}</p>
          </div>
        </div>

        {/* Account Info */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{t('balancePage.yourAccount')}</h2>
        <div className="bg-white rounded-xl p-4 shadow-md flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CreditCard size={20} className="text-blue-500" />
            <div>
              <p className="font-semibold text-gray-800">{user?.username?.toUpperCase() || "---"}</p>
              <p className="text-xs text-gray-400">**** {user?.account_number?.slice(-4) || "----"}</p>
            </div>
          </div>
          <p className="font-bold text-gray-800">${balance.toLocaleString()}.00</p>
        </div>
      </div>
    </div>
  );
}