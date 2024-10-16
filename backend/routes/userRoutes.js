const {contract, web3} = require('./server');
const express = require('express');
const router =  express.Router();
const {User} = require('../models'); // Assuming this is where we defined our User model
// Middleware to parse JSON bodies
router.use(express.json());

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);

    console.log(req.body);

    // Get the first account from Ganache to use for the transaction
    const accounts = await web3.eth.getAccounts();
    const senderAccount = accounts[0];

    // Call the registerUser function on your smart contract
    await contract.methods.registerUser(
      newUser.username, // Assuming your User model has a username field
      walletId = newUser.walletAddress // Assuming your User model has a walletAddress field
    ).send({
      from: senderAccount,
      gas: 1000000 // Adjust the gas limit as needed
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;