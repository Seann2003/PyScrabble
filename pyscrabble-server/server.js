const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const morgan = require('morgan');
const bodyParser = require('body-parser');


dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3001' // Replace with the origin you want to allow
}));

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const supabase = createClient(
    process.env.PROJECT_URL,
    process.env.API_KEY,
);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Fetch the user from the database
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('user_email', email)
            .single();

        if (error) {
            console.error('Supabase Error:', error);
            return res.status(400).json({ error: 'User not found' });
        }
        console.log(data);
        const user = data;

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.user_password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.user_email, name: user.user_name } });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/signup', async (req, res) => {
    const saltRounds = 10;
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
 
        // Insert user into Supabase
        const {data, error } = await supabase
            .from('user')
            .insert([
                { user_name: username, user_email: email, user_password: hashedPassword }
            ]);
        // Handle errors
        if (error) {
            console.error('Supabase Error:', error);
            return res.status(400).json({ error: error.message || error});
        }

        res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.get('/', (req, res) => {
    res.send("Hello I am working with Supabase <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
})
