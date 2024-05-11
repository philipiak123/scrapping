const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Funkcja do pobierania danych co 10 sekund
const fetchData = async () => {
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
    } catch (error) {
        console.error('Błąd podczas pobierania strony:', error);
    }
};

// Wywołaj funkcję co 10 sekund
setInterval(fetchData, 10000);

// Endpoint do obsługi żądań na adresie "/"
app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
