import { useState } from "react";
import { useAjoFactory } from "../hooks/useAjoContract";
import { ethers } from "ethers";

export default function CreateGroup() {
  const [memberCount, setMemberCount] = useState("");
  const [isWeekly, setIsWeekly] = useState(true);
  const [contributionAmount, setContributionAmount] = useState("");
  const [totalCycles, setTotalCycles] = useState("");
  const factoryAddress = "YOUR_DEPLOYED_FACTORY_ADDRESS";

  const { createSavingsGroup } = useAjoFactory(factoryAddress);

  const handleCreate = async () => {
    await createSavingsGroup.write({
      args: [
        Number(memberCount),
        isWeekly,
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC address
        ethers.parseUnits(contributionAmount, 6),
        Number(totalCycles),
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Create Savings Group</h1>
      <div className="max-w-md mx-auto space-y-4">
        <input
          type="number"
          placeholder="Number of Members"
          value={memberCount}
          onChange={(e) => setMemberCount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={isWeekly ? "weekly" : "monthly"}
          onChange={(e) => setIsWeekly(e.target.value === "weekly")}
          className="w-full p-2 border rounded"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="number"
          placeholder="Contribution Amount (USDC)"
          value={contributionAmount}
          onChange={(e) => setContributionAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Total Cycles"
          value={totalCycles}
          onChange={(e) => setTotalCycles(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-6 py-3 rounded-lg"
        >
          Create Group
        </button>
      </div>
    </div>
  );
}