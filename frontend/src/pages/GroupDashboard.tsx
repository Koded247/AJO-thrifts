import { useAjoGroup } from "../hooks/useAjoContract";
import { useParams } from "react-router-dom";
import { useContractRead } from "wagmi";
import AjoGroupABI from "../abis/AjoGroup.json";

export default function GroupDashboard() {
  const { groupAddress } = useParams<{ groupAddress: string }>();
  const { contribute, disburse, getStatus } = useAjoGroup(groupAddress!);

  // Check if all contributions are made
  const { data: canDisburse } = useContractRead({
    address: groupAddress as `0x${string}`,
    abi: AjoGroupABI,
    functionName: "allContributionsMade",
  });

  const handleContribute = async () => {
    await contribute.write();
  };

  const handleDisburse = async () => {
    await disburse.write();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Group Dashboard</h1>
      {getStatus.data && (
        <div className="max-w-md mx-auto space-y-4">
          <p>Members: {getStatus.data[0].join(", ")}</p>
          <p>Current Cycle: {getStatus.data[1].toString()}</p>
          <p>Total Cycles: {getStatus.data[2].toString()}</p>
          <p>Active: {getStatus.data[3] ? "Yes" : "No"}</p>
          <button
            onClick={handleContribute}
            className="bg-green-500 text-white px-6 py-3 rounded-lg"
            disabled={!getStatus.data[3]} // Disable if group is not active
          >
            Contribute
          </button>
          <button
            onClick={handleDisburse}
            className={`px-6 py-3 rounded-lg ${
              canDisburse && getStatus.data[3]
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!canDisburse || !getStatus.data[3]} // Enable only if all contributions made and group is active
          >
            Disburse
          </button>
        </div>
      )}
    </div>
  );
}