const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
     if (err) {
          console.error('Error opening database in controller/analytics/controller.js: ' + err.message);
     }
});

const postSavingsGoals = (req, res) => {
     try {
          const { user_id, target_amount, current_amount, deadline, goal_name } = req.body;

          db.run(
               `INSERT INTO SavingsGoals (user_id, target_amount, current_amount, deadline, goal_name) VALUES (?, ?, ?, ?, ?)`,
               [user_id, target_amount, current_amount, deadline, goal_name],
               function (err) {
                    if (err) {
                         console.error(err.message);
                         res.status(500).json({ error: err.message });
                    } else {
                         res.status(201).json({ message: 'Savings Goal added', savingsGoalId: this.lastID });
                    }
               }
          );
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

const getSavingsGoalsByUserId = (req, res) => {
     try {
          const { userId } = req.params;

          db.all(`SELECT * FROM SavingsGoals WHERE user_id = ?`, [userId], (err, rows) => {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else {
                    res.json(rows);
               }
          });
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

const putSavingsGoalsById = async (req, res) => {
     try {
          const { id } = req.params;
          const { target_amount, current_amount, deadline, goal_name } = req.body;

          db.run(
               `UPDATE SavingsGoals SET target_amount = ?, current_amount = ?, deadline = ?, goal_name = ? WHERE id = ?`,
               [target_amount, current_amount, deadline, goal_name, id],
               function (err) {
                    if (err) {
                         console.error(err.message);
                         res.status(500).json({ error: err.message });
                    } else if (this.changes === 0) {
                         res.status(404).json({ message: 'Savings Goal not found' });
                    } else {
                         res.json({ message: 'Savings Goal updated' });
                    }
               }
          );
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

const deleteSavingsGoalsById = (req, res) => {
     try {
          const { id } = req.params;

          db.run(`DELETE FROM SavingsGoals WHERE id = ?`, [id], function (err) {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else if (this.changes === 0) {
                    res.status(404).json({ message: 'Savings Goal not found' });
               } else {
                    res.json({ message: 'Savings Goal deleted' });
               }
          });
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

module.exports = {
     postSavingsGoals,
     getSavingsGoalsByUserId,
     putSavingsGoalsById,
     deleteSavingsGoalsById,
};
