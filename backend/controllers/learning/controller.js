const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./wealthwise.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
     if (err) {
          console.error('Error opening database in controller/analytics/controller.js: ' + err.message);
     }
});

const getLearning = (req, res) => {
     try {
          db.all(`SELECT topic, description FROM LearningTopics`, (err, rows) => {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else {
                    res.status(200).json(rows);
               }
          });
     } catch (err) {
          console.error(err.message);
          res.status(500).json({ error: err.message });
     }
};

const getLearningById = (req, res) => {
     try {
          const id = req.params.id;
          db.get(`SELECT topic, description, content, resource_link FROM LearningTopics WHERE id = ?`, [id], (err, row) => {
               if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: err.message });
               } else {
                    res.status(200).json(row);
               }
          });
     } catch (err) {
          console.error(err.message);
          res.status(500).json({ error: err.message });
     }
}

const postChatbot = async (req, res) => {
     const { stockSymbol, userMessage } = req.body; // Accept stock symbol and user message from the request body

     const options = {
          method: 'POST',
          url: 'https://yahoo-finance160.p.rapidapi.com/finbot',
          headers: {
               'x-rapidapi-key': process.env.OPENAI_API_KEY, // Use API key from .env
               'x-rapidapi-host': 'yahoo-finance160.p.rapidapi.com',
               'Content-Type': 'application/json',
          },
          data: {
               messages: [
                    {
                         role: 'user',
                         content: userMessage, // Use the user's message dynamically
                    },
               ],
               stock: stockSymbol, // Use the stock symbol dynamically
               conversation_id: '', // Empty for a new conversation
               period: '1mo', // You can modify this period if needed
          },
     };

     try {
          const response = await axios.request(options);
          res.json({
               advice: response.data, // Send the API response back to the client
          });
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to fetch financial advice' });
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
     getLearning,
     getLearningById,
     postChatbot,
};