import { useContractRead, useContractWrite } from "wagmi";
import AjoFactoryABI from "../abis/AjoFactory.json";
import AjoGroupABI from "../abis/AjoGroup.json";

export const useAjoFactory = (factoryAddress: string) => {
  const createSavingsGroup = useContractWrite({
    address: factoryAddress as `0x${string}`,
    abi: AjoFactoryABI,
    functionName: "createSavingsGroup",
  });

  const getAllGroups = useContractRead({
    address: factoryAddress as `0x${string}`,
    abi: AjoFactoryABI,
    functionName: "getAllGroups",
  });

  return { createSavingsGroup, getAllGroups };
};

export const useAjoGroup = (groupAddress: string) => {
  const joinGroup = useContractWrite({
    address: groupAddress as `0x${string}`,
    abi: AjoGroupABI,
    functionName: "joinGroup",
  });

  const contribute = useContractWrite({
    address: groupAddress as `0x${string}`,
    abi: AjoGroupABI,
    functionName: "contribute",
  });

  const disburse = useContractWrite({
    address: groupAddress as `0x${string}`,
    abi: AjoGroupABI,
    functionName: "disburse",
  });

  const getStatus = useContractRead({
    address: groupAddress as `0x${string}`,
    abi: AjoGroupABI,
    functionName: "getStatus",
  });

  return { joinGroup, contribute, disburse, getStatus };
};