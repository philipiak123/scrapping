const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Endpoint do obsługi żądań na adresie "/"
app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
