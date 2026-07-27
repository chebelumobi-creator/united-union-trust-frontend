import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  CreditCard,
  Shield,
  Send,
  User,
  Settings,
  Globe,
  Phone,
  FileText,
  Lock,
  Smartphone,
  DollarSign,
  Clock
} from "lucide-react";

const FAQ = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    // Account & Registration
    {
      id: 1,
      category: "Account",
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Register' button on the login page. Fill in your details, verify your email, and you're ready to start banking."
    },
    {
      id: 2,
      category: "Account",
      question: "What documents do I need to open an account?",
      answer: "You'll need a valid government-issued ID (passport, driver's license), proof of address (utility bill, bank statement), and your Social Security Number or Tax ID."
    },
    {
      id: 3,
      category: "Account",
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot Password'. Enter your email address and we'll send you a reset link. Follow the instructions to create a new password."
    },
    {
      id: 4,
      category: "Account",
      question: "What is my account number and where can I find it?",
      answer: "Your account number is displayed on your dashboard under 'Account Info'. You can also find it on your account statements and in the mobile app."
    },

    // Transfers & Payments
    {
      id: 5,
      category: "Transfers",
      question: "How long does a transfer take?",
      answer: "Domestic transfers are usually instant or processed within 1-2 business days. International wire transfers typically take 1-3 business days depending on the destination country."
    },
    {
      id: 6,
      category: "Transfers",
      question: "Is there a limit on how much I can transfer?",
      answer: "Yes, daily transfer limits vary by account type. Standard accounts have a $10,000 daily limit. Premium accounts have higher limits. You can check your limit in the 'Account Info' section."
    },
    {
      id: 7,
      category: "Transfers",
      question: "Are there any fees for transfers?",
      answer: "Domestic transfers are free for all account holders. International wire transfers have a small fee of $25 for outgoing transfers. Please check our fee schedule for complete details."
    },
    {
      id: 8,
      category: "Transfers",
      question: "Can I cancel a transfer after it's been sent?",
      answer: "Once a transfer is processed, it cannot be canceled. However, if the transfer is still pending, you can contact support immediately to request a cancellation."
    },

    // Security
    {
      id: 9,
      category: "Security",
      question: "Is my money safe with United Union Trust Bank?",
      answer: "Absolutely! We use 256-bit encryption on all transactions. Your deposits are insured up to $250,000 by FDIC. We also monitor all transactions 24/7 for suspicious activity."
    },
    {
      id: 10,
      category: "Security",
      question: "What is two-factor authentication (2FA)?",
      answer: "2FA adds an extra layer of security to your account. After entering your password, you'll need to enter a verification code sent to your phone or email to complete the login process."
    },
    {
      id: 11,
      category: "Security",
      question: "What should I do if I see suspicious activity on my account?",
      answer: "Immediately contact our fraud department at 1-800-555-0199 or use the 'Report Fraud' button in your dashboard. We'll freeze your account and investigate the activity."
    },
    {
      id: 12,
      category: "Security",
      question: "How do I enable biometric login?",
      answer: "Go to Settings > Security Settings and toggle on 'Biometric Login'. You'll be prompted to set up Face ID or Fingerprint authentication on your device."
    },

    // Cards
    {
      id: 13,
      category: "Cards",
      question: "How do I get a new card?",
      answer: "Go to the 'Cards' section in your dashboard and click 'Request New Card'. Choose between Virtual Card (instant) or Physical Card (delivered in 5-7 business days)."
    },
    {
      id: 14,
      category: "Cards",
      question: "How do I freeze or unfreeze my card?",
      answer: "Go to the 'Cards' section, select your card, and click the 'Freeze' or 'Unfreeze' button. This immediately prevents or allows transactions on the card."
    },
    {
      id: 15,
      category: "Cards",
      question: "What should I do if I lose my card?",
      answer: "Immediately freeze your card from the 'Cards' section in your dashboard, then contact us to report it lost or stolen. We'll issue a replacement card for you."
    },
    {
      id: 16,
      category: "Cards",
      question: "What is the daily spending limit on my card?",
      answer: "The daily spending limit depends on your card type. Standard Visa cards have a $5,000 daily limit, while Premium cards have a $10,000 limit. You can request a limit increase through support."
    },

    // Mobile App
    {
      id: 17,
      category: "Mobile",
      question: "Is there a mobile app available?",
      answer: "Yes! United Union Trust Bank offers a mobile app for both iOS and Android devices. Download it from the App Store or Google Play Store for banking on the go."
    },
    {
      id: 18,
      category: "Mobile",
      question: "Can I deposit checks using the mobile app?",
      answer: "Yes, the mobile app supports mobile check deposit. Simply take a photo of the front and back of your check and submit it for deposit. Funds are usually available within 1-2 business days."
    },
    {
      id: 19,
      category: "Mobile",
      question: "Is the mobile app secure?",
      answer: "The mobile app uses the same 256-bit encryption as our web platform. It supports biometric login, and all transactions require PIN or 2FA verification."
    },

    // Support
    {
      id: 20,
      category: "Support",
      question: "How do I contact customer support?",
      answer: "You can contact our support team 24/7 via Live Chat on our website, email us at support@uniteduniontrustbank.com, or call us at 1-800-555-0199."
    },
    {
      id: 21,
      category: "Support",
      question: "What are your customer service hours?",
      answer: "Our support team is available 24 hours a day, 7 days a week, 365 days a year. You can reach us anytime via Live Chat, email, or phone."
    },
    {
      id: 22,
      category: "Support",
      question: "How do I file a complaint?",
      answer: "You can file a complaint through the 'Complaints' section in your account settings, or contact our support team directly. We aim to resolve all complaints within 48 hours."
    },
  ];

  // Get unique categories
  const categories = ["all", ...new Set(faqs.map(faq => faq.category.toLowerCase()))];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category.toLowerCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get icon for category
  const getCategoryIcon = (category) => {
    const icons = {
      account: <User size={18} />,
      transfers: <Send size={18} />,
      security: <Shield size={18} />,
      cards: <CreditCard size={18} />,
      mobile: <Smartphone size={18} />,
      support: <Phone size={18} />
    };
    return icons[category.toLowerCase()] || <HelpCircle size={18} />;
  };

  // Get color for category
  const getCategoryColor = (category) => {
    const colors = {
      account: "bg-blue-100 text-blue-600 border-blue-200",
      transfers: "bg-green-100 text-green-600 border-green-200",
      security: "bg-red-100 text-red-600 border-red-200",
      cards: "bg-purple-100 text-purple-600 border-purple-200",
      mobile: "bg-indigo-100 text-indigo-600 border-indigo-200",
      support: "bg-orange-100 text-orange-600 border-orange-200"
    };
    return colors[category.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>FAQ - United Union Trust</title>
        <meta name="description" content="Frequently asked questions about United Union Trust banking services, accounts, transfers, security, and more. Find answers to common banking questions." />
        <meta property="og:title" content="FAQ - United Union Trust" />
        <meta property="og:description" content="Frequently asked questions about United Union Trust banking services, accounts, transfers, security, and more." />
        <meta property="og:url" content="https://www.uniteduniontrust.com/faq" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.uniteduniontrust.com/faq" />
      </Helmet>

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
              <div className="bg-green-100 p-3 rounded-xl">
                <HelpCircle className="text-green-600" size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Frequently Asked Questions</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {category !== "all" && (
                  <span className="ml-1 text-xs opacity-70">
                    ({faqs.filter(f => f.category.toLowerCase() === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No FAQs found for "{searchTerm}"</p>
                <button 
                  onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                  className="text-green-600 hover:underline mt-2"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden transition hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg border ${getCategoryColor(faq.category)}`}>
                        {getCategoryIcon(faq.category)}
                      </div>
                      <span className="font-medium text-gray-800">{faq.question}</span>
                    </div>
                    <span className="ml-4 text-gray-400">
                      {openIndex === faq.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </span>
                  </button>
                  {openIndex === faq.id && (
                    <div className="px-5 pb-5 pt-1 border-t border-gray-100">
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(faq.category)}`}>
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Still Need Help? */}
          <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-center text-white">
            <h3 className="text-lg font-bold mb-2">Still have questions?</h3>
            <p className="text-sm text-white/80 mb-4">Our support team is here to help you 24/7</p>
            <button 
              onClick={() => navigate("/contact")}
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;