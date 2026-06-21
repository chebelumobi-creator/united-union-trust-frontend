import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Loader2
} from "lucide-react";
import { loginUser } from "../api";

function PinScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Clear fields on page load
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(t('pin.error'));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      navigate("/dashboard");
    } catch (err) {
      setError(t('pin.errorInvalid'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('pin.authenticating')}</h2>
          <p className="text-gray-600 mb-6">{t('pin.pleaseWait')}</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{t('pin.verifying')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Loader2 className="w-4 h-4 text-green-500 animate-spin" />
              <span>{t('pin.loadingDashboard')}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-8">
            {t('pin.secureConnection')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT PANEL */}
        <div className="md:w-1/2 bg-green-800 p-8 md:p-10 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
              {t('pin.title')}
            </h1>
            <p className="text-blue-100 mt-2 text-sm md:text-base">
              {t('pin.subtitle')}
            </p>
          </div>
          <div className="my-8 md:my-12">
            <div className="space-y-4">
              {[
                { icon: CheckCircle, textKey: "pin.features.secure" },
                { icon: Zap, textKey: "pin.features.fast" },
                { icon: Globe, textKey: "pin.features.global" },
                { icon: Smartphone, textKey: "pin.features.mobile" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-green-300" />
                  <span className="text-sm md:text-base">{t(item.textKey)}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-blue-200/70 mt-4">• Secure • Fast • Reliable</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:w-1/2 p-8 md:p-10 bg-white">
          <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('pin.welcomeBack')}</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('pin.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                placeholder={t('pin.emailPlaceholder')}
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('pin.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                placeholder={t('pin.passwordPlaceholder')}
                autoComplete="off"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                {t('pin.staySignedIn')}
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {t('pin.signIn')} <ArrowRight className="w-5 h-5" />
            </button>

            <div className="text-center mt-6">
              <a href="/register" className="text-sm text-green-600 hover:underline">
                {t('pin.noAccount')}
              </a>
            </div>

            <p className="text-xs text-gray-400 text-center mt-8">
              {t('pin.agreement')}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PinScreen;