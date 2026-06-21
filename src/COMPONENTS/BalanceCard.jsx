import { useBalance } from "../COMPONENTS/BalanceContext";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, ArrowUpRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BalanceCard() {
  const { t } = useTranslation();
  const [time, setTime] = useState(new Date());
  const [showBalance, setShowBalance] = useState(true);
  const { balance, user } = useBalance();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
// TOP UP NAVIGATION
  const navigate = useNavigate();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('balance.goodMorning');
    if (hour < 18) return t('balance.goodAfternoon');
    return t('balance.goodEvening');
  };

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get display name (full name or username)
  const displayName = user?.full_name || user?.username || "USER";

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-3xl shadow-lg">
      {/* Header section with profile and time */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {user?.profile_photo ? (
            <img
              src={`http://127.0.0.1:8000${user.profile_photo}`}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-xl">
              {displayName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div>
            <p className="text-sm opacity-80">{greeting()}</p>
            <p className="font-semibold text-lg">{displayName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{formattedTime}</p>
          <p className="text-sm opacity-80">{formattedDate}</p>
        </div>
      </div>

      {/* Balance section */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <p className="text-lg">{t('balance.availableBalance')}</p>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        <h5 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
          {showBalance ? `$${balance.toLocaleString()}.00 USD` : "••••••"}
        </h5>
      </div>

      {/* Light blue container */}
      <div className="mt-6 bg-blue-400/30 backdrop-blur-sm rounded-2xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">{t('balance.yourAccountNumber')}</p>
            <p className="font-semibold text-lg">{user?.account_number || "----------"}</p>
          </div>
          <div className={`px-3 py-1 rounded-full ${user?.is_verified ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <p className={`text-sm font-medium ${user?.is_verified ? 'text-green-200' : 'text-red-200'}`}>
              {user?.is_verified ? t('balance.active') : t('balance.inactive')}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <button onClick={() => navigate("/history")} className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/30 transition">
            <ArrowUpRight size={20} />
            <span className="font-medium px-3">{t('balance.transactions')}</span>
          </button>
          <button  onClick={() => navigate("/deposit")} className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/30 transition">
            <Plus size={20} />
            <span className="font-medium">{t('balance.topUp')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}