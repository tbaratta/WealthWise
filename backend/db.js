const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database or open it if it already exists
const db = new sqlite3.Database('./wealthwise.db', (err) => {
     if (err) {
          console.error('Error opening database in db.js: ' + err.message);
     } else {
          console.log('Connected to the SQLite database.');
     }
});

// Function to create tables
const initializeDatabase = () => {
     db.serialize(() => {
          // Create Users table
          db.run(`
               CREATE TABLE IF NOT EXISTS Users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
               )
          `);

          // Create Transactions table
          db.run(`
               CREATE TABLE IF NOT EXISTS Transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    amount REAL NOT NULL,
                    category TEXT NOT NULL,
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    description TEXT,
                    FOREIGN KEY (user_id) REFERENCES Users(user_id)
               )
          `);

          // Create Income table
          db.run(`
               CREATE TABLE IF NOT EXISTS Income (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    amount REAL NOT NULL,
                    source TEXT NOT NULL,
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    description TEXT,
                    FOREIGN KEY (user_id) REFERENCES Users(user_id)
               )
          `);

          // Create Budgets table
          db.run(`
               CREATE TABLE IF NOT EXISTS Budgets (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    category TEXT NOT NULL,
                    budgeted_amount REAL NOT NULL,
                    spent_amount REAL DEFAULT 0,
                    start_date TIMESTAMP,
                    end_date TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES Users(user_id)
               )
          `);

          // Create SavingsGoals table
          db.run(`
               CREATE TABLE IF NOT EXISTS SavingsGoals (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    goal_name TEXT NOT NULL,
                    target_amount REAL NOT NULL,
                    current_amount REAL DEFAULT 0,
                    deadline TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES Users(user_id)
               )
          `);

          // Create EngagementMetrics table
          db.run(`
               CREATE TABLE IF NOT EXISTS EngagementMetrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    page_visits INTEGER DEFAULT 0,
                    chatbot_interactions INTEGER DEFAULT 0,
                    FOREIGN KEY (user_id) REFERENCES Users(user_id)
               )
          `);

          // Create Learning Topics
          db.run(`
               CREATE TABLE IF NOT EXISTS LearningTopics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    topic TEXT NOT NULL,
                    description TEXT NOT NULL,
                    content TEXT NOT NULL,
                    resource_link TEXT
               )
          `);

          console.log('Database and tables created successfully.');
     });
};

// Call the initialize function
initializeDatabase();

// Close the database connection when done
db.close((err) => {
     if (err) {
          console.error('Error closing database: ' + err.message);
     } else {
          console.log('Database connection closed.');
     }
});
