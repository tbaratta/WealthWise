const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Routes:
const homeRouter = require('./routes/home');
const analyticsRouter = require('./routes/analytics');
const learningRouter = require('./routes/learning');
const dataManagementRouter = require('./routes/data-management');
const settingsRouter = require('./routes/settings'); 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/home', homeRouter);
app.use('/analytics', analyticsRouter);
app.use('/learning', learningRouter);
app.use('/data-management', dataManagementRouter);
app.use('/settings', settingsRouter);

// Start the server
app.listen(port, () => {
     console.log(`Server running on port ${port}`);
});

// test
