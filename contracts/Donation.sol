// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Donation {
    event Donated(address indexed donor, uint256 amount, string message);

    struct DonationRecord {
        address donor;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    DonationRecord[] public donations;

    function donate(string calldata message) external payable {
        require(msg.value > 0, "Donation must be greater than 0");
        donations.push(DonationRecord({
            donor: msg.sender,
            amount: msg.value,
            message: message,
            timestamp: block.timestamp
        }));
        emit Donated(msg.sender, msg.value, message);
    }

    function getDonationsCount() external view returns (uint256) {
        return donations.length;
    }

    function getDonation(uint256 index) external view returns (address, uint256, string memory, uint256) {
        require(index < donations.length, "Index out of bounds");
        DonationRecord storage record = donations[index];
        return (record.donor, record.amount, record.message, record.timestamp);
    }
}
