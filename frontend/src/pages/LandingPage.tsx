import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to AJO</h1>
      <p className="text-lg mb-8">Join or create decentralized group savings with ease.</p>
      {!isConnected ? (
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      ) : (
        <div className="space-y-4">
          <p>Connected as: {address}</p>
          <Link to="/create" className="bg-green-500 text-white px-6 py-3 rounded-lg">
            Create Group
          </Link>
          <Link to="/join" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
            Join Group
          </Link>
        </div>
      )}
    </div>
  );
}