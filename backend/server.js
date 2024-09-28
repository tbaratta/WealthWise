const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000 || 3000;

// Routes:
const analyticsRouter = require('./routes/analytics');
const learningRouter = require('./routes/learning');
const dataManagementRouter = require('./routes/data-management');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/analytics', analyticsRouter);
app.use('/learning', learningRouter);
app.use('/data-management', dataManagementRouter);

// Start the server
app.listen(port, () => {
     console.log(`Server running on port ${port}`);
});
