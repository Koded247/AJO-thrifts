import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors'

export const useWallet = () => {
  const { address, isConnected } = useAccount()
  const { connectAsync, error: connectError, isLoading } = useConnect({
    onError: (error) => {
      console.error('Connection error:', error)
    },
    onSuccess: (data) => {
      console.log('Connected successfully:', data)
    }
  })
  const { disconnect } = useDisconnect()

  const connect = async () => {
    try {
      // This will show the wallet modal with all available options
      await connectAsync()
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  return {
    address,
    isConnected,
    connect,
    disconnect,
    connectError,
    isLoading
  }
} 