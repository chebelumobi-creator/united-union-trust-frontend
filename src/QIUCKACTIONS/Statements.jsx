import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, FileText, Download, Calendar, Mail, Printer, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getHistory } from "../api";

export default function Statements() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getHistory();
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Group transactions by month
  const groupedByMonth = transactions.reduce((acc, tx) => {
    const date = new Date(tx.created_at);
    const month = date.toLocaleString("en-US", { month: "long", year: "numeric" });
    if (!acc[month]) {
      acc[month] = { transactions: [], total: 0 };
    }
    acc[month].transactions.push(tx);
    acc[month].total += parseFloat(tx.amount);
    return acc;
  }, {});

  const statements = Object.entries(groupedByMonth).map(([month, data]) => ({
    month,
    transactions: data.transactions.length,
    total: `$${data.total.toLocaleString()}`,
  }));

  const handleSendStatement = () => {
    if (selectedMonth && email) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('statements.title')}</h1>
        </div>

        {/* Email Statement */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail size={20} className="text-blue-500" />
            <h2 className="font-semibold text-gray-800">{t('statements.emailStatement')}</h2>
          </div>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('statements.selectMonth')}</option>
            {statements.map((s) => (
              <option key={s.month} value={s.month}>{s.month}</option>
            ))}
          </select>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('statements.emailPlaceholder')}
            className="w-full p-3 border border-gray-200 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSendStatement}
            disabled={!selectedMonth || !email}
            className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedMonth && email
                ? "bg-blue-600 text-white shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {sent ? <CheckCircle size={18} /> : <Mail size={18} />}
            {sent ? t('statements.sentSuccess') : t('statements.sendStatement')}
          </button>
        </div>

        {/* Available Statements */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{t('statements.availableStatements')}</h2>

        {loading ? (
          <div className="text-center py-10 text-gray-500">{t('statements.loading')}</div>
        ) : statements.length === 0 ? (
          <div className="text-center py-10 text-gray-500">{t('statements.noStatements')}</div>
        ) : (
          <div className="space-y-3">
            {statements.map((statement, index) => (
              <div
                key={statement.month}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{statement.month}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={10} className="text-gray-400" />
                        <p className="text-xs text-gray-400">{t('statements.transactions', { count: statement.transactions })}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{statement.total}</p>
                    <div className="flex gap-2 mt-2">
                      <Download size={16} className="text-gray-400 hover:text-blue-500 cursor-pointer" />
                      <Printer size={16} className="text-gray-400 hover:text-blue-500 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}