const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("Deployment started!");

  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log(`Deploying the contract with the account: ${address}`);

  const PetAdoption = await hre.ethers.getContractFactory("PetAdoption");
  const contract = await PetAdoption.deploy();

  console.log(`PetAdoption deployed to ${contract.address}`);

  saveContractFiles(contract);

  await savePets(contract);
  console.log("Deployment finished!");
  const pets = await contract.getAllPets();
  console.log(pets);
}

async function savePets(contract) {
  await contract.addPet("Dog", "Scottish Terrier");
  await contract.addPet("Dog", "German Shepherd");
  await contract.addPet("Dog", "Golden Retriever");
  await contract.addPet("Dog", "Poodle");
  await contract.addPet("Dog", "Boxer");
}

function saveContractFiles(contract) {
  const contractDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir);
  }

  fs.writeFileSync(
    path.join(contractDir, `contract-address-${hre.network.name}.json`),
    JSON.stringify({PetAdoption: contract.target}, null, 2)
  );

  const PetAdoptionArtifact = hre.artifacts.readArtifactSync("PetAdoption");

  fs.writeFileSync(
    path.join(contractDir, "PetAdoption.json"),
    JSON.stringify(PetAdoptionArtifact, null, 2)
  );
}

main().catch(error => {
  console.log(error);
  process.exitCode = 1;
});
