const supabase = require('../config/supabase')

const getMatchHistory = async (req, res) => {
    const {data, error} = await supabase
        .from('match_history')
        .select('*')
        .eq('user_id', req.user.id)
    
    if (error) {
        console.error('Error fetching match history:', error);
        return res.status(500).json({ error: 'Failed to fetch match history' });
    }

    const matchHistoryWithPoints = await Promise.all(data.map(async (match) => {
        const { data: playerData, error: playerError } = await supabase
            .from('players')
            .select('final_points')
            .eq('lobby_id', match.lobby_id)
            .eq('user_id', req.user.id)
            .single()

        const {data: lobbyData, error: lobbyError} = await supabase
            .from('lobby')
            .select('lobby_code')
            .eq('id', match.lobby_id)
            .single()

        if (playerError) {
            console.error('Error fetching player points:', playerError);
            return match;
        }

        return {
            ...match,
            points: playerData ? playerData.final_points : 0,
            lobby_code: lobbyData ? lobbyData.lobby_code : null
        };
    }));

    res.status(200).json(matchHistoryWithPoints);
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