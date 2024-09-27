const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const RSA_PUBLIC = fs.readFileSync('./rsa/key.pub');
const RSA_PRIVATE = fs.readFileSync('./rsa/key');

router.get('/currentuser', async(req, res) => {
    const token = req.cookies.token;
    if(token) {
        try {
            const decodedToken = jwt.verify(token, RSA_PUBLIC)
            if(decodedToken) {
                const user = await User.findById(decodedToken.sub).select('-password -__v').exec();

                if(user) {
                   return res.json(user)
                } else {
                    return res.json(null)
                }
            } else {
                return res.json(null)
            }
        } catch (error) {
            console.error(error);
            return res.json(null)
        }
    } else {
        return res.json(null)
    }
})

router.post('/connexion', async(req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if(user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({}, RSA_PRIVATE, {
                subject: user._id.toString(),
                algorithm: 'RS256',
                expiresIn: 60 * 60 * 24 * 30 * 6
            })
            res.cookie('token', token, {httpOnly: true})
            return res.json(user)
        } else{
            return res.status(401).json('Mauvais email ou mot de passe')

        }
    } catch (error) {
        return res.status(401).json('Mauvais email ou mot de passe')
    }

})

router.delete('/logout', (req, res) => {
    res.clearCookie('token')
    res.end()
})

module.exports = router
