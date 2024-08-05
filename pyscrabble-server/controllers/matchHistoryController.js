const supabase = require('../config/supabase')

const getMatchHistory = async (req, res) => {
    const {data, error} = await supabase
        .from('match_history')
        .select('*')
        .eq('player_id', req.user.id)
}

const getMatchHistoryById = async (req, res) => {
    const {data, error} = await supabase
        .from('match_history')
        .select('*')
        .eq('id', req.params.id)
}

const addMatchHistory = async (req, res) => {
    const {user_id, lobby_id} = req.body;
    const {data, error} = await supabase
        .from('match_history')
        .insert({user_id, lobby_id})
        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Failed to insert match history' });
        }
        res.status(200).json({ message: 'Match history added successfully', data });    
}

module.exports = {
    getMatchHistory,
    getMatchHistoryById,
    addMatchHistory
}