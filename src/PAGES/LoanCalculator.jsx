import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Calculator,
  DollarSign,
  Calendar,
  Percent,
  TrendingUp,
  Wallet,
  PieChart
} from "lucide-react";

const LoanCalculator = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState(null);

  const calculateLoan = (e) => {
    e.preventDefault();

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    if (!principal || !rate || !months) {
      alert("Please fill in all fields");
      return;
    }

    // Monthly Payment = P * (r(1+r)^n) / ((1+r)^n - 1)
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setResult(null);
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
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <Calculator className="text-green-600" size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Loan Calculator</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Calculate Your Loan</h2>
            <form onSubmit={calculateLoan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter your laon amount"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="Enter your interest rate "
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Term (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    placeholder="Enter your loan term years"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold"
                >
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={resetCalculator}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition text-gray-600"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Results</h2>
            {result ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Wallet className="text-green-600" size={18} />
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                  </div>
                  <p className="text-3xl font-bold text-green-600">${result.monthlyPayment}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="text-blue-600" size={16} />
                      <p className="text-xs text-gray-600">Total Payment</p>
                    </div>
                    <p className="text-lg font-bold text-blue-600">${result.totalPayment}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <PieChart className="text-purple-600" size={16} />
                      <p className="text-xs text-gray-600">Total Interest</p>
                    </div>
                    <p className="text-lg font-bold text-purple-600">${result.totalInterest}</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-4 rounded-xl text-center text-sm text-gray-500">
                  <p>Based on ${parseFloat(loanAmount).toLocaleString()} loan at {interestRate}% for {loanTerm} years</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Calculator className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p>Enter your loan details</p>
                <p className="text-sm">and click Calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;