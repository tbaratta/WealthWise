const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
     if (err) {
          console.error('Error opening database in controller/analytics/controller.js: ' + err.message);
     }
});

const getLearning = (req, res) => {
     try {
          db.all(`SELECT topic, description FROM LearningTopics`, (err, rows) => {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else {
                    res.status(200).json(rows);
               }
          });
     } catch (err) {
          console.error(err.message);
          res.status(500).json({ error: err.message });
     }
};

const getLearningById = (req, res) => {
     try {
          const id = req.params.id;
          db.get(`SELECT topic, description, content, resource_link FROM LearningTopics WHERE id = ?`, [id], (err, row) => {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else {
                    res.status(200).json(row);
               }
          });
     } catch (err) {
          console.error(err.message);
          res.status(500).json({ error: err.message });
     }
}


// Close the database connection when the app is terminated
process.on('SIGINT', () => {
     db.close((err) => {
          if (err) {
               console.error('Error closing database: ' + err.message);
          } else {
               console.log('Database connection closed.');
          }
     });
     process.exit(0);
});

module.exports = {
     getLearning,
     getLearningById,
};