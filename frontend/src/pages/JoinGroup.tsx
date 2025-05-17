import { useState } from "react";
import { useAjoGroup } from "../hooks/useAjoContract";

export default function JoinGroup() {
  const [groupAddress, setGroupAddress] = useState("");
  const { joinGroup, getStatus } = useAjoGroup(groupAddress);

  const handleJoin = async () => {
    await joinGroup.write();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Join Savings Group</h1>
      <div className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Group Contract Address"
          value={groupAddress}
          onChange={(e) => setGroupAddress(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleJoin}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Join Group
        </button>
        {getStatus.data && (
          <div>
            <p>Members: {getStatus.data[0].join(", ")}</p>
            <p>Current Cycle: {getStatus.data[1].toString()}</p>
            <p>Total Cycles: {getStatus.data[2].toString()}</p>
            <p>Active: {getStatus.data[3] ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
}