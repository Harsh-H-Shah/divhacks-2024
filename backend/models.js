const mongoose = require('mongoose');

// Users Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone_number: Number,
  auth0_id: String,
  wallet_addr: String,
  type: {
         type: String,
         enum: ['NGO', 'University', 'User']
   },
  profile: {
    name: String,
    bio: String,
    skills: [String],
    education: [String]
  },
  reputation: Number
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// // Organizations Schema
// const OrganizationSchema = new mongoose.Schema({
//   name: String,
//   type: {
//     type: String,
//     enum: ['NGO', 'University', 'Government']
//   },
//   auth0_id: String,
//   contact_info: {
//     email: String,
//     phone: String,
//     address: String
//   }
// }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Services Schema
const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    wallet_addr: 'provider_type'
  },
  consumer_id: {
    type: mongoose.Schema.Types.ObjectId,
    wallet_addr: 'consumer_type'
  },
  provider_type: {
    type: String,
    enum: ['User', 'Organization']
  },
  consumer_type: {
    type: String,
    enum: ['User', 'Organization']
  },
  availability: [Date]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



// Transactions Schema
const TransactionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled']
  },
  cost: Number
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Reviews Schema
const ReviewSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  reviewer_id: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// MarketPrices Schema
const MarketPriceSchema = new mongoose.Schema({
  category: String,
  current_price: Number,
  last_updated: Date
});

// Create models
const User = mongoose.model('User', UserSchema);
// const Organization = mongoose.model('Organization', OrganizationSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);
const Review = mongoose.model('Review', ReviewSchema);
const MarketPrice = mongoose.model('MarketPrice', MarketPriceSchema);

module.exports = {
  User,
  // Organization,
  Service,
  Transaction,
  Review,
  MarketPrice
};