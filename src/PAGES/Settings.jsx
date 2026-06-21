import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Lock,
  Key,
  Shield,
  Fingerprint,
  Monitor,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Share2,
  User,
  Mail,
  Phone,
  Smartphone,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

const Settings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // PIN Change State
  const [pinForm, setPinForm] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: ""
  });

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePinChange = (e) => {
    setPinForm({ ...pinForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinForm.newPin.length !== 4) {
      alert("PIN must be 4 digits!");
      return;
    }
    if (pinForm.newPin !== pinForm.confirmPin) {
      alert("PINs do not match!");
      return;
    }
    alert("Transaction PIN updated successfully!");
    setPinForm({ currentPin: "", newPin: "", confirmPin: "" });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone!")) {
      alert("Account deletion request submitted. We'll contact you shortly.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Settings</h1>
        </div>

        <div className="space-y-6">
          {/* ===== SECURITY SETTINGS ===== */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Shield className="text-green-600" size={24} />
              <h2 className="text-lg font-bold text-gray-800">Security Settings</h2>
            </div>

            {/* Change Password */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Key className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-700">Change Password</h3>
              </div>
              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Current Password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none pr-10"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none pr-10"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Update Transaction PIN */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="text-purple-600" size={20} />
                <h3 className="font-semibold text-gray-700">Update Transaction PIN</h3>
              </div>
              <form onSubmit={handlePinSubmit} className="space-y-3">
                <input
                  type={showPin ? "text" : "password"}
                  name="currentPin"
                  placeholder="Current PIN"
                  value={pinForm.currentPin}
                  onChange={handlePinChange}
                  maxLength={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
                <input
                  type={showPin ? "text" : "password"}
                  name="newPin"
                  placeholder="New PIN (4 digits)"
                  value={pinForm.newPin}
                  onChange={handlePinChange}
                  maxLength={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
                <input
                  type={showPin ? "text" : "password"}
                  name="confirmPin"
                  placeholder="Confirm New PIN"
                  value={pinForm.confirmPin}
                  onChange={handlePinChange}
                  maxLength={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm"
                >
                  Update PIN
                </button>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="text-green-600" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-700">Two-Factor Authentication (2FA)</h3>
                  <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                </div>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className="text-green-600"
              >
                {twoFactorEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-400" />}
              </button>
            </div>

            {/* Biometric Login */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Fingerprint className="text-indigo-600" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-700">Biometric Login</h3>
                  <p className="text-xs text-gray-500">Use Face ID or Fingerprint to login</p>
                </div>
              </div>
              <button
                onClick={() => setBiometricEnabled(!biometricEnabled)}
                className="text-indigo-600"
              >
                {biometricEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-400" />}
              </button>
            </div>

            {/* Active Sessions */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Monitor className="text-orange-600" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-700">Active Sessions</h3>
                  <p className="text-xs text-gray-500">Devices currently logged into your account</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Chrome on Windows</p>
                      <p className="text-xs text-gray-500">Current session • IP: 192.168.1.1</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Safari on iPhone</p>
                      <p className="text-xs text-gray-500">Last active: Dec 14, 2026 • IP: 192.168.1.2</p>
                    </div>
                  </div>
                  <button className="text-xs text-red-600 hover:text-red-700">Logout</button>
                </div>
              </div>
            </div>
          </div>

          {/* ===== PRIVACY SETTINGS ===== */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Shield className="text-purple-600" size={24} />
              <h2 className="text-lg font-bold text-gray-800">Privacy & Data</h2>
            </div>

            {/* Privacy Settings */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <User className="text-gray-600" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-700">Privacy Settings</h3>
                  <p className="text-xs text-gray-500">Control who can see your profile information</p>
                </div>
              </div>
              <div className="space-y-2 pl-9">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profile visibility</span>
                  <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 outline-none">
                    <option>Public</option>
                    <option selected>Friends Only</option>
                    <option>Private</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Show email address</span>
                  <button className="text-green-600">
                    <ToggleRight size={28} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Show phone number</span>
                  <button className="text-gray-400">
                    <ToggleLeft size={28} />
                  </button>
                </div>
              </div>
            </div>

            {/* Data Sharing Preferences */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Share2 className="text-blue-600" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-700">Data Sharing Preferences</h3>
                  <p className="text-xs text-gray-500">Control how your data is shared with third parties</p>
                </div>
              </div>
              <div className="space-y-2 pl-9">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Share data for analytics</span>
                  <button className="text-gray-400">
                    <ToggleLeft size={28} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Share data for marketing</span>
                  <button className="text-gray-400">
                    <ToggleLeft size={28} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Share data with partners</span>
                  <button className="text-gray-400">
                    <ToggleLeft size={28} />
                  </button>
                </div>
              </div>
            </div>

            {/* Download My Data */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Download className="text-green-600" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-700">Download My Data</h3>
                    <p className="text-xs text-gray-500">Export all your account data as a PDF or CSV file</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Your data is being prepared for download. You'll receive an email shortly.")}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                >
                  Download
                </button>
              </div>
            </div>

            {/* Delete Account */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trash2 className="text-red-600" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-700">Delete Account</h3>
                    <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
                  </div>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;