import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'swap', element: <SwapPage /> },
      { path: 'stake', element: <StakePage /> },
      { path: 'liquidity', element: <LiquidityPage /> },
      { path: 'buy', element: <BuyPage /> },
      { path: 'chart', element: <ChartPage /> },
      { path: 'comic', element: <ComicPage /> },
      { path: 'airdrop', element: <AirdropPage /> },
    ],
  },
]);

export default router;