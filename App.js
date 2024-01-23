require('dotenv').config();
const express = require('express');
const body_parser = require('body-parser');
const contact_router = require('./routes/contact');
const App = express();
const PORT = process.env.PORT;

// middlewares
App.use('/contact',contact_router);

App.listen(PORT, () => {
    console.log(`check http://localhost:${PORT}`)
})
