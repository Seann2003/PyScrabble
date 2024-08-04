const supabase = require('../config/supabaseClient');

const getLobby = async (req, res) => {
    const { name } = req.body;
    try {
        const { data, error } = await supabase
            .from('lobbies')
            .insert([{ name }])
            .single();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error creating lobby:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Join a lobby
const joinLobby = async (req, res) => {
    const { id } = req.params;
    const { playerId } = req.body;

    try {
        const { data, error } = await supabase
            .from('lobbies')
            .update({ [`player${playerId}`]: playerId })
            .eq('id', id)
            .single();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error joining lobby:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Real-time updates
const realtimeLobby = async (req, res) => {
    const { data, error } = supabase
        .from('lobbies')
        .on('*', payload => {
            // Send real-time updates to clients
            res.write(`data: ${JSON.stringify(payload)}\n\n`);
        })
        .subscribe();
    
    if (error) {
        console.error('Error subscribing to lobbies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    // End the response when client disconnects
    req.on('close', () => {
        supabase.removeSubscription(data);
    });
};

module.exports = {
    getLobby,
    joinLobby,
    realtimeLobby
}