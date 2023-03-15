const { ethers, upgrades } = require("hardhat"); 

 
require("dotenv").config(); 
 
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS; 
 
async function main() { 
  [deployer] = await ethers.getSigners();

  const TokenERC = await ethers.getContractAt("MyToken", TOKEN_ADDRESS); 
 
  console.log("Deploying contracts with the account:", deployer.address); 
 
  //set Admin 
  const setAdmin = await TokenERC.setAdmin(process.env.ADMIN_ADDRESS, "true"); 
  await setAdmin.wait(); 
  // console.log("admin is ",)
} 
 
main() 
  .then(async () => { 
    process.exit(); 
  }) 
  .catch((error) => { 
    console.log(error); 
    process.exit(1); 
  });