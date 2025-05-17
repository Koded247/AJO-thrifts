import { ethers } from "hardhat";

async function main() {
  const AjoFactory = await ethers.getContractFactory("AjoFactory");
  const factory = await AjoFactory.deploy();
  await factory.deployed();
  console.log("AjoFactory deployed to:", factory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});