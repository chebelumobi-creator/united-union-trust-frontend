
import { useBalance } from "../COMPONENTS/BalanceContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { domesticTransfer, wireTransfer } from "../api";
import { Loader2, ArrowLeft, Send, CheckCircle, Globe, Home, Shield } from "lucide-react";
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function SendMoney() {
  const { t } = useTranslation();
  const { balance, fetchProfile } = useBalance();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [transferType, setTransferType] = useState(null);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showVfnModal, setShowVfnModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [vfnCode, setVfnCode] = useState("");
  const [pendingTransaction, setPendingTransaction] = useState(null);
  const [otpId, setOtpId] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const [domesticForm, setDomesticForm] = useState({
    recipient_name: "",
    recipient_account: "",
    recipient_bank: "",
    amount: "",
  });

  const [wireForm, setWireForm] = useState({
    recipient_name: "",
    recipient_account: "",
    recipient_bank: "",
    amount: "",
    swift_code: "",
    recipient_email: "",
    country: "",
  });

  const getAuthHeaders = () => ({
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    }
  });

  const handleDomesticChange = (e) => {
    setDomesticForm({ ...domesticForm, [e.target.name]: e.target.value });
  };

  const handleWireChange = (e) => {
    setWireForm({ ...wireForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = transferType === 'domestic' ? domesticForm : wireForm;
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) {
      setError(t('sendMoney.invalidAmount'));
      return;
    }
    if (amount > balance) {
      setError(`${t('sendMoney.insufficientBalance')} $${balance.toLocaleString()}.00 USD`);
      return;
    }
    setError("");
    setShowPinModal(true);
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      setError(t('sendMoney.pinLength'));
      return;
    }
    setIsLoading(true);
    setError("");
    setShowPinModal(false);

    try {
      const form = transferType === 'domestic' ? domesticForm : wireForm;
      const apiCall = transferType === 'domestic' ? domesticTransfer : wireTransfer;

      const res = await apiCall({ ...form, pin });
      
      // CHECK IMF FIRST
      if (res.data.requires_imf) {
        setShowVfnModal(true);
        setIsLoading(false);
        return;
      }

      // CHECK OTP SECOND
      if (res.data.requires_otp) {
        setOtpId(res.data.otp_id);
        setTransactionId(res.data.transaction_id);
        setShowOtpModal(true);
        setIsLoading(false);
        return;
      }

      // CHECK PENDING APPROVAL
      if (res.data.status === 'pending') {
        setPendingTransaction(res.data);
        setIsLoading(false);
        return;
      }

      // SUCCESS - immediate transfer
      await fetchProfile();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const successState = {
        ...form,
        transfer_type: transferType,
        reference: res.data.transaction?.reference || res.data.reference,
        status: 'completed',
        manual_verification_required: res.data.manual_verification_required || false
      };
      
      if (res.data.equivalent_amount) {
        successState.equivalent_amount = res.data.equivalent_amount;
        successState.target_currency = res.data.target_currency;
        successState.currency_symbol = res.data.currency_symbol;
      }
      
      navigate("/success", { state: successState });
    } catch (err) {
      const msg = err.response?.data?.error || t('sendMoney.transferFailed');
      setError(msg);
      setIsLoading(false);
    }
  };

  const handleVfnSubmit = async () => {
    if (!vfnCode) {
      setError(t('sendMoney.enterImfCode'));
      return;
    }
    setIsLoading(true);
    setShowVfnModal(false);
    setError("");

    try {
      const form = transferType === 'domestic' ? domesticForm : wireForm;
      const apiCall = transferType === 'domestic' ? domesticTransfer : wireTransfer;

      const res = await apiCall({
        ...form,
        pin,
        imf_code: vfnCode
      });

      if (res.data.requires_otp) {
        setOtpId(res.data.otp_id);
        setTransactionId(res.data.transaction_id);
        setShowOtpModal(true);
        setIsLoading(false);
        return;
      }

      if (res.data.status === 'pending') {
        setPendingTransaction(res.data);
        setIsLoading(false);
        return;
      }

      await fetchProfile();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const successState = {
        ...form,
        transfer_type: transferType,
        reference: res.data.transaction?.reference || res.data.reference,
        status: 'completed',
        manual_verification_required: res.data.manual_verification_required || false
      };
      
      if (res.data.equivalent_amount) {
        successState.equivalent_amount = res.data.equivalent_amount;
        successState.target_currency = res.data.target_currency;
        successState.currency_symbol = res.data.currency_symbol;
      }
      
      navigate("/success", { state: successState });
    } catch (err) {
      const msg = err.response?.data?.error || t('sendMoney.transferFailed');
      setError(msg);
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setError(t('sendMoney.validOtp'));
      return;
    }
    setIsLoading(true);
    setShowOtpModal(false);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/verify-otp/`, {
        otp_id: otpId,
        otp_code: otpCode,
        transaction_id: transactionId
      }, getAuthHeaders());

      if (response.status === 200) {
        await fetchProfile();
        const form = transferType === 'domestic' ? domesticForm : wireForm;
        
        // ✅ UPDATED: Build success state with equivalent amount from OTP response
        const successState = {
          ...form,
          transfer_type: transferType,
          reference: response.data.transaction?.reference,
          status: 'completed',
          manual_verification_required: response.data.manual_verification_required || false
        };
        
        // Add equivalent amount if available
        if (response.data.equivalent_amount) {
          successState.equivalent_amount = response.data.equivalent_amount;
          successState.target_currency = response.data.target_currency;
          successState.currency_symbol = response.data.currency_symbol;
        }
        
        navigate("/success", { state: successState });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || t('sendMoney.invalidOtp');
      setError(errorMsg);
      setIsLoading(false);
      setShowOtpModal(true);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/resend-otp/`, {
        transaction_id: transactionId
      }, getAuthHeaders());

      if (response.status === 200) {
        setOtpId(response.data.otp_id);
        setError("");
        alert(t('sendMoney.newOtpGenerated'));
      }
    } catch (err) {
      setError(t('sendMoney.failedResend'));
    } finally {
      setIsLoading(false);
    }
  };

  // Pending approval screen
  if (pendingTransaction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 to-yellow-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-100 p-4 rounded-full">
              <Shield className="w-16 h-16 text-yellow-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('sendMoney.pendingApproval')}</h2>
          <p className="text-gray-600 mb-4">
            {t('sendMoney.pendingMessage')}
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-yellow-700">
              {t('sendMoney.reference')}: <span className="font-mono">{pendingTransaction.reference}</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {t('sendMoney.emailNotification')}
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 font-semibold"
          >
            {t('sendMoney.returnToDashboard')}
          </button>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Send className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('sendMoney.processingTransfer')}</h2>
          <p className="text-gray-600 mb-6">{t('sendMoney.pleaseWait')}</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{t('sendMoney.pinVerified')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Loader2 className="w-4 h-4 text-green-500 animate-spin" />
              <span>{t('sendMoney.processing')} {transferType === 'domestic' ? t('sendMoney.domestic') : t('sendMoney.wire')} {t('sendMoney.transfer')}...</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
              <span>{t('sendMoney.sendingEmail')}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-8">
            {t('sendMoney.secureConnection')}
          </p>
        </div>
      </div>
    );
  }

  // Transfer Type Selection Screen
  if (!transferType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate("/dashboard")} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold">{t('sendMoney.sendMoney')}</h2>
          </div>

          <div className="bg-green-50 p-3 rounded-xl mb-6">
            <p className="text-sm text-gray-500">{t('sendMoney.availableBalance')}</p>
            <p className="text-lg font-bold text-green-700">${balance.toLocaleString()}.00 USD</p>
          </div>

          <p className="text-gray-600 text-sm mb-4 text-center">{t('sendMoney.selectTransferType')}</p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTransferType('domestic')}
              className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 group"
            >
              <div className="bg-green-100 p-4 rounded-full group-hover:bg-green-200 transition-all">
                <Home className="text-green-600" size={32} />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-800">{t('sendMoney.domestic')}</p>
                <p className="font-bold text-gray-800">{t('sendMoney.transfer')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('sendMoney.domesticDesc')}</p>
              </div>
            </button>

            <button
              onClick={() => setTransferType('wire')}
              className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
            >
              <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-200 transition-all">
                <Globe className="text-blue-600" size={32} />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-800">{t('sendMoney.wire')}</p>
                <p className="font-bold text-gray-800">{t('sendMoney.transfer')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('sendMoney.wireDesc')}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      {/* IMF Modal */}
      {showVfnModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              padding: '1.5rem',
              width: '24rem',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              zIndex: 10000,
            }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{t('sendMoney.imfVerification')}</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              {t('sendMoney.enterImfCodeDesc')}
            </p>
            <input
              type="text"
              placeholder={t('sendMoney.enterImfCode')}
              value={vfnCode}
              onChange={(e) => setVfnCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-center text-lg tracking-wider focus:ring-2 focus:ring-purple-500 outline-none mb-4"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowVfnModal(false); setVfnCode(""); setError(""); setIsLoading(false); }}
                className="flex-1 border border-gray-300 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                {t('sendMoney.cancel')}
              </button>
              <button
                onClick={handleVfnSubmit}
                className="flex-1 bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
              >
                {t('sendMoney.verify')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              padding: '1.5rem',
              width: '24rem',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              zIndex: 10000,
            }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{t('sendMoney.otpVerification')}</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              {t('sendMoney.enterOtpDesc')}
            </p>
            <input
              type="text"
              maxLength={6}
              placeholder={t('sendMoney.enterOtp')}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowOtpModal(false); setOtpCode(""); setError(""); setIsLoading(false); }}
                className="flex-1 border border-gray-300 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                {t('sendMoney.cancel')}
              </button>
              <button
                onClick={handleOtpSubmit}
                className="flex-1 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
              >
                {t('sendMoney.verifyOtp')}
              </button>
            </div>
            <button
              onClick={handleResendOtp}
              className="w-full text-center text-sm text-blue-600 mt-3 hover:underline"
            >
              {t('sendMoney.resendOtp')}
            </button>
          </div>
        </div>
      )}

      {/* PIN Modal */}
      {showPinModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              padding: '1.5rem',
              width: '20rem',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              zIndex: 10000,
            }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{t('sendMoney.enterPin')}</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              {t('sendMoney.enterPinDesc')}
            </p>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-center text-2xl tracking-widest focus:ring-2 focus:ring-green-500 outline-none mb-4"
              placeholder="••••"
            />
            {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowPinModal(false); setPin(""); setError(""); }}
                className="flex-1 border border-gray-300 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                {t('sendMoney.cancel')}
              </button>
              <button
                onClick={handlePinSubmit}
                disabled={isLoading}
                className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t('sendMoney.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Transfer Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => setTransferType(null)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            {transferType === 'domestic' ? (
              <Home className="text-green-600" size={20} />
            ) : (
              <Globe className="text-blue-600" size={20} />
            )}
            <h2 className="text-xl font-bold">
              {transferType === 'domestic' ? t('sendMoney.domesticTransfer') : t('sendMoney.wireTransfer')}
            </h2>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-xl">
          <p className="text-sm text-gray-500">{t('sendMoney.availableBalance')}</p>
          <p className="text-lg font-bold text-green-700">${balance.toLocaleString()}.00 USD</p>
        </div>

        {error && !showPinModal && !showOtpModal && !showVfnModal && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Domestic Transfer Form */}
        {transferType === 'domestic' && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="recipient_name"
              placeholder={t('sendMoney.accountName')}
              value={domesticForm.recipient_name}
              onChange={handleDomesticChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              name="recipient_account"
              placeholder={t('sendMoney.accountNumber')}
              value={domesticForm.recipient_account}
              onChange={handleDomesticChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              name="recipient_bank"
              placeholder={t('sendMoney.bankName')}
              value={domesticForm.recipient_bank}
              onChange={handleDomesticChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              name="amount"
              type="number"
              placeholder={t('sendMoney.amountUsd')}
              value={domesticForm.amount}
              onChange={handleDomesticChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 font-semibold"
            >
              {t('sendMoney.continue')}
            </button>
          </form>
        )}

        {/* Wire Transfer Form */}
        {transferType === 'wire' && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="recipient_name"
              placeholder={t('sendMoney.accountName')}
              value={wireForm.recipient_name}
              onChange={handleWireChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="recipient_account"
              placeholder={t('sendMoney.accountNumber')}
              value={wireForm.recipient_account}
              onChange={handleWireChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="recipient_bank"
              placeholder={t('sendMoney.bankName')}
              value={wireForm.recipient_bank}
              onChange={handleWireChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="swift_code"
              placeholder={t('sendMoney.swiftCode')}
              value={wireForm.swift_code}
              onChange={handleWireChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="recipient_email"
              type="email"
              placeholder={t('sendMoney.recipientEmail')}
              value={wireForm.recipient_email}
              onChange={handleWireChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="country"
              placeholder={t('sendMoney.country')}
              value={wireForm.country}
              onChange={handleWireChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="amount"
              type="number"
              placeholder={t('sendMoney.amountUsd')}
              value={wireForm.amount}
              onChange={handleWireChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 font-semibold"
            >
              {t('sendMoney.continue')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SendMoney;