import { useEffect, useState } from "react";
import { getHistory } from "../api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  Building2,
  Send,
  Plus,
  History,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Bell,
  Settings,
  Wallet,
  Users,
  Menu,
  Home,
  List,
  CreditCard as CardIcon,
  FileText,
  User,
  LogOut,
  Banknote,
  QrCode,
  Download,
  Receipt,
  Gift,
  ChevronLeft,
  ChevronRight,
  PiggyBank,
  TrendingUp,
  CalendarCheck,
  Star,
  Calculator,
  MapPin,
  RefreshCw,
  HelpCircle,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import BalanceCard from "../COMPONENTS/BalanceCard";
import { useBalance } from "../COMPONENTS/BalanceContext";
import TransactionReceipt from "./TransactionReceipt";

const SuperVoucherSlider = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const vouchers = [
    {
      title: t('voucher.superPackage'),
      description: t('voucher.shareBank'),
      shareText: t('voucher.inviteFriends'),
      bgColor: "from-orange-500 to-red-600",
    },
    {
      title: t('voucher.referEarn'),
      description: t('voucher.cashback'),
      shareText: t('voucher.yourFriendGets'),
      bgColor: "from-purple-500 to-pink-600",
    },
    {
      title: t('voucher.limitedOffer'),
      description: t('voucher.doubleRewards'),
      shareText: t('voucher.weekendOnly'),
      bgColor: "from-green-500 to-emerald-600",
    },
    {
      title: t('voucher.superSharer'),
      description: t('voucher.topReferrers'),
      shareText: t('voucher.shareCode'),
      bgColor: "from-blue-500 to-cyan-600",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === vouchers.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [vouchers.length]);

  const goToSlide = (index) => setCurrentIndex(index);
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === vouchers.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? vouchers.length - 1 : prev - 1));

  return (
    <div className="mb-6 relative group">
      <div
        className={`bg-gradient-to-r ${vouchers[currentIndex].bgColor} rounded-2xl p-6 shadow-lg overflow-hidden relative`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="text-white" size={24} />
                <h3 className="text-white font-bold text-xl">
                  {vouchers[currentIndex].title}
                </h3>
              </div>
              <p className="text-white/90 text-sm mb-2">
                {vouchers[currentIndex].description}
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-3 inline-block">
                <p className="text-white text-sm font-medium flex items-center gap-2">
                  <span>📱</span> {vouchers[currentIndex].shareText}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert(t('voucher.shareNow'))}
            className="mt-4 bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {t('voucher.shareNow')} →
          </button>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {vouchers.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 ${
              idx === currentIndex
                ? "w-8 h-2 bg-green-600 rounded-full"
                : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

function Bill() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useBalance();
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getHistory();
        setTransactions(res.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  const cards = [
    {
      id: 1,
      type: "Visa",
      last4: "4456",
      expiry: "09/28",
      color: "bg-gradient-to-r from-green-600 to-emerald-600",
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8923",
      expiry: "12/28",
      color: "bg-gradient-to-r from-emerald-600 to-teal-600",
    },
  ];

  // Main Menu Items
  const mainMenuItems = [
    { name: t('nav.dashboard'), icon: Home, path: "/dashboard" },
    { name: t('nav.transactions'), icon: List, path: "/history" },
    { name: t('nav.sendMoney'), icon: Send, path: "/send" },
    { name: t('nav.cards'), icon: CardIcon, path: "/cards" },
    { name: "Payments", icon: FileText, path: "/payments" },
    { name: t('nav.profile'), icon: User, path: "/account-info" },
    { name: t('nav.settings'), icon: Settings, path: "/settings" },
  ];

  // Financial Tools Items
  const toolsItems = [
    { name: t('footer.loanCalculator'), icon: Calculator, path: "/loan-calculator" },
    { name: t('footer.branchLocator'), icon: MapPin, path: "/branches" },
    { name: t('voucher.referEarn'), icon: Gift, path: "/refer" },
  ];

  // Support & Help Items
  const supportItems = [
    { name: t('faq.title'), icon: HelpCircle, path: "/faq" },
    { name: t('footer.contact'), icon: Phone, path: "/contact" },
  ];

  // Get display name for avatar
  const displayName = user?.full_name || user?.username || "User";

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
          white-space: nowrap;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-xl min-h-screen transition-all duration-300 ease-in-out flex-shrink-0 ${
            sidebarOpen ? "w-64" : "w-0 overflow-hidden"
          }`}
        >
          <div className="p-6 w-64 h-full flex flex-col">
            {/* Logo */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-green-600">
                United Union Trust Bank
              </h2>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-1 flex-1 overflow-y-auto">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                Main Menu
              </p>
              {mainMenuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
                >
                  <item.icon size={18} className="group-hover:text-green-600" />
                  <span className="text-sm">{item.name}</span>
                </button>
              ))}

              {/* Financial Tools Section */}
              <div className="mt-4">
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  <span>Financial Tools</span>
                  {isToolsOpen ? <ChevronDown size={14} /> : <ChevronRightIcon size={14} />}
                </button>
                {isToolsOpen && (
                  <div className="space-y-1 mt-1">
                    {toolsItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg transition-all hover:text-green-600 pl-10"
                      >
                        <item.icon size={16} className="text-gray-400" />
                        <span className="text-sm">{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Support & Help Section */}
              <div className="mt-2">
                <button
                  onClick={() => setIsSupportOpen(!isSupportOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  <span>Support & Help</span>
                  {isSupportOpen ? <ChevronDown size={14} /> : <ChevronRightIcon size={14} />}
                </button>
                {isSupportOpen && (
                  <div className="space-y-1 mt-1">
                    {supportItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg transition-all hover:text-green-600 pl-10"
                      >
                        <item.icon size={16} className="text-gray-400" />
                        <span className="text-sm">{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={async () => {
                  try {
                    const refresh = localStorage.getItem("refresh_token");
                    await import("../api").then((api) =>
                      api.logoutUser({ refresh })
                    );
                  } catch (e) {}
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("refresh_token");
                  navigate("/pin");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition mt-4"
              >
                <LogOut size={18} />
                <span className="text-sm">{t('nav.logout')}</span>
              </button>

              {/* Bottom Security Badges */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[10px] text-gray-400">SSL Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={12} className="text-yellow-400" />
                    <span className="text-[10px] text-gray-400">v2.0.1</span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 transition-all duration-300 p-4 md:p-6 pb-24">
          {/* Top Navigation Bar */}
          <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-200 rounded-lg"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t('dashboard.title')}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-200 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                {displayName?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="max-w-7xl mx-auto">
            <SuperVoucherSlider />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <BalanceCard />

                {/* Moving Ticker */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-3 overflow-hidden shadow-md">
                  <div className="animate-scroll whitespace-nowrap">
                    <span className="text-white font-medium inline-block mx-8">
                      🚀 {t('ticker.exclusiveOffer')}
                    </span>
                    <span className="text-white font-medium inline-block mx-8">
                      💎 {t('ticker.premiumBanking')}
                    </span>
                    <span className="text-white font-medium inline-block mx-8">
                      ⚡ {t('ticker.instantTransfers')}
                    </span>
                    <span className="text-white font-medium inline-block mx-8">
                      🛡️ {t('ticker.bankWithConfidence')}
                    </span>
                    <span className="text-white font-medium inline-block mx-8">
                      📱 {t('ticker.mobileBanking')}
                    </span>
                  </div>
                </div>

                {/* My Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{t('dashboard.myCards')}</h3>
                    <button className="text-green-600 text-sm hover:underline flex items-center gap-1">
                      {t('dashboard.manage')} <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`${card.color} text-white p-5 rounded-xl relative overflow-hidden`}
                      >
                        <div className="absolute right-2 top-2 opacity-20">
                          <CreditCard size={40} />
                        </div>
                        <p className="text-sm opacity-80">{card.type}</p>
                        <p className="text-lg font-mono mt-3">
                          **** **** **** {card.last4}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-xs opacity-80">
                            Expires {card.expiry}
                          </p>
                          <button className="text-xs bg-white/20 px-3 py-1 rounded-full">
                            {t('dashboard.freeze')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-lg mb-4">{t('dashboard.quickActions')}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button onClick={() => navigate("/account-info")} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2">
                      <div className="bg-purple-100 p-3 rounded-xl"><Building2 className="text-purple-600" size={24} /></div>
                      <span className="text-sm font-medium">{t('actions.accountInfo')}</span>
                    </button>
                    <button onClick={() => navigate("/send")} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2">
                      <div className="bg-green-100 p-3 rounded-xl"><Send className="text-green-600" size={24} /></div>
                      <span className="text-sm font-medium">{t('actions.sendMoney')}</span>
                    </button>
                    <button onClick={() => navigate("/deposit")} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2">
                      <div className="bg-blue-100 p-3 rounded-xl"><Plus className="text-green-600" size={24} /></div>
                      <span className="text-sm font-medium">{t('actions.deposit')}</span>
                    </button>
                    <button onClick={() => navigate("/history")} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2">
                      <div className="bg-pink-100 p-3 rounded-xl"><History className="text-pink-600" size={24} /></div>
                      <span className="text-sm font-medium">{t('actions.history')}</span>
                    </button>
                    <button onClick={() => navigate("/balance")} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2">
                      <div className="bg-emerald-100 p-3 rounded-xl"><Banknote className="text-emerald-600" size={24} /></div>
                      <span className="text-sm font-medium">{t('actions.balance')}</span>
                    </button>
                    <button onClick={() => navigate("/scan-and-pay")} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2">
                      <div className="bg-indigo-100 p-3 rounded-xl"><QrCode className="text-indigo-600" size={24} /></div>
                      <span className="text-sm font-medium">{t('actions.scanAndPay')}</span>
                    </button>
                    <button onClick={() => navigate("/withdraw")} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2">
                      <div className="bg-amber-100 p-3 rounded-xl"><Download className="text-amber-600" size={24} /></div>
                      <span className="text-sm font-medium">{t('actions.withdraw')}</span>
                    </button>
                    <button onClick={() => navigate("/statements")} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2">
                      <div className="bg-rose-100 p-3 rounded-xl"><Receipt className="text-rose-600" size={24} /></div>
                      <span className="text-sm font-medium">{t('actions.statements')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Recent Transactions */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{t('dashboard.recentTransactions')}</h3>
                    <button onClick={() => navigate("/history")} className="text-green-600 text-sm hover:underline">
                      {t('dashboard.viewAll')}
                    </button>
                  </div>
                  <div className="space-y-4">
                    {transactions.length === 0 ? (
                      <p className="text-center text-gray-400 text-sm py-4">
                        {t('dashboard.noTransactions')}
                      </p>
                    ) : (
                      transactions.map((tx) => (
                        <div 
                          key={tx.id} 
                          onClick={() => setSelectedTransaction(tx)}
                          className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.transaction_type === "deposit" ? "bg-green-100" : "bg-red-100"}`}>
                              {tx.transaction_type === "deposit" ? (
                                <ArrowDownLeft className="text-green-600" size={18} />
                              ) : (
                                <ArrowUpRight className="text-red-600" size={18} />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{tx.recipient_name}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(tx.created_at).toLocaleDateString()} •{" "}
                                {tx.transaction_type}
                              </p>
                            </div>
                          </div>
                          <p className={`font-semibold ${tx.transaction_type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                            {tx.transaction_type === "deposit" ? "+" : "-"}$
                            {parseFloat(tx.amount).toFixed(2)}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Spending Insights */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="font-bold text-lg mb-4">{t('dashboard.spendingInsights')}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('dashboard.monthlyBudget')}</span>
                        <span className="font-medium">$2,450 / $3,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">{t('dashboard.foodDrinks')}</p>
                        <p className="font-bold">$450</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">{t('dashboard.shopping')}</p>
                        <p className="font-bold">$320</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">{t('dashboard.bills')}</p>
                        <p className="font-bold">$580</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">{t('dashboard.entertainment')}</p>
                        <p className="font-bold">$210</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <Wallet className="text-green-600 mb-2" size={24} />
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-gray-500">{t('dashboard.activeAccounts')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <Users className="text-blue-600 mb-2" size={24} />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-gray-500">{t('dashboard.beneficiaries')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <PiggyBank className="text-purple-600 mb-2" size={24} />
                    <p className="text-2xl font-bold">$12,450</p>
                    <p className="text-xs text-gray-500">{t('dashboard.monthlySpend')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <TrendingUp className="text-orange-600 mb-2" size={24} />
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-gray-500">{t('dashboard.linkedAccounts')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center shadow-lg z-50">
          <button onClick={() => navigate("/history")} className="flex flex-col items-center text-gray-500 hover:text-green-600">
            <History className="w-6 h-6" />
            <span className="text-xs mt-1">{t('nav.activity')}</span>
          </button>
          <button onClick={() => navigate("/send")} className="flex flex-col items-center text-gray-500 hover:text-green-600">
            <Send className="w-6 h-6" />
            <span className="text-xs mt-1">{t('nav.transfer')}</span>
          </button>
          <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center text-green-600 relative -top-5 bg-white rounded-full p-3 shadow-lg border border-gray-200">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1 absolute -bottom-5">{t('nav.home')}</span>
          </button>
          <button onClick={() => navigate("/cards")} className="flex flex-col items-center text-gray-500 hover:text-green-600">
            <CreditCard className="w-6 h-6" />
            <span className="text-xs mt-1">{t('nav.cards')}</span>
          </button>
          <button onClick={() => navigate("/account-info")} className="flex flex-col items-center text-gray-500 hover:text-green-600">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">{t('nav.profile')}</span>
          </button>
        </nav>
      </div>

      {/* Transaction Receipt Modal */}
      {selectedTransaction && (
        <TransactionReceipt
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </>
  );
}

export default Bill;