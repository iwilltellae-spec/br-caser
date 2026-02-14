const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Указываем папку public для статических файлов (картинки, css, js)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Отдаем главный файл index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});