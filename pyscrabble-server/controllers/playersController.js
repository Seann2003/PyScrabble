const supabase = require('../config/supabase')

const getWinners = async (req, res) => {
    const code = req.params.lobbyId
    const {data:checkCode, checkError} = await supabase
        .from('lobby')
        .select('*')
        .eq('lobby_code', code)
        .single();
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('lobby_id', checkCode.id)
        .order('final_points', { ascending: false })
    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }
}

const fetchPlayers = async (req, res) => {
    const { code } = req.params;
    try {
        const { data: lobbyData, error: lobbyError } = await supabase
            .from('lobby')
            .select('id')
            .eq('lobby_code', code)
            .single();

        if (lobbyError) throw lobbyError;
        if (!lobbyData) throw new Error('Lobby not found');

        const lobbyId = lobbyData.id;
        const { data: playersData, error: playersError } = await supabase
            .from('players')
            .select('*')
            .eq('lobby_id', lobbyId);
        
        if (playersError) throw playersError;
        
        const processedPlayers = await Promise.all(playersData.map(async (player) => {
            if (player.bot_name == null) {
                const { data: userData, error: userError } = await supabase
                    .from('user')
                    .select('id,user_name')
                    .eq('id', player.user_id)
                    .single();
                
                if (userError) throw userError;
                return {
                    id: player.id,
                    name: userData.user_name,
                    points: player.final_points || 0,
                    lives: 4,
                    isBot: false,
                    userId: userData.id
                };
            } else {
                return {
                    id: player.id,
                    name: player.bot_name,
                    points: player.final_points || 0,
                    lives: 4,
                    isBot: true
                };
            }
        }));

        res.json({
            lobbyId: lobbyId,
            players: processedPlayers
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
};

const updatePlayerScore = async (req, res) => {
    const { playerId, points } = req.body;
    try {
        const { data, error } = await supabase
            .from('players')
            .update({ final_points: points })
            .eq('id', playerId)
            .select()
            .single();

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Error updating player score:', error);
        res.status(500).json({ error: error.message });
    }
};

const addPlayer = async (req, res) => {
    const { code, playerName } = req.body;
    try {
        const { data: lobbyData, error: lobbyError } = await supabase
            .from('lobby')
            .select('id')
            .eq('lobby_code', code)
            .single();

        if (lobbyError) throw lobbyError;
        if (!lobbyData) throw new Error('Lobby not found');

        const lobbyId = lobbyData.id;

        const { data, error } = await supabase
            .from('players')
            .insert({
                bot_name: playerName,
                lobby_id: lobbyId,
                final_points: 0
            })
            .select()
            .single();

        if (error) throw error;

        res.json({
            id: data.id,
            name: data.bot_name,
            points: 0,
            lives: 4,
            isBot: true
        });
    } catch (error) {
        console.error('Error adding player:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getWinners,
    fetchPlayers,
    updatePlayerScore,
    addPlayer
}