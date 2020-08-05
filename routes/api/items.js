const express = require('express');
const router = require('express').Router();

const Item = require('../../models/Item');

router.get('/', async (req, res) => {
    try {
      const items = await Item.find();
      if (!items) throw Error('No items');
  
      res.status(200).json(items);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

router.post('/',(req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

router.delete('/:id',(req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));

});


module.exports = router;