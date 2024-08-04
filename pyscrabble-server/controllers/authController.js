const bcrypt = require('bcrypt');
const supabase = require('../config/supabase');


const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('user_email', email)
            .single();

        if (error) {
            console.error('Supabase Error:', error);
            return res.status(400).json({ error: 'User not found' });
        }

        const user = data;
        const passwordMatch = await bcrypt.compare(password, user.user_password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.user_email, name: user.user_name } });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const signup = async (req, res) => {
    const saltRounds = 10;
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { data, error } = await supabase
            .from('user')
            .insert([
                { user_name: username, user_email: email, user_password: hashedPassword }
            ]);

        if (error) {
            console.error('Supabase Error:', error);
            return res.status(400).json({ error: error.message || error });
        }

        res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { login, signup };
