const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
     if (err) {
          console.error('Error opening database in controller/analytics/controller.js: ' + err.message);
     }
});

const postTransactions = (req, res) => {
     try {
          const { user_id, amount, category, date, description } = req.body;

          db.run(
               `INSERT INTO Transactions (user_id, amount, category, date, description) VALUES (?, ?, ?, ?, ?)`,
               [user_id, amount, category, date, description],
               function (err) {
                    if (err) {
                         console.error(err.message);
                         res.status(500).json({ error: err.message });
                    } else {
                         res.status(201).json({ message: 'Transaction added', transactionId: this.lastID });
                    }
               }
          );
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

const getTransactionsByUserId = (req, res) => {
     try {
          const { user_id } = req.params;

          db.all(`SELECT * FROM Transactions WHERE user_id = ?`, [user_id], (err, rows) => {
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

const putTransactionsById = async (req, res) => {
     try {
          const { id } = req.params;
          const { amount, category, date, description } = req.body;

          db.run(
               `UPDATE Transactions SET amount = ?, category = ?, date = ?, description = ? WHERE id = ?`,
               [amount, category, date, description, id],
               function (err) {
                    if (err) {
                         console.error(err.message);
                         res.status(500).json({ error: err.message });
                    } else if (this.changes === 0) {
                         res.status(404).json({ message: 'Transaction not found' });
                    } else {
                         res.json({ message: 'Transaction updated' });
                    }
               }
          );
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

const deleteTransactionsById = (req, res) => {
     try {
          const { id } = req.params;

          db.run(`DELETE FROM Transactions WHERE id = ?`, [id], function (err) {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else if (this.changes === 0) {
                    res.status(404).json({ message: 'Transaction not found' });
               } else {
                    res.json({ message: 'Transaction deleted' });
               }
          });
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

module.exports = {
     postTransactions,
     getTransactionsByUserId,
     putTransactionsById,
     deleteTransactionsById,
};