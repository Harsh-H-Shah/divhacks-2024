const {contract, web3} = require('../server');
const express = require('express');
const router =  express.Router();
const {User} = require('../models'); // Assuming this is where we defined our User model
// Middleware to parse JSON bodies
router.use(express.json());

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Get the first account from Ganache to use for the transaction
    // const accounts = await web3.eth.getAccounts();
    // const senderAccount = accounts[0];

    console.log("Received data:", { username, email, profile });

    // Create a new user object
    const newUser = {
      username,
      email,
      password, // Note: In a real application, you should hash this password before saving
      profile: {
        skills: profile.skills || [],
        education: profile.education || [],
        bio: profile.bio || '',
      }
    };

    // Call the registerUser function on your smart contract
    // await contract.methods.registerUser(
    //   newUser.username,
    //   newUser.email // Using email as walletId for this example
    // ).send({
    //   from: senderAccount,
    //   gas: 1000000 // Adjust the gas limit as needed
    // });

    // console.log("User registered on blockchain");

    // Here you would typically save the user to your database
    const savedUser = await User.create(newUser);

    // Send back the user data (excluding the password)
    const userResponse = {
      username: newUser.username,
      email: newUser.email,
      profile: newUser.profile
    };

    res.status(201).json(userResponse);

  } catch (error) {
    console.error("Error during user registration:", error);
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

// router.post('/login', async (req, res) => {
//   try {
//     const {username, password} = req.body;
//     const user = await User.findOne({ username });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Filter sensitive data and structure the response
//     const userResponse = {
//       username: user.username,
//       email: user.email,
//       profile: {
//         skills: user.profile.skills,
//         education: user.profile.education,
//         bio: user.profile.bio
//       },
//       EP: user.EP
//     };

//     res.json(userResponse);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found or password doesn't match
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Prepare user data to send back
    const userResponse = {
      username: user.username,
      email: user.email,
      auth0_id: user.auth0_id,
      wallet_addr: user.wallet_addr,
      profile: {
        bio: user.profile.bio,
        education: user.profile.education,
        skills: user.profile.skills,
      },
      EP: user.EP,
    };

    res.json({
      message: "Login successful",
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "An error occurred during login" });
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