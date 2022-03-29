const express = require('express');

const PORT = 3000 || process.env.CLIENT_PORT;

const app = express();

app.use(express.static('src'));

app.listen(PORT, () => console.log(`Client is listening on port ${PORT}`));