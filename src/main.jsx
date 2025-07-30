import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { BrowserRouter } from 'react-router-dom';
import { ChainId } from '@thirdweb-dev/sdk';
import App from './App';
import './assets/styles/globals.css';

const activeChainId = ChainId.Mainnet;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);