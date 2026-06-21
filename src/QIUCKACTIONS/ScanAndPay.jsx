import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, QrCode, Camera, Upload, X, CheckCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useBalance } from "../COMPONENTS/BalanceContext";

export default function ScanAndPay() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { balance } = useBalance();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      setMerchant(t('scanAndPay.merchantName'));
    }, 2000);
  };

  const handlePay = () => {
    if (parseFloat(amount) > balance) {
      alert(t('scanAndPay.insufficientBalance'));
      return;
    }
    alert(t('scanAndPay.paymentInitiated', { amount, merchant }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} className="text-purple-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('scanAndPay.title')}</h1>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <p className="text-sm text-gray-500">{t('scanAndPay.availableBalance')}</p>
          <p className="text-xl font-bold text-gray-800">${balance.toLocaleString()}.00 USD</p>
        </div>

        {!scanned ? (
          <div className="space-y-4">
            {/* QR Scanner */}
            <div
              className="bg-gray-900 rounded-3xl p-8 text-center cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
              onClick={startScan}
            >
              {scanning ? (
                <div className="animate-pulse">
                  <div className="w-48 h-48 mx-auto border-2 border-white rounded-2xl flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 rounded-xl animate-ping"></div>
                  </div>
                  <p className="text-white mt-4">{t('scanAndPay.scanning')}</p>
                </div>
              ) : (
                <div>
                  <div className="w-48 h-48 mx-auto bg-white/10 rounded-2xl flex items-center justify-center">
                    <Camera size={64} className="text-white" />
                  </div>
                  <p className="text-white mt-4 font-medium">{t('scanAndPay.tapToScan')}</p>
                  <p className="text-gray-400 text-sm mt-2">{t('scanAndPay.positionQR')}</p>
                </div>
              )}
            </div>

            {/* Upload Option */}
            <div className="bg-white rounded-2xl p-4 shadow-md flex items-center justify-between cursor-pointer hover:shadow-lg transition-all">
              <div className="flex items-center gap-3">
                <Upload size={20} className="text-purple-500" />
                <span className="font-medium text-gray-700">{t('scanAndPay.uploadQR')}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        ) : (
          <div>
            {/* Merchant Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t('scanAndPay.merchant')}</p>
                    <p className="font-bold text-gray-800 text-lg">{merchant}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setScanned(false); setAmount(""); }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">{t('scanAndPay.enterAmount')}</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-xl font-semibold"
                />
              </div>

              <button
                onClick={handlePay}
                disabled={!amount || parseFloat(amount) <= 0}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  amount && parseFloat(amount) > 0
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {t('scanAndPay.pay')} ${amount || "0.00"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}