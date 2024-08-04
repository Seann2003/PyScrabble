const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const corsMiddleware = require('./middleware/corsMiddleware');
const authRoutes = require('./routes/authRoutes');
const normalRoutes = require('./routes/routes');
const questionRoutes = require('./routes/questionRoutes');
const cookieParser = require('cookie-parser');
const sysQuestionRoutes = require('./routes/sysQuestionRoutes');

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', normalRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/sysQuestions', sysQuestionRoutes);

app.get('/', (req, res) => {
    res.send("Hello, I am working with Supabase <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});
