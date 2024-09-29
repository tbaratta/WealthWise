const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
         console.error('Error opening database in controller/settings/controller.js: ' + err.message);
    }
});

const getSettings = (req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        db.get(`SELECT name, email, password FROM Users WHERE id = ?` , [id], (err, row) => {
            if (err) { 
                console.error(err.message);
                res.status(500).json({error: err.message});
            } else {
                res.status(200).json(row); 
            }
        });

    } catch (err) {  
        console.error(err.message); 
        res.status(500).json({error: err.message}); 
    }
};

const putSettings = (req, res) => {
    try{
        const id = req.params.id;
        const { name, email, password } = req.body; 

        db.run(`UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?` , [name, email, password, id], (err, row) => {
            if (err) { 
                console.error(err.message);
                res.status(500).json({error: err.message});
            } 
            else if(this.changes === 0) {
                res.status(404).json({message: 'User Not Found'});
            }

            else {
                res.json({message: 'User Updated!'}); 
            }
        });

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
    getSettings,
    putSettings, 
};