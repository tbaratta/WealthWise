const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
     if (err) {
          console.error('Error opening database in controller/analytics/controller.js: ' + err.message);
     }
});

// Controller to get analytics data for a user
const getAnalytics = (req, res) => {
     try {
          const userId = req.params.userId;

          const queries = {
               total_transactions: `SELECT COUNT(id) AS total FROM Transactions WHERE user_id = ?;`,
               transactions_by_category: `SELECT COUNT(id) AS count, SUM(amount) AS total, category FROM Transactions WHERE user_id = ? GROUP BY category;`,
               transactions_by_month: `SELECT COUNT(id) AS count, SUM(amount) AS total, strftime('%Y-%m', date) AS month FROM Transactions WHERE user_id = ? GROUP BY month;`,
               income_by_month: `SELECT SUM(amount) AS total, strftime('%Y-%m', date) AS month FROM Income WHERE user_id = ? GROUP BY month;`,
               budget_by_category: `SELECT SUM(budgeted_amount) AS total, category FROM Budgets WHERE user_id = ? GROUP BY category;`,
               budget_by_month: `SELECT SUM(budgeted_amount) AS total, strftime('%Y-%m', start_date) AS month FROM Budgets WHERE user_id = ? GROUP BY month;`,
               budget_vs_spent: `SELECT SUM(budgeted_amount) AS total_budget, SUM(spent_amount) AS total_spent FROM Budgets WHERE user_id = ?;`,
               savings_goals: `SELECT goal_name, target_amount, SUM(current_amount) AS current_savings, ROUND(julianday(deadline) - julianday('now')) AS days_until_deadline FROM SavingsGoals WHERE user_id = ? GROUP BY goal_name;`,
          };

          const analyticsData = {};
            
          // Execute each query
          const executeQuery = (query, key) => {
               return new Promise((resolve, reject) => {
                    db.all(query, [userId], (err, rows) => {
                         if (err) {
                              return reject(err);
                         }
                         analyticsData[key] = rows;
                         resolve();
                    });
               });
          };

          // Array of promises to execute each query
          const queryPromises = Object.entries(queries).map(([key, query]) => executeQuery(query, key));

          Promise.all(queryPromises)
               .then(() => {
                    res.status(200).json(analyticsData);
               })
               .catch((err) => {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               });


     } catch (err) {
          console.error(err.message);
          res.status(500).json({ error: err.message });
     }
};

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
     getAnalytics,
};