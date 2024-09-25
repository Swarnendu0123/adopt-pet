// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract PetAdoption{
    // Struct to store pet details
    struct Pet {
        uint256 id;
        string category;
        string breed;
    }
    address private immutable i_owner;
    // Number of pets added, will also be used as pet id and index
    uint256 private petsNumber;

    Pet[] private allPets;
    mapping(uint256 => address) private petIdToOwner;
    mapping(address => uint256[]) private ownerToPetIds;

    constructor(){
        i_owner = msg.sender;
        petsNumber = 0; 
    }
    // Get pet details as args, create a pet struct, push struct to allPets array, increment petsNumber
    function addPet(string memory category, string memory breed) public {
        require(msg.sender == i_owner, "You are not a contract owner.");
        Pet memory pet = Pet(petsNumber, category, breed);
        allPets.push(pet);
        petsNumber++;
    }
    // Get pet index as args, check if pet is not adopted, set pet owner to msg.sender, push adopted pet index to ownerToPets mapping
    function adoptPet(uint256 adoptIdx) public{
        require(adoptIdx < petsNumber, "Out of range");
        require(petIdToOwner[adoptIdx] == address(0), "Pet already adopted");
        petIdToOwner[adoptIdx] = msg.sender;
        ownerToPetIds[msg.sender].push(adoptIdx);
    }

    function getOwner() public view returns(address){
        return i_owner;   
    }
    // Get owner as args, get all adopted pets ids, loop through all pets, if pet is adopted, push to adoptedPets array
    function getAllAdoptedPetsByOwner(address owner) public view returns(Pet[] memory){
        uint256[] memory adoptedPetIds = ownerToPetIds[owner];
        if(adoptedPetIds.length == 0){
            return new Pet[](0);
        }
        Pet[] memory adoptedPets = new Pet[](adoptedPetIds.length);
        for(uint256 i = 0; i < adoptedPetIds.length; i++){
            adoptedPets[i] = allPets[adoptedPetIds[i]];
        }

        return adoptedPets;
    }

    function getAllPets() public view returns(Pet[] memory){
        return allPets;
    }
    
    // Get all pets, create a new pet array, loop through all pets, if pet is adopted, push to adoptedPets array
    function getAllAdoptedPets() public view returns (Pet[] memory) {
        uint256 count = 0;
        for(uint256 i = 0; i < petsNumber; i++){
            if(petIdToOwner[i] != address(0)){
                count++;
            }
        }
        if(count == 0){
            return new Pet[](0);
        }
        Pet[] memory adoptedPets = new Pet[](count);
        uint256 index = 0;
        for(uint256 i = 0; i < petsNumber; i++){
            if(petIdToOwner[i] != address(0)){
                adoptedPets[index] = allPets[i];
                index++;
            }
        }
        return adoptedPets;
    }

    // Get all pets, create a new pet array, loop through all pets, if pet is not adopted, push to unadoptedPets array
    function getAllUnadoptedPets() public view returns (Pet[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < petsNumber; i++) {
            if (petIdToOwner[i] == address(0)) {
                count++;
            }
        }
        if (count == 0) {
            return new Pet[](0);
        }

        Pet[] memory unadoptedPets = new Pet[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < petsNumber; i++) {
            if (petIdToOwner[i] == address(0)) {
                unadoptedPets[index] = allPets[i];
                index++;
            }
        }
        return unadoptedPets;
    }
}