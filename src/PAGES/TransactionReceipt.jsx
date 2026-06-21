import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Printer,
  Share2,
  Download,
  Edit,
  ExternalLink,
  Globe,
  Home,
  XCircle
} from "lucide-react";

// Helper functions for text formatting
const toProperCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const toUpperCase = (str) => {
  if (!str) return '';
  return str.toUpperCase();
};

const TransactionReceipt = ({ transaction, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const receiptRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!transaction) return null;

  const isWire = transaction.transfer_type === 'wire';
  const isPending = transaction.status === 'pending';
  const isCompleted = transaction.status === 'completed';

  const goToAdmin = () => {
    const adminUrl = `http://localhost:8000/admin/core/transaction/${transaction.id}/change/`;
    window.open(adminUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    // Simplified - you can expand this later
    alert("Download feature coming soon");
  };

  const handleShare = async () => {
    // Simplified - you can expand this later
    alert("Share feature coming soon");
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { box-shadow: none !important; }
        }
      `}</style>

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
        <div className="w-full max-w-md max-h-[95vh] overflow-y-auto">
          
          {/* Receipt Card */}
          <div ref={receiptRef} className="bg-white rounded-2xl shadow-lg overflow-hidden print-area relative">

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md no-print transition"
            >
              <X size={20} className="text-gray-600" />
            </button>

            {/* Header */}
            <div className={`p-6 text-white text-center ${isWire ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-green-600 to-green-800'}`}>
              <div className="flex justify-center mb-3">
                <div className="bg-white/20 p-3 rounded-full">
                  {isWire ? <Globe size={32} /> : <Home size={32} />}
                </div>
              </div>
              <h2 className="text-xl font-bold">
                {isPending 
                  ? (isWire ? 'Wire Transfer Pending' : 'Domestic Transfer Pending')
                  : isCompleted 
                    ? (isWire ? 'Wire Transfer Successful' : 'Domestic Transfer Successful')
                    : 'Transfer Failed'}
              </h2>
              <p className="text-white/80 text-sm mt-1">Novexus Finance Bank</p>
            </div>

            {/* Status Icon */}
            <div className="flex justify-center -mt-6">
              <div className={`bg-white rounded-full p-1 shadow-lg ${isPending ? 'border-yellow-500 border-2' : isCompleted ? 'border-green-500 border-2' : 'border-red-500 border-2'}`}>
                {isPending ? (
                  <Clock className="text-yellow-500" size={40} />
                ) : isCompleted ? (
                  <CheckCircle className="text-green-500" size={40} />
                ) : (
                  <XCircle className="text-red-500" size={40} />
                )}
              </div>
            </div>

            {/* Pending Message */}
            {isPending && (
              <div className="mt-4 mx-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <p className="text-yellow-700 text-sm font-medium">
                  {t('success.contactMessage') || 'Please contact customer care for proper verification'}
                </p>
              </div>
            )}

            {/* Amount */}
            <div className="text-center py-4 px-6">
              <p className="text-gray-500 text-sm">{t('success.amountTransferred') || 'Amount Transferred'}</p>
              <p className="text-4xl font-bold text-gray-800 mt-1">
                ${parseFloat(transaction.amount).toLocaleString()} USD
              </p>
            </div>

            {/* Equivalent Amount - Only for wire transfers */}
            {isWire && transaction.equivalent_amount && transaction.target_currency && (
              <div className="text-center py-2 px-6 bg-gray-50 mx-6 rounded-lg">
                <p className="text-gray-500 text-xs">{t('success.equivalentIn') || 'Equivalent in'} {toProperCase(transaction.country || t('success.localCurrency') || 'Local Currency')}</p>
                <p className="text-xl font-bold text-gray-800">
                  {transaction.currency_symbol || ''} {transaction.equivalent_amount.toLocaleString()} {!transaction.currency_symbol && transaction.target_currency}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center px-6 my-2">
              <div className="flex-1 border-t border-dashed border-gray-200"></div>
              <div className="mx-3 w-3 h-3 rounded-full bg-gray-100 border border-gray-200"></div>
              <div className="flex-1 border-t border-dashed border-gray-200"></div>
            </div>

            {/* Receipt Details */}
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.reference') || 'Reference'}</span>
                <span className="font-mono font-semibold text-gray-800 text-sm">
                  {toUpperCase(transaction.reference)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.transferType') || 'Transfer Type'}</span>
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${isWire ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {isWire ? (t('success.wireTransfer') || 'Wire Transfer') : (t('success.domesticTransfer') || 'Domestic Transfer')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.senderName') || 'Sender Name'}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {toProperCase(transaction.sender?.username || 'N/A')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.fromBank') || 'From Bank'}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  Novexus Finance Bank
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.recipientName') || 'Recipient Name'}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {toProperCase(transaction.recipient_name)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.accountNumber') || 'Account Number'}</span>
                <span className="font-mono font-semibold text-gray-800 text-sm">
                  {transaction.recipient_account || 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.bankName') || 'Bank Name'}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {toProperCase(transaction.recipient_bank)}
                </span>
              </div>
              
              {isWire && transaction.equivalent_amount && transaction.target_currency && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{t('success.equivalentAmount') || 'Equivalent Amount'} ({toProperCase(transaction.country || transaction.target_currency)})</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {transaction.currency_symbol || ''} {transaction.equivalent_amount.toLocaleString()} {!transaction.currency_symbol && transaction.target_currency}
                  </span>
                </div>
              )}
              
              {isWire && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{t('success.swiftCode') || 'SWIFT Code'}</span>
                    <span className="font-mono font-semibold text-gray-800 text-sm">
                      {toUpperCase(transaction.swift_code || 'N/A')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{t('success.country') || 'Country'}</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {toProperCase(transaction.country || 'N/A')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{t('success.recipientEmail') || 'Recipient Email'}</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {transaction.recipient_email?.toLowerCase() || 'N/A'}
                    </span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.status') || 'Status'}</span>
                <div className="flex items-center gap-2">
                  {isPending ? (
                    <Clock size={14} className="text-yellow-500" />
                  ) : isCompleted ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <XCircle size={14} className="text-red-500" />
                  )}
                  <span className={`font-semibold text-sm ${isPending ? 'text-yellow-600' : isCompleted ? 'text-green-600' : 'text-red-600'}`}>
                    {isPending ? 'Pending - Awaiting Verification' : isCompleted ? 'Successful' : 'Failed'}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.dateTime') || 'Date & Time'}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {new Date(transaction.created_at).toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center px-6 my-2">
              <div className="flex-1 border-t border-dashed border-gray-200"></div>
              <div className="mx-3 w-3 h-3 rounded-full bg-gray-100 border border-gray-200"></div>
              <div className="flex-1 border-t border-dashed border-gray-200"></div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 text-center">
              <p className="text-xs text-gray-400">Novexus Finance Bank</p>
              <p className="text-xs text-gray-400">{t('footer.tagline') || 'Banking made simple, secure, and accessible for everyone'}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 grid grid-cols-3 gap-2 no-print">
            <button
              onClick={handlePrint}
              disabled={isLoading}
              className="flex flex-col items-center gap-1 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              <Printer className="text-gray-600" size={20} />
              <span className="text-[10px] font-medium text-gray-600">{t('success.print') || 'Print'}</span>
            </button>
            <button
              onClick={handleShare}
              disabled={isLoading}
              className="flex flex-col items-center gap-1 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              <Share2 className="text-blue-600" size={20} />
              <span className="text-[10px] font-medium text-gray-600">{t('success.share') || 'Share'}</span>
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isLoading}
              className="flex flex-col items-center gap-1 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              <Download className="text-green-600" size={20} />
              <span className="text-[10px] font-medium text-gray-600">{isLoading ? 'Loading...' : (t('success.download') || 'Download')}</span>
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionReceipt;