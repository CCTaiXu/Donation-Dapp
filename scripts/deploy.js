// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const Donation = await ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();
  await donation.waitForDeployment();
  console.log("Donation deployed to:", donation.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
