const express = require('express');
const router = require('express').Router();

const User = require('../../models/User');

router.post('/',(req, res) => {
   res.send('register'); 
});

module.exports = router;