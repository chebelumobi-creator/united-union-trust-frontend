import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, QrCode, Copy, CheckCircle, Banknote, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { depositMoney } from "../api";
import { useBalance } from "../COMPONENTS/BalanceContext";

export default function Deposit() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, fetchProfile } = useBalance();
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError(t('deposit.validAmount'));
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await depositMoney({ amount: parseFloat(amount) });
      await fetchProfile();
      setSuccess(res.data.message);
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.error || t('deposit.failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} className="text-green-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('deposit.title')}</h1>
        </div>

        <div className="space-y-4">
          {/* Quick Deposit */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-xl">
                <Banknote size={24} className="text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{t('deposit.quickDeposit')}</h2>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle size={16} />
                {success}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 mb-4 focus-within:ring-2 focus-within:ring-green-500">
              <span className="text-gray-500 font-semibold mr-2">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 outline-none text-lg font-semibold"
              />
            </div>

            <button
              onClick={handleDeposit}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : t('deposit.depositNow')}
            </button>
          </div>

          {/* Bank Transfer Method */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-xl">
                <Banknote size={24} className="text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{t('deposit.bankTransfer')}</h2>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">{t('deposit.bankName')}</p>
                <p className="font-semibold text-gray-800">{t('deposit.bankNameValue')}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">{t('deposit.accountName')}</p>
                <p className="font-semibold text-gray-800">{user?.username?.toUpperCase() || "---"}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">{t('deposit.accountNumber')}</p>
                  <p className="font-mono font-semibold text-gray-800 text-lg">
                    {user?.account_number || "----------"}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(user?.account_number || "")}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  {copied ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3 border border-blue-200">
            <AlertCircle size={18} className="text-blue-500 mt-0.5" />
            <p className="text-xs text-blue-700">
              {t('deposit.infoNote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}