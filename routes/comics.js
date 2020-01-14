const express = require('express');
const router = express.Router();
const Comic = require('../models/Comic');

//Get a list of all comics
router.get('/', async(req, res) => {
    try {
        const comics = await Comic.find();
        res.status(200).send(posts);
    } catch(err) { res.status(500).json({ message: err}) }
});

//Create a new comic
router.post('/create', async (req, res) => {
    const comic = new Comic({
        title: req.body.title,
        volume: req.body.volume,
        issue: req.body.issue,
        publisher: req.body.publisher
    });

    try {
        const savedComic = await comic.save();
        res.status(200).send(savedComic);
    } catch (err) { res.status(500).send(err); }
});

//Delete an existing comic
router.delete('/:comicId', async (req, res) => {
    try {
        const deletedComic = await Comic.remove({_id: req.params.comicId});
        res.status(200).send(removedPost);
    } catch(err) { res.status(500).json({message: err}); }
});

module.exports = router;