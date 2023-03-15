const { ethers, upgrades } = require("hardhat"); 
 
require("dotenv").config(); 
 
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS; 
const RECEIVER_ADDRESS = process.env.RECEIVER_ADDRESS.split(","); 
const AMOUNT = process.env.AMOUNT; 
 
async function main() { 
  [deployer] = await ethers.getSigners(); 
  const TokenERC = await ethers.getContractAt("MyToken", TOKEN_ADDRESS); 
 
  console.log("Deploying contracts with the account:", deployer.address); 
 
  //airdrop (receiver, amount) 
  const airdrop = await TokenERC.airdrop(RECEIVER_ADDRESS, AMOUNT); 
  await airdrop.wait(); 
} 
 
main() 
  .then(async () => { 
    process.exit(); 
  }) 
  .catch((error) => { 
    console.log(error); 
    process.exit(1); 
  });