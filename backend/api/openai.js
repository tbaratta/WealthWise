



// Endpoint to get financial advice
app.post('/', async (req, res) => {
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
});
