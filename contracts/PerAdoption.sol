// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

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

    function addPet() public {
        require(msg.sender == owner, "You are not a contract owner");
        petIndex++;
    }

    function adoptPet(uint adoptIdx) public {
        require(adoptIdx < petIndex, "Pet index out of range");
        require(petToOwner[adoptIdx] == address(0), "Pet already adopted");
        petToOwner[adoptIdx] = msg.sender;
        ownerToPets[msg.sender].push(adoptIdx);
    }

    function getOwner() public view returns(address){
        return owner;   
    }
}