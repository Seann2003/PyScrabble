const supabase = require('../config/supabase');

const getUserbyName = async (req, res) => {
    const user_id = req.user.id
    const { data, error } = await supabase.from('user')
        .select('user_name')
        .eq('id', user_id)
        .single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
}

module.exports = {
    getUserbyName
}