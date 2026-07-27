import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Gift,
  UserPlus,
  CheckCircle,
  DollarSign,
  Copy,
  Link,
  Mail
} from "lucide-react";

// Custom Social Icons (since lucide-react doesn't export all of them)
const TwitterIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ClockIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ReferEarn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Simulated referral data
  const referralStats = {
    totalReferrals: 12,
    successfulReferrals: 8,
    pendingReferrals: 4,
    totalEarned: 120.00,
    referralCode: "UNION2026",
    shareLink: "https://uniteduniontrustbank.com/ref/UNION2026"
  };

  const referralHistory = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      date: "Dec 15, 2026",
      status: "completed",
      reward: "$10.00"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@email.com",
      date: "Dec 12, 2026",
      status: "completed",
      reward: "$10.00"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.d@email.com",
      date: "Dec 10, 2026",
      status: "pending",
      reward: "$10.00"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.w@email.com",
      date: "Dec 8, 2026",
      status: "completed",
      reward: "$10.00"
    },
    {
      id: 5,
      name: "Jessica Brown",
      email: "jessica.b@email.com",
      date: "Dec 5, 2026",
      status: "pending",
      reward: "$10.00"
    },
    {
      id: 6,
      name: "Robert Taylor",
      email: "robert.t@email.com",
      date: "Dec 1, 2026",
      status: "completed",
      reward: "$10.00"
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralStats.shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareOnSocial = (platform) => {
    const text = `Join United Union Trust Bank using my referral code ${referralStats.referralCode} and earn $10! 🚀`;
    const url = referralStats.shareLink;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=Join United Union Trust Bank&body=${encodeURIComponent(text + '\n\n' + url)}`,
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=500');
  };

  const getStatusBadge = (status) => {
    if (status === "completed") {
      return (
        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">
          <CheckCircle size={12} /> Completed
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-xs">
          <ClockIcon size={12} /> Pending
        </span>
      );
    }
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
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
              <Gift className="text-white" size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Refer & Earn</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <UserPlus className="text-blue-600" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{referralStats.totalReferrals}</p>
            <p className="text-xs text-gray-500">Total Referrals</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="text-green-600" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{referralStats.successfulReferrals}</p>
            <p className="text-xs text-gray-500">Successful</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-yellow-100 p-2 rounded-full">
                <ClockIcon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{referralStats.pendingReferrals}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-sm text-center text-white">
            <div className="flex justify-center mb-2">
              <div className="bg-white/20 p-2 rounded-full">
                <DollarSign className="text-white" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold">${referralStats.totalEarned.toFixed(2)}</p>
            <p className="text-xs text-white/80">Total Earned</p>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Your Referral Code</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-green-300">
                <p className="text-center text-2xl font-bold tracking-wider text-green-600">
                  {referralStats.referralCode}
                </p>
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition w-full md:w-auto justify-center"
            >
              {copied ? (
                <>
                  <CheckCircle size={18} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={18} /> Copy Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Share & Earn $10</h2>
          <p className="text-sm text-gray-500 mb-4">
            Share your referral link with friends and family. You'll earn $10 for each successful referral!
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => shareOnSocial("twitter")}
              className="flex items-center gap-2 bg-[#1DA1F2] text-white px-4 py-2 rounded-lg hover:opacity-80 transition text-sm"
            >
              <TwitterIcon size={18} /> Twitter
            </button>
            <button
              onClick={() => shareOnSocial("facebook")}
              className="flex items-center gap-2 bg-[#4267B2] text-white px-4 py-2 rounded-lg hover:opacity-80 transition text-sm"
            >
              <FacebookIcon size={18} /> Facebook
            </button>
            <button
              onClick={() => shareOnSocial("linkedin")}
              className="flex items-center gap-2 bg-[#0077B5] text-white px-4 py-2 rounded-lg hover:opacity-80 transition text-sm"
            >
              <LinkedInIcon size={18} /> LinkedIn
            </button>
            <button
              onClick={() => shareOnSocial("email")}
              className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:opacity-80 transition text-sm"
            >
              <Mail size={18} /> Email
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
            >
              <Link size={18} /> Copy Link
            </button>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Referral History</h2>
            <span className="text-sm text-gray-500">{referralHistory.length} referrals</span>
          </div>
          <div className="space-y-3">
            {referralHistory.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                    {referral.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{referral.name}</p>
                    <p className="text-xs text-gray-500">{referral.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{referral.reward}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(referral.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;