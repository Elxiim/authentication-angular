const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.post('/connexion', (req, res) => {
    console.log(req.body);
    res.json('Connexion reussie !')
})

module.exports = router