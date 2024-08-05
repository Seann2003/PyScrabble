import React, { useState, useEffect } from 'react';
import PlayerCard from '../../components/ui/PlayerCard.tsx';
import CountdownTimer from '../../components/layout/CountdownTimer.tsx';
import { Button } from '../../components/ui/Button.tsx';
import supabase from '../../config/supabaseClient';
import { useSearchParams } from 'react-router-dom';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '../../components/ui/Dialog.tsx';
import PointsDialog from '../../components/ui/PointsDialog.tsx';
import { useNavigate } from 'react-router-dom';

interface Player {
    id: number;
    name: string;
    points: number;
}

const GamePage = () => {
    const navigate = useNavigate();
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isTimeEnd, setIsTimeEnd] = useState<boolean>(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [newPlayerName, setNewPlayerName] = useState<string>('');
    const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const handleTimeEnd = () => {
        setIsTimeEnd(true);
    }
    const code = searchParams.get('code');

    useEffect(() => {
        fetchPlayers();
    }, [code]);

    const addMatchHistory = async () => {
        try{
            await axios.post('http://localhost:3000/api/matchHistory', {user_id: 1, lobby_id: 1})
        }
    }

    const fetchPlayers = async () => {
        try {
            const { data: lobbyData, error: lobbyError } = await supabase
                .from('lobby')
                .select('id')
                .eq('lobby_code', code)
                .single();
    
            if (lobbyError) throw lobbyError;
            if (!lobbyData) throw new Error('Lobby not found');
    
            const lobbyId = lobbyData.id;
            console.log('Lobby ID:', lobbyId);
    
            const { data: playersData, error: playersError } = await supabase
                .from('players')
                .select('*')
                .eq('lobby_id', lobbyId);
    
            if (playersError) throw playersError;
            console.log('Players data:', playersData);
    
            const processedPlayers = await Promise.all(playersData.map(async (player) => {
                if (player.bot_name == null) {
                    const { data: userData, error: userError } = await supabase
                        .from('user')
                        .select('user_name')
                        .eq('id', player.user_id)
                        .single();
                    
                    if (userError) throw userError;
                    
                    return {
                        id: player.id,
                        name: userData.user_name,
                        points: player.final_points || 0,
                        lives: 4, // Assuming default lives is 4
                        isBot: false
                    };
                } else {
                    return {
                        id: player.id,
                        name: player.bot_name,
                        points: player.final_points || 0,
                        lives: 4, // Assuming default lives is 4
                        isBot: true
                    };
                }
            }));
    
            setPlayers(processedPlayers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmitPoints = async (points: number) => {
        if (players.length === 0) return;

        const updatedPlayers = [...players];
        const currentPlayer = updatedPlayers[currentPlayerIndex];
        currentPlayer.points += points;

        // Update the player's score in the database
        try {
            const { error } = await supabase
                .from('players')
                .update({ final_points: currentPlayer.points })
                .eq('id', currentPlayer.id);

            if (error) throw error;

            setPlayers(updatedPlayers);
            setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        } catch (error) {
            console.error('Error updating player score:', error);
        }
    };

    const addPlayer = async () => {
        if (!newPlayerName.trim() || !code) return;
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
                    bot_name: newPlayerName,
                    lobby_id: lobbyId,
                    final_points: 0
                })
                .select()
                .single();
            if (error) throw error;
    
            setPlayers(prevPlayers => [...prevPlayers, {
                id: data.id,
                name: data.bot_name,
                points: 0,
                lives: 4,
                isBot: true
            }]);
            setNewPlayerName('');
            setIsAddingPlayer(false);
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };
    console.log(players)

    return (
        <div className="max-w-3xl mx-auto h-screen p-6">
            <div className="bg-slate-300 shadow-lg rounded-lg flex flex-col items-center overflow-hidden">
                <div className="flex justify-between p-6 bg-gray-800 text-white w-full">
                    <div className="text-xl font-semibold">MATCH</div>
                    <CountdownTimer isStarted={isStarted} onTimeEnd={handleTimeEnd} />
                </div>
                <div className="p-6 w-full">
                    {players.map((player, index) => (
                        <PlayerCard
                            key={player.id}
                            ranking={null}
                            playerName={player.name}
                            points={player.points}
                            lives={4}
                            isActive={index === currentPlayerIndex}
                        />
                    ))}
                </div>
                <Button 
                    size={'lg'} 
                    onClick={() => setIsAddingPlayer(true)} 
                    className="mb-4"
                >
                    Add Player
                </Button>
                <Button 
                    size={'lg'} 
                    onClick={() => setIsStarted(true)} 
                    className={`w-full rounded-none ${isStarted ? 'bg-green-600 pointer-events-none' : 'bg-blue-700'}`}
                >
                    {isStarted ? 'Good Luck!' : 'Start Game'}     
                </Button>
                <Dialog open={isTimeEnd} onOpenChange={setIsTimeEnd}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Congratulations!</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 text-center">
                            <p>The timer has ended. Well done!</p>
                        </div>
                        <DialogClose onClick={() => navigate(`/winner/?code=${code}`)} className='bg-slate-700 p-3 text-white rounded-lg'>Winners Dashboard</DialogClose>
                    </DialogContent>
                </Dialog>
                <Dialog open={isAddingPlayer} onOpenChange={setIsAddingPlayer}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Player</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                            <input
                                type="text"
                                value={newPlayerName}
                                onChange={(e) => setNewPlayerName(e.target.value)}
                                placeholder="Enter player name"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={addPlayer}>Add Player</Button>
                        </div>
                    </DialogContent>
                </Dialog>
                {isStarted && <PointsDialog onSubmitPoints={handleSubmitPoints} />}
            </div>
        </div>
    );
}

export default GamePage;