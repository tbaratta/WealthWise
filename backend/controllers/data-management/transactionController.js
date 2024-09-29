const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
     if (err) {
          console.error('Error opening database in controller/analytics/controller.js: ' + err.message);
     }
});


const postTransactions = (req, res) => {
     try {
          const { user_id, amount, category, location, description } = req.body;

          // Get user information, including location
          db.get(`SELECT location FROM Users WHERE id = ?`, [user_id], (err, user) => {
               if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: err.message });
               }

               if (!user) {
                    return res.status(404).json({ message: 'User not found' });
               }

               const userLocation = user.location; // Store user location

               // Fraud detection checks
               if (userLocation !== req.body.location && amount > 1500) {
                    return res.status(409).json({ message: 'High Amount & Different Location Detected: Possible Fraud Detected', transaction: { amount, category, location: req.body.location } });
               }

               if (userLocation !== req.body.location) {
                    return res.status(409).json({ message: 'Different Location Detected: Possible Fraud Detected', transaction: { amount, category, location: req.body.location } });
               }

               if (amount > 1500) {
                    return res.status(409).json({ message: 'High Amount Detected: Possible Fraud Detected', transaction: { amount, category, location: req.body.location } });
               }

               // Insert the transaction if no fraud is detected
               db.run(
                    `INSERT INTO Transactions (user_id, amount, category, location, description) VALUES (?, ?, ?, ?, ?)`,
                    [user_id, amount, category, location, description],
                    function (err) {
                         if (err) {
                              console.error(err.message);
                              res.status(500).json({ error: err.message });
                         } else {
                              res.status(201).json({ message: 'Transaction added', transactionId: this.lastID });
                         }
                    }
               );
          });
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
          const { amount, category, location, date, description } = req.body;

          db.run(
               `UPDATE Transactions SET amount = ?, category = ?, location = ?, date = ?, description = ? WHERE id = ?`,
               [amount, category, location, date, description, id],
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