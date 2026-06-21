import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Banknote, CreditCard, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { withdrawMoney } from "../api";
import { useBalance } from "../COMPONENTS/BalanceContext";

export default function Withdraw() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { balance, fetchProfile } = useBalance();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError(t('withdraw.validAmount'));
      return;
    }
    if (parseFloat(amount) > balance) {
      setError(t('withdraw.insufficientBalance'));
      return;
    }
    setError("");
    setShowPinInput(true);
  };

  const handleWithdraw = async () => {
    if (pin.length !== 4) {
      setError(t('withdraw.pinLength'));
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await withdrawMoney({ amount: parseFloat(amount), pin });
      await fetchProfile();
      setSuccess(res.data.message);
      setAmount("");
      setPin("");
      setShowPinInput(false);
    } catch (err) {
      setError(err.response?.data?.error || t('withdraw.failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} className="text-red-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('withdraw.title')}</h1>
        </div>

        {/* Balance Display */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
          <p className="text-sm text-gray-500">{t('withdraw.availableBalance')}</p>
          <p className="text-2xl font-bold text-gray-800">${balance.toLocaleString()}.00 USD</p>
        </div>

        {success && (
          <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-200 mb-4">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-700">{t('withdraw.successTitle')}</h3>
            <p className="text-green-600 text-sm mt-2">{success}</p>
          </div>
        )}

        {!success && (
          <div className="space-y-4">
            {/* Amount Input */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <label className="text-sm font-medium text-gray-700 block mb-2">{t('withdraw.amountToWithdraw')}</label>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-red-500">
                <span className="text-gray-500 font-semibold mr-2">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 outline-none text-lg font-semibold"
                  disabled={showPinInput}
                />
              </div>
              <button
                onClick={() => setAmount(balance.toString())}
                className="text-xs text-red-500 mt-2 hover:underline"
              >
                {t('withdraw.max')}: ${balance.toLocaleString()}
              </button>
            </div>

            {/* Withdrawal Method */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <p className="text-sm font-medium text-gray-700 mb-3">{t('withdraw.withdrawalMethod')}</p>
              <div className="space-y-2">
                <button
                  onClick={() => setMethod("bank")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    method === "bank" ? "border-red-500 bg-red-50" : "border-gray-200"
                  }`}
                >
                  <Banknote size={20} className={method === "bank" ? "text-red-500" : "text-gray-500"} />
                  <span className="font-medium">{t('withdraw.bankTransfer')}</span>
                </button>
                <button
                  onClick={() => setMethod("card")}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    method === "card" ? "border-red-500 bg-red-50" : "border-gray-200"
                  }`}
                >
                  <CreditCard size={20} className={method === "card" ? "text-red-500" : "text-gray-500"} />
                  <span className="font-medium">{t('withdraw.cardWithdrawal')}</span>
                </button>
              </div>
            </div>

            {/* PIN Input */}
            {showPinInput && (
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <label className="text-sm font-medium text-gray-700 block mb-2">{t('withdraw.enterPin')}</label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Info Note */}
            <div className="bg-yellow-50 rounded-xl p-4 flex items-start gap-3 border border-yellow-200">
              <AlertCircle size={18} className="text-yellow-600 mt-0.5" />
              <div>
                <p className="text-xs text-yellow-700 font-medium">{t('withdraw.processingTime')}</p>
                <p className="text-xs text-yellow-600 mt-1">{t('withdraw.withdrawalFee')}</p>
              </div>
            </div>

            {/* Button */}
            {!showPinInput ? (
              <button
                onClick={handleContinue}
                className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md hover:shadow-lg"
              >
                {t('withdraw.continue')}
              </button>
            ) : (
              <button
                onClick={handleWithdraw}
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : t('withdraw.confirmWithdrawal')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}