const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
         console.error('Error opening database in controller/settings/controller.js: ' + err.message);
    }
});

let latestTransaction = { amount: null, category: null };

const chooseRandomTransaction = () => {
    //let amount = ((Math.random() * 2000) + Math.random()); 
    let amount = Math.round(((Math.random() * 2000) + Math.random()) * 100) / 100;
    let category = ["Entertainment", "Finance", "Health", "Technology", "Travel"]; 
    category = category [Math.floor(Math.random() * category.length)];
    return {amount, category};
}

var {amount, category} = chooseRandomTransaction();

const postFakeTransaction = (req, res) => {
    try{
        const id = req.params.id; 
        const {amount, category} = chooseRandomTransaction();

        // Store the latest transaction
        latestTransaction = { amount, category };

        db.run(`INSERT INTO Transactions (user_id, amount, category) VALUES (?, ?, ?)`, [id, amount, category], function (err) {
            if (err) {
                 console.error(err.message);
                 res.status(500).json({ error: err.message });
            } else {
                 res.status(201).json({ message: 'Transaction added'});
            }
       });

    } catch (err) {  
        console.error(err.message); 
        res.status(500).json({error: err.message}); 
    }
};

const getFakeTransaction = (req, res) => {
    try{
        res.status(200).json({ amount: `${latestTransaction.amount}`, category: `${latestTransaction.category}`});

    } catch (err) {  
        console.error(err.message); 
        res.status(500).json({error: err.message}); 
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