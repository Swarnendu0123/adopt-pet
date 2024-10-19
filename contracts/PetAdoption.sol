// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// import "hardhat/console.sol";

contract PetAdoption{
    address public owner;
    uint public petIndex = 0;
    uint[] public allAdoptedPets;

    mapping(uint => address) public petToOwner;
    mapping(address => uint[]) public ownerToPets;

    constructor(uint initialPetIndex){
        owner = msg.sender;
        petIndex = initialPetIndex; 
    }

modifier onlyOwner() {
    require(msg.sender == owner, "You are not the contract owner.");
    _;
}

event PetAdopted(address indexed owner, uint petId);

    function addPet() public onlyOwner {
    ++petIndex;
}

    function adoptPet(uint petId) public {
    uint currentPetIndex = petIndex; // Cache state variable
    require(petId < currentPetIndex, "Pet index out of range");
    require(petToOwner[petId] == address(0), "Pet already adopted");

    petToOwner[petId] = msg.sender;
    uint[] storage pets = ownerToPets[msg.sender];
    pets.push(petId);
    allAdoptedPets.push(petId);

    emit PetAdopted(msg.sender, petId);
}



    function getOwner() public view returns(address){
        return owner;   
    }

    function getAllAdoptedPetsByOwner() public view returns(uint[] memory){
        return ownerToPets[msg.sender];
    }

    function getAllAdoptedPets()  public view returns (uint[] memory) {
        return allAdoptedPets;
    }
}
