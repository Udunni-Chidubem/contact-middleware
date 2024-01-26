require('dotenv').config();
const express = require('express');
const body_parser = require('body-parser');
const contact_router = require('./routes/contact');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use('/contact', contact_router);
app.use(cors());

app.listen(PORT, () => {
    console.log(`check http://localhost:${PORT}`)
})
