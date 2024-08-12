const supabase = require('../config/supabase')

const createLobby = async (req, res) => {
    const { lobby_code } = req.body;
    const user_id = req.user.id; 

    try {
        // Check if lobby code is unique
        const { data: existingLobby, error: checkError } = await supabase
            .from('lobby')
            .select('id')
            .eq('lobby_code', lobby_code)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking lobby code:', checkError);
            return res.status(500).json({ error: 'Error checking lobby code' });
        }

        if (existingLobby) {
            return res.status(400).json({ error: 'Lobby code already exists' });
        }

        // Insert into lobby table
        const { data: lobbyData, error: lobbyError } = await supabase
            .from('lobby')
            .insert({ 
                lobby_code,
                user: user_id
            })
            .select()
            .single();

        if (lobbyError) {
            console.error('Error creating lobby:', lobbyError);
            return res.status(500).json({ error: 'Error creating lobby' });
        }
        // Insert into players table
        const { data: playerData, error: playerError } = await supabase
            .from('players')
            .insert({
                lobby_id: lobbyData.id,
                user_id: user_id
            })
            .select()
            .single();
        if (playerError) {
            console.error('Error adding player to lobby:', playerError);
            return res.status(500).json({ error: 'Error adding player to lobby' });
        }
    
            // Fetch player's name from user table
        const { data: userData, error: userError } = await supabase
            .from('user')
            .select('user_name')
            .eq('id', user_id);

        if (userError) {
            console.error('Error fetching user data:', userError);
            return res.status(500).json({ error: 'Error fetching user data' });
        }

        if (!userData || userData.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch player's points
        const { data: pointsData, error: pointsError } = await supabase
            .from('players')
            .select('final_points')
            .eq('user_id', user_id);

        if (pointsError) {
            console.error('Error fetching points data:', pointsError);
            return res.status(500).json({ error: 'Error fetching points data' });
        }

        // Combine all the data
        const responseData = {
            lobby: {
                id: lobbyData.id,
                code: lobbyData.lobby_code
            },
            player: {
                name: userData[0].user_name,
                score: pointsData && pointsData.length > 0 ? pointsData[0].final_points : 0
            }
        };

        res.status(201).json(responseData);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const joinLobby = async (req, res) => {
    const { lobby_code } = req.params;
    const user_id = req.user.id;

    try {
        // First, check if the lobby exists
        const { data: lobby, error: lobbyError } = await supabase
            .from('lobby')
            .select('*')
            .eq('lobby_code', lobby_code)
            .single();

        if (lobbyError || !lobby) {
            return res.status(404).json({ error: 'Lobby not found' });
        }
        // Check if the user is already in the lobby
        const { data: existingPlayer, error: playerError } = await supabase
            .from('players')
            .select('*')
            .eq('lobby_id', lobby.id)
            .eq('user_id', user_id)
            .single();

        const { data: userData, error: userError } = await supabase
            .from('user')
            .select('user_name')
            .eq('id', user_id);

        if (userError) {
            console.error('Error finding user:', userError);
            return res.status(500).json({ error: 'Error checking user registration' });
        }
        
        if (existingPlayer) {
            return res.status(200).json({message: "Welcome back!"})
        }else{
            // Add the user to the lobby_players table
            const { data: newPlayer, error: insertError } = await supabase
                .from('players')
                .insert({ lobby_id: lobby.id, user_id: user_id });

            if (insertError) {
                console.error('Error joining lobby:', insertError);
                return res.status(500).json({ error: 'Failed to join lobby' });
            }
        }

        res.status(200).json({
            message: 'Successfully joined lobby',
            user: {
                id: user_id,
                name: userData[0].user_name
            },
            lobby: {
                id: lobby.id,
                code: lobby.lobby_code
            }
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    createLobby,
    joinLobby
}