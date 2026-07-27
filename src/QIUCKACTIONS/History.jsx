import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Calendar, Search, Trash2, Eye, Edit, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { getHistory, deleteTransaction } from "../api";

export default function History() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('history.deleteConfirm'))) return;
    setDeletingId(id);
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(tx => tx.id !== id));
    } catch (err) {
      alert(t('history.deleteFailed'));
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewReceipt = (tx) => {
    setSelectedTx(tx);
  };

  const goToAdmin = (tx) => {
    const adminUrl = `http://localhost:8000/admin/core/transaction/${tx.id}/change/`;
    window.open(adminUrl, '_blank');
  };

  const filtered = transactions.filter((t) => {
    const matchesFilter = filter === "all" || t.transaction_type === filter;
    const matchesSearch = t.recipient_name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto">

        {/* Receipt Modal */}
        {selectedTx && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">

              {/* Modal Header */}
              <div className={`p-5 text-white text-center ${selectedTx.transfer_type === 'wire' ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-green-600 to-green-800'}`}>
                <h3 className="font-bold text-lg">{t('history.receiptTitle')}</h3>
                <p className="text-white/80 text-sm">United Union Trust Bank</p>
              </div>

              {/* Amount */}
              <div className="text-center py-4 px-4">
                <p className="text-gray-500 text-sm">{t('history.amount')}</p>
                <p className="text-3xl font-bold text-gray-800">
                  {selectedTx.transaction_type === 'deposit' ? '+' : '-'}${parseFloat(selectedTx.amount).toLocaleString()}
                  <span className="text-sm text-gray-400 ml-1">USD</span>
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-gray-200 mx-4"></div>

              {/* Details */}
              <div className="px-5 py-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">{t('history.reference')}</span>
                  <span className="font-mono text-sm font-semibold text-gray-800">{selectedTx.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">{t('history.type')}</span>
                  <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                    selectedTx.transfer_type === 'wire' ? 'bg-blue-100 text-blue-700' :
                    selectedTx.transaction_type === 'deposit' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedTx.transfer_type === 'wire' ? t('history.wireTransfer') :
                     selectedTx.transfer_type === 'domestic' ? t('history.domesticTransfer') :
                     selectedTx.transaction_type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">{t('history.recipient')}</span>
                  <span className="text-sm font-semibold text-gray-800">{selectedTx.recipient_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">{t('history.account')}</span>
                  <span className="font-mono text-sm font-semibold text-gray-800">{selectedTx.recipient_account}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">{t('history.bank')}</span>
                  <span className="text-sm font-semibold text-gray-800">{selectedTx.recipient_bank}</span>
                </div>
                {selectedTx.swift_code && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">{t('history.swiftCode')}</span>
                    <span className="font-mono text-sm font-semibold text-gray-800">{selectedTx.swift_code}</span>
                  </div>
                )}
                {selectedTx.country && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">{t('history.country')}</span>
                    <span className="text-sm font-semibold text-gray-800">{selectedTx.country}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">{t('history.status')}</span>
                  <span className={`text-sm font-semibold ${
                    selectedTx.status === "completed" ? "text-green-600" : "text-yellow-600"
                  }`}>
                    {selectedTx.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">{t('history.date')}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {new Date(selectedTx.created_at).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-gray-200 mx-4"></div>

              {/* Footer */}
              <div className="p-4 text-center">
                <p className="text-xs text-gray-400">United Union Trust Bank • Secure • Fast • Reliable</p>
              </div>

              {/* Buttons - UPDATED with Admin Edit */}
              <div className="px-5 pb-5 flex flex-col gap-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 border border-gray-300 py-2 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-medium"
                  >
                    {t('history.print')}
                  </button>
                  <button
                    onClick={() => setSelectedTx(null)}
                    className="flex-1 bg-green-700 text-white py-2 rounded-xl hover:bg-green-800 text-sm font-medium"
                  >
                    {t('history.close')}
                  </button>
                </div>
                <button
                  onClick={() => goToAdmin(selectedTx)}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 text-sm font-medium transition"
                >
                  <Edit size={16} /> Transactions History <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('history.title')}</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('history.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "transfer", "deposit", "withdrawal"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                filter === type
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t(`history.filter${type.charAt(0).toUpperCase() + type.slice(1)}`)}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">{t('history.loading')}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-500">{t('history.noTransactions')}</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => handleViewReceipt(transaction)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-full ${
                      transaction.transaction_type === 'deposit' ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {transaction.transaction_type === 'deposit' ? (
                        <ArrowDownLeft size={18} className="text-green-600" />
                      ) : (
                        <ArrowUpRight size={18} className="text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{transaction.recipient_name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={12} className="text-gray-400" />
                        <p className="text-xs text-gray-400">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </p>
                        {transaction.transfer_type && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            transaction.transfer_type === 'wire' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                          }`}>
                            {transaction.transfer_type === 'wire' ? t('history.wire') : t('history.domestic')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 font-mono">{transaction.reference}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right mr-2">
                      <p className={`font-bold ${
                        transaction.transaction_type === 'deposit' ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.transaction_type === 'deposit' ? '+' : '-'}${parseFloat(transaction.amount).toLocaleString()}
                      </p>
                      <p className={`text-xs mt-1 ${
                        transaction.status === "completed" ? "text-green-500" : "text-yellow-500"
                      }`}>
                        {transaction.status}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewReceipt(transaction);
                      }}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title={t('history.viewReceipt')}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(transaction.id);
                      }}
                      disabled={deletingId === transaction.id}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title={t('history.delete')}
                    >
                      <Trash2 size={16} />
                    </button>
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