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
}

module.exports = {
    getMatchHistory,
    getMatchHistoryById,
    addMatchHistory
}