const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {ethers} = require("hardhat")

describe("Bookings and Rewards", function(){
  
  it("Should set the owner after deployment", async function(){
    const BookingRewards = await ethers.getContractFactory("BookingRewards");
    const [owner] = await ethers.getSigners();
    const bookingRewards = await BookingRewards.deploy(owner.address);

    expect(await bookingRewards.owner()).to.equal(owner.address);

  })

  it("Should allow the owner to rate an instructor and update details", async function(){
    const BookingRewards = await ethers.getContractFactory("BookingRewards");
    const [owner, addressOne] = await ethers.getSigners();
    const bookingRewards = await BookingRewards.deploy(owner.address);

   await bookingRewards.connect(owner).rateInstructor(addressOne.address, 5);
   const [rewardPoints, totalStars] = await bookingRewards.getInstructorReport(addressOne.address);
   expect(rewardPoints).to.equal(50);
   expect(totalStars).to.equal(5);
  })

  it("Should not allow not the owner to rate instructors", async function(){
    const BookingRewards = await ethers.getContractFactory("BookingRewards");
    const [owner, addressOne, addressTwo] = await ethers.getSigners();
    const bookingRewards = await BookingRewards.deploy(owner.address);


    await expect(
      bookingRewards.connect(addressOne).rateInstructor(addressTwo.address, 3)
    ).to.be.reverted
  })

  it("Should Revert if stars are not in valid range", async function(){
    const BookingRewards = await ethers.getContractFactory("BookingRewards");
    const [owner, addressOne] = await ethers.getSigners();
    const bookingRewards = await BookingRewards.deploy(owner.address);


    await expect(
      bookingRewards.connect(owner).rateInstructor(addressOne.address, 6)
    ).to.be.reverted
    await expect(
      bookingRewards.connect(owner).rateInstructor(addressOne.address, 0)
    ).to.be.reverted

  })

  it("Instructors should be able to check their own reward points", async function(){
    const BookingRewards = await ethers.getContractFactory("BookingRewards");
    const [owner, addressOne] = await ethers.getSigners();
    const bookingRewards = await BookingRewards.deploy(owner.address);

    await bookingRewards.connect(owner).rateInstructor(addressOne, 5);
    expect(await bookingRewards.connect(addressOne).checkRewards()).to.equal(50);
  })
})