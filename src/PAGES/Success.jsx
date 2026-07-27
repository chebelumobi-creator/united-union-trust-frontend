import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { CheckCircle, Download, Printer, Share2, Home, Globe, XCircle } from "lucide-react";
import { useBalance } from "../COMPONENTS/BalanceContext";

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

function Success() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const receiptRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const transferData = location.state;
  const { user } = useBalance();

  // Check if manual verification is required
  const manualVerificationRequired = transferData?.manual_verification_required || false;

  // Get display name (full name or username)
  const displayName = user?.full_name || user?.username || "N/A";

  if (!transferData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{t('success.noData')}</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full mt-6 bg-green-700 text-white py-3 rounded-lg"
          >
            {t('success.backToDashboard')}
          </button>
        </div>
      </div>
    );
  }

  const isWire = transferData.transfer_type === 'wire';

  const handlePrint = () => {
    window.print();
  };

  const buildCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = isWire ? 900 : 750;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Watermark
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    const watermarkText = 'UNITED UNION TRUST BANK';
    const lineHeight = 80;
    const diagonal = -30 * Math.PI / 180;
    for (let y = 0; y < canvas.height + 100; y += lineHeight) {
      for (let x = -100; x < canvas.width + 100; x += 320) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(diagonal);
        ctx.fillText(watermarkText, 0, 0);
        ctx.restore();
      }
    }
    ctx.restore();

    // Header background
    ctx.fillStyle = isWire ? '#2563eb' : '#16a34a';
    ctx.fillRect(0, 0, canvas.width, 120);

    // Header text - changes based on manual verification
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'center';
    if (manualVerificationRequired) {
      ctx.fillText(isWire ? t('success.wirePending') : t('success.domesticPending'), 300, 60);
    } else {
      ctx.fillText(isWire ? t('success.wireSuccess') : t('success.domesticSuccess'), 300, 60);
    }
    ctx.font = '14px Arial';
    ctx.fillText('United Union Trust Bank', 300, 90);

    // Amount
    ctx.fillStyle = '#1f2937';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(t('success.amountTransferred'), 300, 155);
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`$${parseFloat(transferData.amount).toLocaleString()} USD`, 300, 200);

    // Divider
    ctx.strokeStyle = '#e5e7eb';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(40, 220);
    ctx.lineTo(560, 220);
    ctx.stroke();
    ctx.setLineDash([]);

    // Receipt details with formatting
    const statusText = manualVerificationRequired ? t('success.pendingManual') : t('success.completed');
    
    const details = [
      [t('success.reference'), toUpperCase(transferData.reference)],
      [t('success.transferType'), isWire ? t('success.wireTransfer') : t('success.domesticTransfer')],
      [t('success.senderName'), toProperCase(displayName)],
      [t('success.fromBank'), 'United Union Trust Bank'],
      [t('success.recipientName'), toProperCase(transferData.recipient_name)],
      [t('success.accountNumber'), transferData.recipient_account],
      [t('success.bankName'), toProperCase(transferData.recipient_bank)],
      ...(isWire ? [
        [t('success.swiftCode'), toUpperCase(transferData.swift_code)],
        [t('success.country'), toProperCase(transferData.country)],
        [t('success.recipientEmail'), transferData.recipient_email?.toLowerCase()],
      ] : []),
      [t('success.status'), statusText],
      [t('success.dateTime'), new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })],
    ];

    // Add equivalent amount if available
    if (transferData.equivalent_amount && transferData.target_currency) {
      const symbol = transferData.currency_symbol || transferData.target_currency;
      details.splice(7, 0, [t('success.equivalentAmount'), `${symbol} ${transferData.equivalent_amount.toLocaleString()} ${transferData.target_currency !== transferData.currency_symbol ? transferData.target_currency : ''}`]);
    }

    let y = 250;
    details.forEach(([label, value]) => {
      ctx.fillStyle = '#6b7280';
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(label, 50, y);

      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 13px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(value || '', 550, y);

      ctx.strokeStyle = '#f3f4f6';
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(50, y + 10);
      ctx.lineTo(550, y + 10);
      ctx.stroke();

      y += 40;
    });

    // Add manual verification message if required
    if (manualVerificationRequired) {
      ctx.fillStyle = '#eab308';
      ctx.font = 'italic 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(t('success.contactMessage'), 300, y + 30);
      y += 50;
    }

    // Divider
    ctx.strokeStyle = '#e5e7eb';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(40, y + 10);
    ctx.lineTo(560, y + 10);
    ctx.stroke();
    ctx.setLineDash([]);

    // Footer
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('United Union Trust Bank', 300, y + 40);
    ctx.fillText(t('footer.tagline'), 300, y + 60);

    return canvas;
  };

  const handleDownloadImage = async () => {
    setIsLoading(true);
    try {
      const canvas = buildCanvas();
      const reference = transferData.reference || `TRX_${Date.now()}`;
      const link = document.createElement('a');
      link.download = `receipt_${toUpperCase(reference)}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download error:", err);
      alert(t('success.downloadFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    setIsLoading(true);
    try {
      const canvas = buildCanvas();
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const reference = transferData.reference || `TRX_${Date.now()}`;
      const file = new File([blob], `receipt_${toUpperCase(reference)}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: t('success.shareTitle'),
          text: t('success.shareText', { amount: transferData.amount }),
          files: [file],
        });
      } else {
        const link = document.createElement('a');
        link.download = `receipt_${toUpperCase(reference)}.png`;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        alert(t('success.shareFallback'));
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share error:', err);
        alert(t('success.shareFailed'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { box-shadow: none !important; }
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md">

          {/* Receipt Card */}
          <div ref={receiptRef} className="bg-white rounded-2xl shadow-lg overflow-hidden print-area">

            {/* Header */}
            <div className={`p-6 text-white text-center ${isWire ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-green-600 to-green-800'}`}>
              <div className="flex justify-center mb-3">
                <div className="bg-white/20 p-3 rounded-full">
                  {isWire ? <Globe size={32} /> : <Home size={32} />}
                </div>
              </div>
              <h2 className="text-xl font-bold">
                {manualVerificationRequired 
                  ? (isWire ? t('success.wirePending') : t('success.domesticPending'))
                  : (isWire ? t('success.wireSuccess') : t('success.domesticSuccess'))}
              </h2>
              <p className="text-white/80 text-sm mt-1">United Union Trust Bank</p>
            </div>

            {/* Success/Info Icon */}
            <div className="flex justify-center -mt-6">
              <div className={`bg-white rounded-full p-1 shadow-lg ${manualVerificationRequired ? 'border-yellow-500 border-2' : ''}`}>
                {manualVerificationRequired ? (
                  <XCircle className="text-yellow-500" size={40} />
                ) : (
                  <CheckCircle className="text-green-500" size={40} />
                )}
              </div>
            </div>

            {/* Manual Verification Message */}
            {manualVerificationRequired && (
              <div className="mt-4 mx-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <p className="text-yellow-700 text-sm font-medium">
                  {t('success.contactMessage')}
                </p>
              </div>
            )}

            {/* Amount */}
            <div className="text-center py-4 px-6">
              <p className="text-gray-500 text-sm">{t('success.amountTransferred')}</p>
              <p className="text-4xl font-bold text-gray-800 mt-1">
                ${parseFloat(transferData.amount).toLocaleString()}
              </p>
            </div>

            {/* Equivalent Amount - Only for wire transfers */}
            {isWire && transferData.equivalent_amount && transferData.target_currency && (
              <div className="text-center py-2 px-6 bg-gray-50 mx-6 rounded-lg">
                <p className="text-gray-500 text-xs">{t('success.equivalentIn')} {toProperCase(transferData.country || t('success.localCurrency'))}</p>
                <p className="text-xl font-bold text-gray-800">
                  {transferData.currency_symbol || ''} {transferData.equivalent_amount.toLocaleString()} {!transferData.currency_symbol && transferData.target_currency}
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
                <span className="text-gray-500 text-sm">{t('success.reference')}</span>
                <span className="font-mono font-semibold text-gray-800 text-sm">
                  {toUpperCase(transferData.reference)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.transferType')}</span>
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${isWire ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {isWire ? t('success.wireTransfer') : t('success.domesticTransfer')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.senderName')}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {toProperCase(displayName)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.fromBank')}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  United Union Trust Bank
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.recipientName')}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {toProperCase(transferData.recipient_name)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.accountNumber')}</span>
                <span className="font-mono font-semibold text-gray-800 text-sm">
                  {transferData.recipient_account}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.bankName')}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {toProperCase(transferData.recipient_bank)}
                </span>
              </div>
              
              {isWire && transferData.equivalent_amount && transferData.target_currency && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{t('success.equivalentAmount')} ({toProperCase(transferData.country || transferData.target_currency)})</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {transferData.currency_symbol || ''} {transferData.equivalent_amount.toLocaleString()} {!transferData.currency_symbol && transferData.target_currency}
                  </span>
                </div>
              )}
              
              {isWire && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{t('success.swiftCode')}</span>
                    <span className="font-mono font-semibold text-gray-800 text-sm">
                      {toUpperCase(transferData.swift_code)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{t('success.country')}</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {toProperCase(transferData.country)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{t('success.recipientEmail')}</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {transferData.recipient_email?.toLowerCase()}
                    </span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.status')}</span>
                <div className="flex items-center gap-2">
                  {manualVerificationRequired ? (
                    <XCircle size={14} className="text-yellow-500" />
                  ) : (
                    <CheckCircle size={14} className="text-green-500" />
                  )}
                  <span className={`font-semibold text-sm ${manualVerificationRequired ? 'text-yellow-600' : 'text-green-600'}`}>
                    {manualVerificationRequired ? t('success.pendingManual') : t('success.completed')}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t('success.dateTime')}</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {new Date().toLocaleString('en-US', { 
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
              <p className="text-xs text-gray-400">United Union Trust Bank</p>
              <p className="text-xs text-gray-400">{t('footer.tagline')}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 grid grid-cols-3 gap-3 no-print">
            <button
              onClick={handlePrint}
              disabled={isLoading}
              className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              <Printer className="text-gray-600" size={24} />
              <span className="text-xs font-medium text-gray-600">{t('success.print')}</span>
            </button>
            <button
              onClick={handleShare}
              disabled={isLoading}
              className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              <Share2 className="text-blue-600" size={24} />
              <span className="text-xs font-medium text-gray-600">{t('success.share')}</span>
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isLoading}
              className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              <Download className="text-green-600" size={24} />
              <span className="text-xs font-medium text-gray-600">
                {isLoading ? t('common.loading') : t('success.download')}
              </span>
            </button>
          </div>

          {/* Back to Dashboard */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full mt-4 bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 font-semibold no-print"
          >
            {t('success.backToDashboard')}
          </button>
        </div>
      </div>
    </>
  );
}

export default Success;