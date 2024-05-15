// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BookingRewards is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}




struct Instructor{
    uint256 rewardPoints;
    uint256 totalStars;
}

mapping(address => Instructor) public instructors;

//function for admins to rate instructors
function rateInstructor(address _teacherWallet, uint stars) public onlyOwner{

require(stars > 0 && stars <= 5, "Star rating must be between 1 and 5");
instructors[_teacherWallet].totalStars += stars;
instructors[_teacherWallet].rewardPoints += stars * 10;

}

function checkRewards() public view returns (uint){
    return instructors[msg.sender].rewardPoints;
}

function getInstructorReport(address _teacherWallet) public view returns(uint256 rewardPoints, uint256 totalStars) {
    Instructor memory instructor = instructors[_teacherWallet];
    return (instructor.rewardPoints, instructor.totalStars);

}

}
