const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
     if (err) {
          console.error('Error opening database in controller/analytics/controller.js: ' + err.message);
     }
});

const postIncome = (req, res) => {
     try {
          const { user_id, amount, source, date, description } = req.body;

          db.run(
               `INSERT INTO Income (user_id, amount, source, date, description) VALUES (?, ?, ?, ?, ?)`,
               [user_id, amount, source, date, description],
               function (err) {
                    if (err) {
                         console.error(err.message);
                         res.status(500).json({ error: err.message });
                    } else {
                         res.status(201).json({ message: 'Income added', incomeId: this.lastID });
                    }
               }
          );
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

const getIncomeByUserId = (req, res) => {
     try {
          const { userId } = req.params;

          db.all(`SELECT * FROM Income WHERE user_id = ?`, [userId], (err, rows) => {
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

const putIncomeById = async (req, res) => {
     try {
          const { id } = req.params;
          const { amount, source, date, description } = req.body;

          db.run(
               `UPDATE Income SET amount = ?, source = ?, date = ?, description = ? WHERE id = ?`,
               [amount, source, date, description, id],
               function (err) {
                    if (err) {
                         console.error(err.message);
                         res.status(500).json({ error: err.message });
                    } else if (this.changes === 0) {
                         res.status(404).json({ message: 'Income not found' });
                    } else {
                         res.json({ message: 'Income updated' });
                    }
               }
          );
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

const deleteIncomeById = (req, res) => {
     try {
          const { id } = req.params;

          db.run(`DELETE FROM Income WHERE id = ?`, [id], function (err) {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else if (this.changes === 0) {
                    res.status(404).json({ message: 'Income not found' });
               } else {
                    res.json({ message: 'Income deleted' });
               }
          });
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
};

module.exports = {
     postIncome,
     getIncomeByUserId,
     putIncomeById,
     deleteIncomeById,
};
