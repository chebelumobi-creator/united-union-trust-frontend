
import React, { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom"
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import Home from './PAGES/Home'
import PinScreen from './PAGES/PinScreen'
import Bill from './PAGES/Bill'
import SendMoney from './PAGES/SendMoney'
import Success from './PAGES/Success'
import Register from './PAGES/Register'
import AccountInfo from './QIUCKACTIONS/AccountInfo'
import Balance from './QIUCKACTIONS/Balance'
import Deposit from './QIUCKACTIONS/Deposit'
import History from './QIUCKACTIONS/History'
import ScanAndPay from './QIUCKACTIONS/ScanAndPay'
import Statements from './QIUCKACTIONS/Statements'
import Withdraw from './QIUCKACTIONS/Withdraw'
import Cards from './PAGES/Cards'
import Payments from './PAGES/Payments'
import Settings from './PAGES/Settings'
import LoanCalculator from './PAGES/LoanCalculator'
import { BalanceProvider } from './COMPONENTS/BalanceContext'
import BranchLocator from './PAGES/BranchLocator'
import ReferEarn from './PAGES/ReferEarn'
import FAQ from './PAGES/FAQ'
import Contact from './PAGES/Contact';

const App = () => {
  const [showTawk, setShowTawk] = useState(false)

  useEffect(() => {
    // Load tawk.to after 3 seconds to avoid interfering with API calls
    const timer = setTimeout(() => {
      setShowTawk(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <BalanceProvider>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pin' element={<PinScreen/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Bill/>}/>
          <Route path='/send' element={<SendMoney/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/account-info' element={<AccountInfo/>}/>
          <Route path='/deposit' element={<Deposit/>}/>
          <Route path='/history' element={<History/>}/>
          <Route path='/balance' element={<Balance/>}/>
          <Route path='/scan-and-pay' element={<ScanAndPay/>}/> 
          <Route path='/withdraw' element={<Withdraw/>}/>
          <Route path='/statements' element={<Statements/>}/>
          <Route path='/cards' element={<Cards/>}/>
          <Route path='/payments' element={<Payments/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/loan-calculator' element={<LoanCalculator/>}/>
          <Route path='/branches' element={<BranchLocator/>}/>
          <Route path='/refer' element={<ReferEarn/>}/>
          <Route path='/faq' element={<FAQ/>}/>
          <Route path='/contact' element={<Contact/>}/>
          
        </Routes>

        {/* Tawk.to loads after 3 seconds delay */}
        {showTawk && (
          <TawkMessengerReact
            propertyId="6a303fd5e527571d4c0ee7db"
            widgetId="1jr67imtu"
          />
        )}
      </div>
    </BalanceProvider>
  )
}

export default App