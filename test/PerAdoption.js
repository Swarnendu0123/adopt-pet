const { expect } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

describe("PetAdoption", function () {

    async function deployContract(){
        const PET_COUNT = 5;
        const [owner, account2] = await ethers.getSigners();
        const PetAdoption = await ethers.getContractFactory("PetAdoption");
        const contract = await PetAdoption.deploy(PET_COUNT);

        return {owner, contract, account2, petsAddedCount: PET_COUNT};
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const {owner, contract} = await loadFixture(deployContract);
            const contractOwner = await contract.owner();
            expect(contractOwner).to.equal(owner.address);
        });

        it("Shoult return the right owner", async function(){
            const {owner, contract} = await loadFixture(deployContract);
            const contractOwner = await contract.getOwner();
            expect(contractOwner).to.equal(owner.address);
        });
    });


    describe("Add pet function", function () {
        it("Should revert the right error in case of other account", async function() {
            const {owner, contract, account2} = await loadFixture(deployContract);

            await expect(contract.connect(account2).addPet()).to.be.revertedWith("You are not a contract owner");
        });

        it("Should increse pet index", async function() {
            const { contract, petsAddedCount} = await loadFixture(deployContract);
            
            await contract.addPet();
            const returnedPetIndex = await contract.petIndex();
            expect(returnedPetIndex).to.equal(petsAddedCount+1)
        });
    });
});