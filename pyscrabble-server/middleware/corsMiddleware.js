const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3001', // Allow this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you need to handle cookies or authentication headers
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
