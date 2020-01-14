const mongoose = require('mongoose')

const ComicSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    volume: {
        type: Number,
        required: true
    },
    issue: {
        type: Number,
        required: true
    },
    publisher: {
        type: String, enum: ['Marvel Comics', 'DC Comics', 'Image Comics', 'Dark Horse Comics', 'IDW Publishing', 'Valiant Comics', 'Vertigo']
    }
})

module.exports = mongoose.model('Comic', ComicSchema);