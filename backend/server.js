const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
     res.send('API is running');
});

// Start the server
app.listen(port, () => {
     console.log(`Server running on port ${port}`);
});

// test
