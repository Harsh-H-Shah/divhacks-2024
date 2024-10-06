const PORT = 5000;

const MONGODB_URI="mongodb://localhost:27017/Divhacks";

const AUTH0_AUDIENCE="http://localhost:5000/home";

const API_KEY='your_api_key_here';

const EMAIL_HOST='smtp';

const SECRET='899061220df56d924232768e87b9e16a452dedb0096da930da9016fd7921a1e2';
const AUTH0_BASE_URL='http://localhost:5000';
const AUTH0_CLIENT_ID ='tEbOD1IGeVTp5gyYC6kEmNizM0aFxQ9f';
const AUTH0_CLIENT_SECRET ='D6XL42ANdsl2umhzGRDzmIVDlDW46kXGQ5JMUJfIkLF655iyLOFG2TmlA5OvtvNm';
const AUTH0_ISSUER_BASE_URL='https://dev-bpuexkcfkpqy0ygn.us.auth0.com';
const express = require('express');
const router =  express.Router();
const {User} = require('../models'); // Assuming this is where we defined our User model
const { auth } = require('express-openid-connect');
// Middleware to parse JSON bodies
router.use(express.json());
const session = require('express-session');
// require('dotenv').config({path:'divhacks-2024\backend\.env'});

const config = {
  auth0Logout: true,
  baseURL: AUTH0_BASE_URL,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
};
router.use(auth(config));

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
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

router.post('/login/sms', async (req, res) => {
  try {
    const { phone_number } = req.body;

    const response = await axios.post(`${AUTH0_ISSUER_BASE_URL}/passwordless/start`, {
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      connection: 'sms',
      phone_number: phone_number,
      send: 'code'
    });

    res.json({ message: 'SMS sent successfully', ...response.data });
  } catch (error) {
    console.error('Error initiating passwordless login:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to initiate login' });
  }
});

// Route to verify the SMS code and complete login
router.post('/login/verify-sms', async (req, res) => {
  try {
    const { phone_number, code } = req.body;

    const response = await axios.post(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      username: phone_number,
      otp: code,
      realm: 'sms',
      scope: 'openid profile email'
    });

    res.json({ message: 'Login successful', ...response.data });
  } catch (error) {
    console.error('Error verifying SMS code:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to verify SMS code' });
  }
});


module.exports = router;