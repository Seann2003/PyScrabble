const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const corsMiddleware = require('./middleware/corsMiddleware');
const authRouter = require('./routes/authRouter');
const normalRouter = require('./routes/routes');
const questionRouter = require('./routes/questionRouter');
const cookieParser = require('cookie-parser');
const lobbyRouter = require('./routes/lobbyRouter');
const sysQuestionRouter = require('./routes/sysQuestionRouter');
const playersRouter = require('./routes/playersRouter');
const matchHistoryRouter = require('./routes/matchHistoryRouter');
const userRouter = require('./routes/userRouter');

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/api', normalRouter);
app.use('/api/questions', questionRouter);
app.use('/api/sysQuestions', sysQuestionRouter);
app.use('/api/room', lobbyRouter);
app.use('/api/players', playersRouter);
app.use('/api/matchHistory', matchHistoryRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("Hello, I am working with Supabase <3");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

