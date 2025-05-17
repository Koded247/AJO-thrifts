// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AjoGroup.sol";

contract AjoFactory is Ownable {
    address[] public groups;
    event GroupCreated(address indexed groupAddress, address creator, uint256 memberCount, bool isWeekly);

    constructor() Ownable(msg.sender) {}

    function createSavingsGroup(
        uint256 _memberCount,
        bool _isWeekly,
        address _stablecoinAddress,
        uint256 _contributionAmount,
        uint256 _totalCycles
    ) external returns (address) {
        AjoGroup newGroup = new AjoGroup(
            _memberCount,
            _isWeekly,
            _stablecoinAddress,
            _contributionAmount,
            _totalCycles,
            msg.sender
        );
        groups.push(address(newGroup));
        emit GroupCreated(address(newGroup), msg.sender, _memberCount, _isWeekly);
        return address(newGroup);
    }

    function getAllGroups() external view returns (address[] memory) {
        return groups;
    }
}