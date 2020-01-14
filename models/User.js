const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let SALT = 10;

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(SALT, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);

                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

module.exports = mongoose.model('User', UserSchema);