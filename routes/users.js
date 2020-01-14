const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.status(200).send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/signin', async (req, res) => {
    const user = User.findOne({'email': req.body.email}, (err, user) => {
        if(err) { res.status(404).json({ message: err}) }

        bcrypt.compare(req.body.password, user.password, function(error, isMatch) {

            console.log(`err: ${err}, isMatch: ${isMatch}`);

            if(err || !isMatch) {
                res.status(401).send({ message: "unauthorized" });
            } else {
                res.status(200).send(user);
            }

        })
    })
})

module.exports = router