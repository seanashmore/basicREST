const express = require('express');
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    (err) => { 
        if(err) {
            console.log(`Failed to connect to db: ${err}`)
        } else {
            console.log('Successfully Connected to db') 
        }
    });


const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

app.use(bodyParser.json());
app.use('/posts', postsRoute);
app.use('/users', usersRoute);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port:${port}`)
});