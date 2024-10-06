const EduPoints = artifacts.require("EduPoints");
const { expectRevert } = require('@openzeppelin/test-helpers');

contract("EduPoints", function (accounts) {
  const [owner, user1, user2] = accounts;
  const initialSupply = web3.utils.toWei("1000000", "ether"); // 1 million tokens
  let eduPointsInstance;

  beforeEach(async function () {
    eduPointsInstance = await EduPoints.new(initialSupply, { from: owner });
  });

  describe("Initialization", function () {
    it("should set the correct token name and symbol", async function () {
      const name = await eduPointsInstance.name();
      const symbol = await eduPointsInstance.symbol();
      assert.equal(name, "EducationPoint");
      assert.equal(symbol, "EP");
    });

    it("should mint the initial supply to the owner", async function () {
      const ownerBalance = await eduPointsInstance.balanceOf(owner);
      assert.equal(ownerBalance.toString(), initialSupply);
    });
  });

  describe("Minting", function () {
    it("should allow the owner to mint new tokens", async function () {
      const amountToMint = web3.utils.toWei("10", "ether");
      await eduPointsInstance.mint(user1, amountToMint, { from: owner });
      const user1Balance = await eduPointsInstance.balanceOf(user1);
      assert.equal(user1Balance.toString(), amountToMint);
    });

    it("should not allow non-owners to mint tokens", async function () {
      const amountToMint = web3.utils.toWei("10", "ether");
      await expectRevert(
        eduPointsInstance.mint(user1, amountToMint, { from: user1 }),
        "VM Exception while processing transaction: revert -- Reason given: Custom error (could not decode)."
      );
    });
  });

  describe("Burning", function () {
    it("should allow users to burn their own tokens", async function () {
      const amountToMint = web3.utils.toWei("1000", "ether");
      const amountToBurn = web3.utils.toWei("500", "ether");
      await eduPointsInstance.mint(user1, amountToMint, { from: owner });
      await eduPointsInstance.burn(amountToBurn, { from: user1 });
      const user1Balance = await eduPointsInstance.balanceOf(user1);
      assert.equal(user1Balance.toString(), web3.utils.toWei("500", "ether"));
    });

    // it("should not allow users to burn more tokens than they have", async function () {
    //   const amountToMint = web3.utils.toWei("1000", "ether");
    //   const amountToBurn = web3.utils.toWei("1500", "ether");
    //   await eduPointsInstance.mint(user1, amountToMint, { from: owner });
    //   await expectRevert(
    //     eduPointsInstance.burn(amountToBurn, { from: user1 }),
    //     "ERC20: burn amount exceeds balance"
    //   );
    // });
  });

  describe("Transfer", function () {
    it("should allow users to transfer tokens", async function () {
      const amountToMint = web3.utils.toWei("1000", "ether");
      const amountToTransfer = web3.utils.toWei("500", "ether");
      await eduPointsInstance.mint(user1, amountToMint, { from: owner });
      await eduPointsInstance.transfer(user2, amountToTransfer, { from: user1 });
      const user1Balance = await eduPointsInstance.balanceOf(user1);
      const user2Balance = await eduPointsInstance.balanceOf(user2);
      assert.equal(user1Balance.toString(), web3.utils.toWei("500", "ether"));
      assert.equal(user2Balance.toString(), amountToTransfer);
    });
  });
});