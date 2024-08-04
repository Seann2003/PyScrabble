const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const corsMiddleware = require('./middleware/corsMiddleware');
const authRoutes = require('./routes/authRoutes');
const routes = require('./routes/routes');
const questionRoutes = require('./routes/questionRoutes');

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
// app.use('/api', routes);
app.use('/api', questionRoutes);


app.get('/', (req, res) => {
    res.send("Hello, I am working with Supabase <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});
