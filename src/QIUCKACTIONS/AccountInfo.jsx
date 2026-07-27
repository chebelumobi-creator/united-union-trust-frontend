import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  User,
  CreditCard,
  Building2,
  Calendar,
  Fingerprint,
  Copy,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { useBalance } from "../COMPONENTS/BalanceContext";

export default function AccountInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useBalance();
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(user?.account_number || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get the user's display name (full name or username)
  const displayName = user?.full_name || user?.username || "---";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} className="text-blue-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {t("accountInfo.title")}
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              {user?.profile_photo ? (
                <img
                  //  src={`https://united-union-backend.onrender.com${user.profile_photo}`}
                  src={`http://127.0.0.1:8000${user.profile_photo}`}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-xl">
                  {displayName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">{displayName}</h2>
                <p className="text-blue-100 text-sm">{user?.email || "---"}</p>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="p-6 space-y-5">
            {/* Account Number */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-blue-500" />
                <div>
                  <p className="text-xs text-gray-400">
                    {t("accountInfo.accountNumber")}
                  </p>
                  <p className="font-mono font-semibold text-gray-800 text-lg">
                    {user?.account_number || t("accountInfo.notProvided")}
                  </p>
                </div>
              </div>
              <button
                onClick={copyAccountNumber}
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                {copied ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <Copy size={20} />
                )}
              </button>
            </div>

            {/* Bank Name */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <Building2 size={20} className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-400">{t("accountInfo.bank")}</p>
                <p className="font-semibold text-gray-800">
                  {t("accountInfo.bankName")}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <User size={20} className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-400">
                  {t("accountInfo.phone")}
                </p>
                <p className="font-semibold text-gray-800">
                  {user?.phone || t("accountInfo.notProvided")}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <Building2 size={20} className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-400">
                  {t("accountInfo.address")}
                </p>
                <p className="font-semibold text-gray-800">
                  {user?.address || t("accountInfo.notProvided")}
                </p>
              </div>
            </div>

            {/* Daily Limit */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <Fingerprint size={20} className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-400">
                  {t("accountInfo.dailyLimit")}
                </p>
                <p className="font-semibold text-gray-800">
                  $
                  {parseFloat(user?.daily_transfer_limit || 0).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Account Type */}
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-400">
                  {t("accountInfo.accountType")}
                </p>
                <p className="font-semibold text-gray-800">
                  {t("accountInfo.accountTypeValue")}
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="px-6 pb-6">
            <div
              className={`rounded-xl p-4 border ${
                user?.is_verified
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  user?.is_verified ? "text-green-700" : "text-yellow-700"
                }`}
              >
                {t("accountInfo.status")}:{" "}
                {user?.is_verified
                  ? t("accountInfo.active")
                  : t("accountInfo.inactive")}
              </p>
              {!user?.is_verified && (
                <p className="text-yellow-600 text-xs mt-1">
                  Please contact the customer service care to activate your
                  account
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}