// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
contract AjoGroup is ReentrancyGuard {
    address[] public members;
    uint256 public memberCount;
    uint256 public contributionAmount;
    uint256 public totalCycles;
    uint256 public currentCycle;
    bool public isWeekly;
    bool public isActive;
    IERC20 public stablecoin;
    address public creator;
    mapping(address => bool) public hasJoined;
    mapping(address => uint256) public contributions;

    event MemberJoined(address indexed member);
    event ContributionMade(address indexed member, uint256 amount);
    event Disbursement(address indexed recipient, uint256 amount);

    constructor(
        uint256 _memberCount,
        bool _isWeekly,
        address _stablecoinAddress,
        uint256 _contributionAmount,
        uint256 _totalCycles,
        address _creator
    ) {
        memberCount = _memberCount;
        isWeekly = _isWeekly;
        stablecoin = IERC20(_stablecoinAddress);
        contributionAmount = _contributionAmount;
        totalCycles = _totalCycles;
        creator = _creator;
        currentCycle = 0;
        isActive = false;
    }

    function joinGroup() external {
        require(!isActive, "Group is already active");
        require(members.length < memberCount, "Group is full");
        require(!hasJoined[msg.sender], "Already joined");

        hasJoined[msg.sender] = true;
        members.push(msg.sender);
        emit MemberJoined(msg.sender);

        if (members.length == memberCount) {
            isActive = true;
        }
    }

    function contribute() external nonReentrant {
        require(isActive, "Group not active");
        require(hasJoined[msg.sender], "Not a member");
        require(currentCycle < totalCycles, "All cycles completed");
        require(contributions[msg.sender] < contributionAmount, "Already contributed");

        stablecoin.transferFrom(msg.sender, address(this), contributionAmount);
        contributions[msg.sender] += contributionAmount;
        emit ContributionMade(msg.sender, contributionAmount);
    }

    function disburse() external nonReentrant {
        require(isActive, "Group not active");
        require(hasJoined[msg.sender], "Not a member"); // Restrict to members
        require(currentCycle < totalCycles, "All cycles completed");
        require(allContributionsMade(), "Not all contributions made");

        address recipient = members[currentCycle % memberCount];
        uint256 payout = contributionAmount * memberCount;
        stablecoin.transfer(recipient, payout);
        emit Disbursement(recipient, payout);

        // Reset contributions for next cycle
        for (uint256 i = 0; i < members.length; i++) {
            contributions[members[i]] = 0;
        }
        currentCycle++;

        if (currentCycle >= totalCycles) {
            isActive = false;
        }
    }

    function allContributionsMade() internal view returns (bool) {
        for (uint256 i = 0; i < members.length; i++) {
            if (contributions[members[i]] < contributionAmount) {
                return false;
            }
        }
        return true;
    }

    function getStatus() external view returns (
        address[] memory _members,
        uint256 _currentCycle,
        uint256 _totalCycles,
        bool _isActive
    ) {
        return (members, currentCycle, totalCycles, isActive);
    }
}