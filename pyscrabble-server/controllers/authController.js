const bcrypt = require('bcrypt');
const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('user_email', email)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Supabase Error:', error);
            return res.status(400).json({ error: 'User not found' });
        }

        const user = data;
        const passwordMatch = await bcrypt.compare(password, user.user_password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        let token = jwt.sign({ id: user.id, name: user.user_name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
        res.cookie('Token', token, {
            httpOnly: true, // Ensures the cookie is only accessible by the web server
            secure: process.env.NODE_ENV === 'production', 
            maxAge: process.env.COOKIE_MAX_AGE, // Cookie expiration time (e.g., 10 hours)
            sameSite: 'None', // Apparently it only works when I set this to 'None' for my side
            path: '/',
            secure: true
        });

        res.status(200).json({ message: 'Login successful', 
            user: { 
                id: user.id, 
                email: user.user_email, 
                name: user.user_name,
                type: user.user_type
            }   
        });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


const signup = async (req, res) => {
    const saltRounds = 10;
    const { username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
        if(username === "" || email === "" || password === ""){
            return res.status(400).json({ error: 'All fields are required' });
        }

        if(!emailRegex.test(email)){
            return res.status(400).json({ error: 'Invalid email' });
        }
        
        if(password.length < 8){
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { data, error } = await supabase
            .from('user')
            .insert([
                { user_name: username, user_email: email, user_password: hashedPassword, created_by: username, updated_by: username }
            ]);

        if (error) {
            console.error('Supabase Error:', error);
            return res.status(400).json({error: "User/Email already exists"});
        }

        res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const logout = (req, res) => {
    res.clearCookie('Token',{
        httpOnly: true, // Ensures the cookie is only accessible by the web server
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        sameSite: 'None',
        path: '/',
        secure: true
    });
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = { login, signup, logout };
