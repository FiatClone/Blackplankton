import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './contexts/Web3Context';
import { ThemeProvider } from './contexts/ThemeContext';
import { ComicProvider } from './contexts/ComicContext';
import { AirdropProvider } from './contexts/AirdropContext';
import Layout from './components/core/Layout';
import Header from './components/core/Header';
import Footer from './components/core/Footer';
import DashboardPage from './pages/DashboardPage';
import AirdropPage from './pages/AirdropPage';
import ComicPage from './pages/ComicPage';
import StakePage from './pages/StakePage';
import SwapPage from './pages/SwapPage';
import LiquidityPage from './pages/LiquidityPage';
import GovernancePage from './pages/GavernancePage';
import ErrorPage from './pages/ErrorPage';
import NotificationContainer from './components/ui/notification/NotificationContainer';

function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <ComicProvider>
          <AirdropProvider>
            <Router>
              <div className="flex flex-col min-h-screen bg-gray-900 text-white">
                <Header />
                <Layout>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/swap" element={<SwapPage />} />
                    <Route path="/stake" element={<StakePage />} />
                    <Route path="/liquidity" element={<LiquidityPage />} />
                    <Route path="/comics" element={<ComicPage />} />
                    <Route path="/airdrop" element={<AirdropPage />} />
                    <Route path="/gavernance" element={<GavernancePage />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </Layout>
                <Footer />
                <NotificationContainer />
              </div>
            </Router>
          </AirdropProvider>
        </ComicProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
