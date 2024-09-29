const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database in controller/settings/controller.js: ' + err.message);
    }
});

// Promisify SQLite methods for async/await support
const dbGet = promisify(db.get).bind(db);
const dbRun = promisify(db.run).bind(db);

let latestTransaction = { amount: null, category: null, location: null };

const chooseRandomTransaction = () => {
    let amount = Math.round(((Math.random() * 2000) + Math.random()) * 100) / 100;
    let categories = ["Entertainment", "Finance", "Health", "Technology", "Travel"];
    let stores = ["Amazon", "Best Buy", "Starbucks", "Walmart", "Target"];
    let locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

    const category = categories[Math.floor(Math.random() * categories.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    return { amount, category, location };
};

const postFakeTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        const { amount, category, location } = chooseRandomTransaction();

        // Fetch the user’s location
        const user = await dbGet(`SELECT location FROM Users WHERE id = ?`, [id]);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Insert the new transaction
        await dbRun(
            `INSERT INTO Transactions (user_id, amount, category, location) VALUES (?, ?, ?, ?)`,
            [id, amount, category, location]
        );

        // Check for potential fraud
        if (user.location !== location && amount > 1500) {
            return res.status(409).json({ message: 'High Amount & Different Location Detected: Possible Fraud Detected', transaction: { amount, category, location } });
        }

        // Check for potential fraud
        if (user.location !== location) {
            return res.status(409).json({ message: 'Different Location Detected: Possible Fraud Detected', transaction: { amount, category, location } });
        }

        if (amount > 1500) {
            return res.status(409).json({ message: 'High Amount Detected: Possible Fraud Detected', transaction: { amount, category, location } });
        }

        // Store the latest transaction
        latestTransaction = { amount, category, location };

        // Send success response
        return res.status(201).json({ message: 'Transaction added successfully', transaction: latestTransaction });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

const getFakeTransaction = (req, res) => {
    try {
        res.status(200).json({ amount: latestTransaction.amount, category: latestTransaction.category });
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
    postFakeTransaction,
    getFakeTransaction,
};
