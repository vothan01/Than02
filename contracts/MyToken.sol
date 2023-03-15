// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    event Airdrop(address indexed sender, uint256 amount, uint256 totalAmount);

    mapping(address => bool) public whitelist;
    mapping(address => bool) public admins;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Load name and symbol from .env file
    }

    function airdrop(address[] memory recipients, uint256 amount) public onlyOwner {
        require(recipients.length > 0, "No recipients specified");

        uint256 totalAmount = amount * recipients.length;
        //require(totalAmount <= balanceOf(address(this)), "Insufficient balance for airdrop");

        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            require(whitelist[recipient], "Recipient is not whitelisted");
            _mint(recipient, amount);
        }

        emit Airdrop(msg.sender, amount, totalAmount);
    }

    function addWhitelisted(address account) public onlyAdmin {
        whitelist[account] = true;
    }

    function removeWhitelisted(address account) public onlyAdmin {
        whitelist[account] = false;
    }

    function addAdmin(address account) public onlyOwner {
        admins[account] = true;
    }

    function removeAdmin(address account) public onlyOwner {
        admins[account] = false;
    }

    function setAdmin(address account, bool status) public onlyOwner {
        admins[account] = status;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admins can perform this action");
        _;
    }
}
