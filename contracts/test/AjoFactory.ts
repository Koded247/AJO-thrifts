import { expect } from "chai";
import { ethers } from "hardhat";

describe("AjoFactory and AjoGroup", function () {
  it("Should create a savings group and handle manual disbursement", async function () {
    const [owner, member1, member2] = await ethers.getSigners();
    const AjoFactory = await ethers.getContractFactory("AjoFactory");
    const factory = await AjoFactory.deploy();
    await factory.deployed();

    // Deploy a mock ERC20 token for testing
    const ERC20 = await ethers.getContractFactory("MockERC20");
    const stablecoin = await ERC20.deploy("USDC", "USDC", 6);
    await stablecoin.deployed();

    // Create a savings group
    const tx = await factory.createSavingsGroup(
      2,
      true,
      stablecoin.address,
      ethers.parseUnits("10", 6), // 10 USDC
      2
    );
    const receipt = await tx.wait();
    const groupAddress = receipt.events?.[0].args?.groupAddress;
    const group = await ethers.getContractAt("AjoGroup", groupAddress);

    // Members join
    await group.connect(member1).joinGroup();
    await group.connect(member2).joinGroup();

    // Approve and contribute
    await stablecoin.connect(member1).approve(groupAddress, ethers.parseUnits("100", 6));
    await stablecoin.connect(member2).approve(groupAddress, ethers.parseUnits("100", 6));
    await stablecoin.mint(member1.address, ethers.parseUnits("100", 6));
    await stablecoin.mint(member2.address, ethers.parseUnits("100", 6));
    await group.connect(member1).contribute();
    await group.connect(member2).contribute();

    // Manual disbursement
    const initialBalance = await stablecoin.balanceOf(member1.address);
    await group.connect(member1).disburse();
    const finalBalance = await stablecoin.balanceOf(member1.address);
    expect(finalBalance.sub(initialBalance)).to.equal(ethers.parseUnits("20", 6)); // 2 * 10 USDC
  });
});

// Mock ERC20 for testing
const MockERC20 = `
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.20;
  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
  contract MockERC20 is ERC20 {
      uint8 private _decimals;
      constructor(string memory name, string memory symbol, uint8 decimals_) ERC20(name, symbol) {
          _decimals = decimals_;
      }
      function decimals() public view virtual override returns (uint8) {
          return _decimals;
      }
      function mint(address to, uint256 amount) public {
          _mint(to, amount);
      }
  }
`;
