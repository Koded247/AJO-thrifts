import { useWallet } from '../hooks/useWallet'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  const { address, isConnected, connect, disconnect, connectError, isLoading } = useWallet()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-950/90 backdrop-blur-sm border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                AJO
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {!isConnected ? (
                <button
                  onClick={() => connect()}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isLoading 
                      ? 'bg-blue-800/50 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500'
                  }`}
                >
                  {isLoading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-blue-200">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                  <button
                    onClick={() => disconnect()}
                    className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Decentralized Group Savings
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Create or join group savings contracts, automate contributions, and manage payouts all on the blockchain.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/create"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/20"
              >
                Create Group
              </Link>
              <Link
                to="/join"
                className="px-8 py-3 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all hover:bg-blue-500/10"
              >
                Join Group
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-100">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-blue-900/20 border border-blue-800/50 hover:border-blue-700/50 transition-all">
              <h3 className="text-xl font-semibold mb-3 text-blue-200">Automated Savings</h3>
              <p className="text-blue-300">
                Set up recurring contributions with smart contracts that handle everything automatically.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-blue-900/20 border border-blue-800/50 hover:border-blue-700/50 transition-all">
              <h3 className="text-xl font-semibold mb-3 text-blue-200">Secure & Transparent</h3>
              <p className="text-blue-300">
                All transactions are recorded on the blockchain, ensuring complete transparency and security.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-blue-900/20 border border-blue-800/50 hover:border-blue-700/50 transition-all">
              <h3 className="text-xl font-semibold mb-3 text-blue-200">Stablecoin Support</h3>
              <p className="text-blue-300">
                Use USDC or USDT for all transactions, keeping your savings stable and secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-100">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-200">Create or Join</h3>
              <p className="text-blue-300">Start a new group or join an existing one</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-200">Set Schedule</h3>
              <p className="text-blue-300">Choose weekly or monthly contribution cycles</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-200">Contribute</h3>
              <p className="text-blue-300">Make regular contributions to the pool</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-200">Receive Payout</h3>
              <p className="text-blue-300">Get your turn to receive the pooled amount</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-blue-800/50">
        <div className="max-w-7xl mx-auto text-center text-blue-300">
          <p>© 2024 AJO - Decentralized Group Savings Platform</p>
        </div>
      </footer>
    </div>
  )
}