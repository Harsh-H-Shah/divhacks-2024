const express = require('express');
const router =  express.Router();
const {Transaction} = require('../models');
const {User} = require('../models')
router.use(express.json());

router.post('/', async (req, res) => {
    try {
      const { providerWallet, consumerWallet, cost } = req.body;
  
      const provider = await User.findOne({ wallet_addr: providerWallet });
      const consumer = await User.findOne({ wallet_addr: consumerWallet });
  
      if (!provider || !consumer) {
        return res.status(404).json({ message: 'Provider or consumer not found' });
      }
  
      const transaction = new Transaction({
        provider: {
          id: provider._id,
          wallet_addr: provider.wallet_addr
        },
        consumer: {
          id: consumer._id,
          wallet_addr: consumer.wallet_addr
        },
        cost
      });
  
      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.get('/', async (req, res) => {
try {
    const transactions = await Transaction.find()
    .populate('provider.id', 'name email userType')
    .populate('consumer.id', 'name email userType');
    res.json(transactions);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.put('/:id', async (req, res) => {
    try {
      const { status } = req.body;
  
      if (!['pending', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided' });
      }
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      transaction.status = status;
      await transaction.save();
  
      res.json({ message: 'Transaction status updated successfully', transaction });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
  