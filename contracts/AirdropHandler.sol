// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MyToken.sol";

contract airdropHandler is IERC20 {

    event Airdrop(address indexed sender, uint256 amount, uint256 totalAmount);

    mapping(address => bool) public whitelist;

    constructor(string memory name, string memory symbol) MyToken(name, symbol) {}

    function airdrop(address[] memory recipients, uint256 amount) public {
        require(recipients.length > 0, "No recipients specified");

        uint256 totalAmount = amount * recipients.length;

        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            require(whitelist[recipient], "Recipient is not whitelisted");
            _mint(recipient, amount);
        }

        emit Airdrop(msg.sender, amount, totalAmount);
    }
}