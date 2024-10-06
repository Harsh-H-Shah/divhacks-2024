const express = require('express');
const router =  express.Router();
const {Service} = require('../models');
router.use(express.json());

router.post('/', async (req, res) => {
    try {
      const service = new Service(req.body);
      await service.save();
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.get('/', async (req, res) => {
try {
    const services = await Service.find();
    res.json(services);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.get('/:id', async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) return res.status(404).json({ message: 'Service not found' });
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;