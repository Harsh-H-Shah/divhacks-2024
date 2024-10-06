const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const serviceRoutes = require('./routes/serviceRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
// require('dotenv').config({path:'divhacks-2024\backend\.env'});
require('dotenv').config();
// const session = require('express-session');

const app = express();
// const { auth } = require('express-openid-connect');

// Auth0 configuration
// const config = {
//   auth0Logout: true,
//   baseURL: AUTH0_BASE_URL || 'http://localhost:5000',
//   clientID: AUTH0_CLIENT_ID,
//   issuerBaseURL: AUTH0_ISSUER_BASE_URL
// };
// console.log(process.env.AUTH0_ISSUER_BASE_URL)
// const requiredEnvVars = ['AUTH0_CLIENT_SECRET', 'AUTH0_CLIENT_ID', 'AUTH0_ISSUER_BASE_URL'];
// const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

// if (missingEnvVars.length > 0) {
//   console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
//   process.exit(1);
// }

// app.use(cors());
app.use(express.json());

// app.use(
//   session({
//     secret: SECRET,
//   })
// )
// // Only use Auth0 if all required variables are set
// app.use(auth(config));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes will be added here
app.use('/users', userRoutes);
app.use('/service', serviceRoutes);
app.use('/transaction',transactionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});