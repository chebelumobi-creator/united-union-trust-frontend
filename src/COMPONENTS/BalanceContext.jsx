import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api";

const BalanceContext = createContext();

export const useBalance = () => useContext(BalanceContext);

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const res = await getProfile();
        setUser(res.data);
        setBalance(parseFloat(res.data.balance));
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const debitBalance = (amount) => {
    if (amount <= balance) {
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  const creditBalance = (amount) => {
    setBalance(prev => prev + amount);
    return true;
  };

  return (
    <BalanceContext.Provider value={{ balance, setBalance, user, setUser, loading, fetchProfile, debitBalance, creditBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};