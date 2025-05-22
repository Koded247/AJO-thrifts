// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors'

if (!import.meta.env.VITE_WAGMI_PROJECT_ID) {
  console.error('Missing VITE_WAGMI_PROJECT_ID in .env file')
}

const config = createConfig({
  autoConnect: true,
  connectors: [
    metaMask(),
    coinbaseWallet(),
    walletConnect({
      projectId: import.meta.env.VITE_WAGMI_PROJECT_ID,
      showQrModal: true,
    })
  ],
  chains: [sepolia],
  transports: {
    [sepolia.id]: http()
  },
  projectId: import.meta.env.VITE_WAGMI_PROJECT_ID,
  onError: (error) => {
    console.error('Wagmi error:', error)
  }
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>,
)