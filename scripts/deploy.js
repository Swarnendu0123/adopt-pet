const hre = require("hardhat");



async function main() {
    console.log("Deployment started!");
   
    const [deployer] = await ethers.getSigners();
    const address = await deployer.getAddress();
   
    console.log(`Deploying the contract with the account: ${address}`);
   
    const PETS_COUNT = 5;
    const PetAdoption = await hre.ethers.getContractFactory("PetAdoption");
    const contract = await PetAdoption.deploy(PETS_COUNT);
    
    console.log(`PetAdoption deployed to ${contract.target}`);
  }
   
  main().catch(error => {
    console.log(error);
    process.exitCode = 1;
  });
  