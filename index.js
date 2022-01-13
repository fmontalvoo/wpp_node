const express = require('express');

const app = express();
const PORT = 3000;

// Serializacion
app.use(express.json());

require('./lib/wpp.js');

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/chat', require('./routes/chat'));

app.listen(PORT, () => {
    console.log("Server Running Live on Port : " + PORT || 3000);
});