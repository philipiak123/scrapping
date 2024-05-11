const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Funkcja do pobierania zawartości ze strony
const fetchDataFromWebsite = async () => {
    try {
        const url = 'https://www.otodom.pl/pl/wyniki/sprzedaz/mieszkanie/cala-polska';
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        };

        const response = await axios.get(url, { headers });
        const html = response.data;

        const $ = cheerio.load(html);
        const elementContent = $('.e1fw9pn54.css-g23rbo').text();

        console.log('Pobrana zawartość:', elementContent);

        return elementContent; // Zwróć pobraną zawartość
    } catch (error) {
        console.error('Błąd podczas pobierania strony:', error);
        throw error;
    }
};

// Endpoint do wyświetlania zawartości na stronie
app.get('/', async (req, res) => {
    try {
        const content = await fetchDataFromWebsite();
        res.send(content); // Wyślij pobraną zawartość jako odpowiedź
    } catch (error) {
        res.status(500).send('An error occurred while fetching the content.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
