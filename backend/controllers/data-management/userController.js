const sqlite3 = require('sqlite3').verbose();
const bcrpyt = require('bcrypt');
const saltRound = 10;

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
     if (err) {
          console.error('Error opening database in controller/analytics/controller.js: ' + err.message);
     }
});

// User Controller
const postUser = (req, res) => {
     try {
          let {
               name,
               email,
               password
          } = req.body;

          // Step 1: Lowercase the email
          email = email.toLowerCase();

          // Step 2: Check if User already exists
          db.get(`SELECT id FROM Users WHERE email = ?`, [email], (err, row) => {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else if (row) {
                    res.status(400).json({ message: 'User already exists' });
               } else {
                    // Step 3: Hash the password
                    bcrpyt.hash(password, saltRound, (err, hash) => {
                         if (err) {
                              console.error(err.message);
                              res.status(500).json({ error: err.message });
                         } else {
                              // Step 4: Insert the user into the database
                              db.run(`INSERT INTO Users (name, email, password) VALUES (?, ?, ?)`, [name, email, hash], function (err) {
                                   if (err) {
                                        console.error(err.message);
                                        res.status(500).json({ error: err.message });
                                   } else {
                                        res.status(201).json({ message: 'User added', userId: this.lastID });
                                   }
                              });
                         }
                    });
               }
          });
     }
     catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
}

const getUsers = (req, res) => {
     try {
          db.all(`SELECT id, name, email FROM Users`, (err, rows) => {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else {
                    res.json(rows);
               }
          });
     }
     catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
}

const getUserById = (req, res) => {
     try {
          const id = req.params.id;

          db.get(`SELECT name, email, password FROM Users WHERE id = ?`, [id], (err, row) => {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else if (!row) {
                    res.status(404).json({ message: 'User not found' });
               } else {
                    res.json(row);
               }
          });
     }
     catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
}

const putUserById = async (req, res) => {
     try {
          const id = req.params.id;
          let { name, email, password } = req.body;

          // Step 1: Lowercase the email
          email = email.toLowerCase();


          // Step 2: Hash the password
          password = await bcrpyt.hash(password, saltRound);

          db.run(`UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?`, [name, email, password, id], function (err) {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else if (this.changes === 0) {
                    res.status(404).json({ message: 'User not found' });
               } else {
                    res.json({ message: 'User updated' });
               }
          });
     }
     catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
}

const deleteUserById = (req, res) => {
     try {
          const id = req.params.id;

          db.run(`DELETE FROM Users WHERE id = ?`, [id], function (err) {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else if (this.changes === 0) {
                    res.status(404).json({ message: 'User not found' });
               } else {
                    res.json({ message: 'User deleted' });
               }
          });
     }
     catch (error) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
     }
}

// Transactions Controller
const postTransactions = async (req, res) => {
     const { userId, amount, category, date, description } = req.body;
     try {
          const result = await db.query(
               "INSERT INTO Transactions (user_id, amount, category, date, description) VALUES ($1, $2, $3, $4, $5)",
               [userId, amount, category, date, description]
          );
          res.status(201).json({ message: "Transaction created successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const getTransactionsByUserId = async (req, res) => {
     const { userId } = req.params;
     try {
          const result = await db.query(
               "SELECT * FROM Transactions WHERE user_id = $1",
               [userId]
          );
          res.status(200).json(result.rows);
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const putTransactionsById = async (req, res) => {
     const { id } = req.params;
     const { amount, category, date, description } = req.body;
     try {
          await db.query(
               "UPDATE Transactions SET amount = $1, category = $2, date = $3, description = $4 WHERE id = $5",
               [amount, category, date, description, id]
          );
          res.status(200).json({ message: "Transaction updated successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const deleteTransactionsById = async (req, res) => {
     const { id } = req.params;
     try {
          await db.query("DELETE FROM Transactions WHERE id = $1", [id]);
          res.status(200).json({ message: "Transaction deleted successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

// Income Controller
const postIncome = async (req, res) => {
     const { userId, amount, source, date, description } = req.body;
     try {
          await db.query(
               "INSERT INTO Income (user_id, amount, source, date, description) VALUES ($1, $2, $3, $4, $5)",
               [userId, amount, source, date, description]
          );
          res.status(201).json({ message: "Income added successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const getIncomeByUserId = async (req, res) => {
     const { userId } = req.params;
     try {
          const result = await db.query("SELECT * FROM Income WHERE user_id = $1", [userId]);
          res.status(200).json(result.rows);
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const putIncomeById = async (req, res) => {
     const { id } = req.params;
     const { amount, source, date, description } = req.body;
     try {
          await db.query(
               "UPDATE Income SET amount = $1, source = $2, date = $3, description = $4 WHERE id = $5",
               [amount, source, date, description, id]
          );
          res.status(200).json({ message: "Income updated successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const deleteIncomeById = async (req, res) => {
     const { id } = req.params;
     try {
          await db.query("DELETE FROM Income WHERE id = $1", [id]);
          res.status(200).json({ message: "Income deleted successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

// Budgets Controller
const postBudgets = async (req, res) => {
     const { userId, category, budgetedAmount, spentAmount, startDate, endDate } = req.body;
     try {
          await db.query(
               "INSERT INTO Budgets (user_id, category, budgeted_amount, spent_amount, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6)",
               [userId, category, budgetedAmount, spentAmount, startDate, endDate]
          );
          res.status(201).json({ message: "Budget added successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const getBudgetsByUserId = async (req, res) => {
     const { userId } = req.params;
     try {
          const result = await db.query("SELECT * FROM Budgets WHERE user_id = $1", [userId]);
          res.status(200).json(result.rows);
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const putBudgetsById = async (req, res) => {
     const { id } = req.params;
     const { category, budgetedAmount, spentAmount, startDate, endDate } = req.body;
     try {
          await db.query(
               "UPDATE Budgets SET category = $1, budgeted_amount = $2, spent_amount = $3, start_date = $4, end_date = $5 WHERE id = $6",
               [category, budgetedAmount, spentAmount, startDate, endDate, id]
          );
          res.status(200).json({ message: "Budget updated successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const deleteBudgetsById = async (req, res) => {
     const { id } = req.params;
     try {
          await db.query("DELETE FROM Budgets WHERE id = $1", [id]);
          res.status(200).json({ message: "Budget deleted successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

// Savings Goals Controller
const postSavingsGoals = async (req, res) => {
     const { userId, goalName, targetAmount, currentAmount, deadline } = req.body;
     try {
          await db.query(
               "INSERT INTO SavingsGoals (user_id, goal_name, target_amount, current_amount, deadline) VALUES ($1, $2, $3, $4, $5)",
               [userId, goalName, targetAmount, currentAmount, deadline]
          );
          res.status(201).json({ message: "Savings goal added successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const getSavingsGoalsByUserId = async (req, res) => {
     const { userId } = req.params;
     try {
          const result = await db.query("SELECT * FROM SavingsGoals WHERE user_id = $1", [userId]);
          res.status(200).json(result.rows);
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const putSavingsGoalsById = async (req, res) => {
     const { id } = req.params;
     const { goalName, targetAmount, currentAmount, deadline } = req.body;
     try {
          await db.query(
               "UPDATE SavingsGoals SET goal_name = $1, target_amount = $2, current_amount = $3, deadline = $4 WHERE id = $5",
               [goalName, targetAmount, currentAmount, deadline, id]
          );
          res.status(200).json({ message: "Savings goal updated successfully" });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const deleteSavingsGoalsById = async (req, res) => {
     const { id } = req.params;
     try {
          await db.query("DELETE FROM SavingsGoals WHERE id = $1", [id]);
          res.status(200).json({ message: "Savings goal deleted successfully" });
     } catch (err) {
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
     postUser,
     getUsers,
     getUserById,
     putUserById,
     deleteUserById,
};