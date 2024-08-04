import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://your-project.supabase.co', 'your-anon-key');

const CreateLobbyPage = () => {
    const [lobbies, setLobbies] = useState([]);
    const [playerId, setPlayerId] = useState('player1'); // Example player ID

    useEffect(() => {
        const subscription = supabase
            .from('lobbies')
            .on('*', payload => {
                console.log('Change received!', payload);
                // Update local state based on the change
                setLobbies(prevLobbies => {
                    const updatedLobbies = prevLobbies.map(lobby => {
                        if (lobby.id === payload.new.id) {
                            return payload.new;
                        }
                        return lobby;
                    });
                    return [...updatedLobbies, payload.new];
                });
            })
            .subscribe();

        return () => {
            supabase.removeSubscription(subscription);
        };
    }, []);

    const createLobby = async () => {
        try {
            const { data, error } = await fetch('http://localhost:3000/api/lobby', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'New Lobby' })
            });
            const result = await data.json();
            console.log(result);
        } catch (error) {
            console.error('Error creating lobby:', error);
        }
    };

    const joinLobby = async (lobbyId) => {
        try {
            const { data, error } = await fetch(`http://localhost:3000/api/lobby/${lobbyId}/join`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerId })
            });
            const result = await data.json();
            console.log(result);
        } catch (error) {
            console.error('Error joining lobby:', error);
        }
    };

    return (
        <div>
            <button onClick={createLobby}>Create Lobby</button>
            <div>
                {lobbies.map(lobby => (
                    <div key={lobby.id}>
                        <h3>{lobby.name}</h3>
                        <button onClick={() => joinLobby(lobby.id)}>Join</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreateLobbyPage;
