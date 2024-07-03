const { expect } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

describe("PetAdoption", function () {

    async function deployContract() {
        const PET_COUNT = 5;
        const ADOPTED_PET_INDEX = 2;
        const [owner, account2, account3] = await ethers.getSigners();
        const PetAdoption = await ethers.getContractFactory("PetAdoption");
        const contract = await PetAdoption.deploy(PET_COUNT);

        await contract.connect(account3).adoptPet(ADOPTED_PET_INDEX);
        return {
            owner, account2, account3,
            contract,
            petsAddedCount: PET_COUNT,
            adoptedPetIndex: ADOPTED_PET_INDEX
        };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { owner, contract } = await loadFixture(deployContract);
            const contractOwner = await contract.owner();
            expect(contractOwner).to.equal(owner.address);
        });

        it("Shoult return the right owner", async function () {
            const { owner, contract } = await loadFixture(deployContract);
            const contractOwner = await contract.getOwner();
            expect(contractOwner).to.equal(owner.address);
        });
    });


    describe("Add pet function", function () {
        it("Should revert the right error in case of other account", async function () {
            const { owner, contract, account2 } = await loadFixture(deployContract);

            await expect(contract.connect(account2).addPet()).to.be.revertedWith("You are not a contract owner");
        });

        it("Should increse pet index", async function () {
            const { contract, petsAddedCount } = await loadFixture(deployContract);

            await contract.addPet();
            const returnedPetIndex = await contract.petIndex();
            expect(returnedPetIndex).to.equal(petsAddedCount + 1)
        });
    });

    describe("Adopt pet", function () {
        it("Should revert with index out of range", async function () {
            const { contract, petsAddedCount } = await loadFixture(deployContract);

            await expect(contract.adoptPet(5)).to.be.revertedWith("Pet index out of range");
            await expect(contract.adoptPet(-1)).to.be.rejectedWith("value out-of-bounds");
        })

        it("Should revert with pet already adopted", async function () {
            const { contract, adoptedPetIndex, account2 } = await loadFixture(deployContract);
            await expect(contract.connect(account2).adoptPet(adoptedPetIndex)).to.be.revertedWith("Pet already adopted");
        });
    });
});