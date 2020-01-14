const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator')

router.post('/signup', userDetailsValidation(), async (req, res) => {
    const isError = checkForErrors(req, res);
    if(isError) return;

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

router.post('/signin', userEmailValidation(), async (req, res) => {
    const user = User.findOne({'email': req.body.email}, (err, user) => {
        const isError = checkForErrors(req, res);
        if(isError) return;

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

function checkForErrors(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return true
    }
    return false
};

function userDetailsValidation() {
    return [
        check('email').isEmail(),
        check('password').isLength(6)
    ]
};

function userEmailValidation() {
    return [
        check('email').isEmail()
    ]
}

module.exports = router