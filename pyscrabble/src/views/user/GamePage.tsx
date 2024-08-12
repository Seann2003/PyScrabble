import React, { useState, useEffect } from 'react';
import PlayerCard from '../../components/ui/PlayerCard.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QrScanner from '../../components/layout/QRScanner.tsx';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '../../components/ui/Dialog.tsx';
import PointsDialog from '../../components/ui/PointsDialog.tsx';
import axios from 'axios';

interface Player {
    id: number;
    name: string;
    points: number;
}

const GamePage = () => {
    const navigate = useNavigate();
    const [isTimeEnd, setIsTimeEnd] = useState<boolean>(false);
    const [lobbyId, setLobbyId] = useState<number>(0);
    const [userId, setUserId] = useState<number>(0);
    const [players, setPlayers] = useState<Player[]>([]);
    const [newPlayerName, setNewPlayerName] = useState<string>('');
    const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [code, setCode] = useState<string | null>(null);
    const gameCode = searchParams.get('code');



    useEffect(() => {
        if (!gameCode) {
          navigate('/error', { state: { message: 'No game code provided' } });
        } else {
          setCode(gameCode);
        }
      }, [searchParams, navigate]);

      useEffect(() => {
        if (code) {
          fetchPlayers();
        }
      }, [code]);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/players/game/${code}`,{withCredentials: true});
            const players = response.data.players;
            setPlayers(players);
            setLobbyId(response.data.lobbyId);  
            const currentUser = players.find(player => !player.isBot);
            if (currentUser) {
                setUserId(currentUser.userId);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addMatchHistory = async () => {
        try {
            await axios.post('http://localhost:3000/api/matchHistory', { user_id: userId, lobby_id: lobbyId }, { withCredentials: true });
        } catch (error) {
            console.error('Error adding match history:', error);
        }
    };

    const handleSubmitPoints = async (points: number) => {
        if (players.length === 0) return;

        const updatedPlayers = [...players];
        const currentPlayer = updatedPlayers[currentPlayerIndex];
        const newPoints = currentPlayer.points + points;

        try {
            await axios.put(`http://localhost:3000/api/players/game/${currentPlayer.id}`, {
                playerId: currentPlayer.id,
                points: newPoints
            },{withCredentials: true});

            currentPlayer.points = newPoints;
            setPlayers(updatedPlayers);
            setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        } catch (error) {
            console.error('Error updating player score:', error);
        }
    };

    const addPlayer = async () => {
        if (!newPlayerName.trim() || !code) return;
        try {
            const response = await axios.post(`http://localhost:3000/api/players/game/${code}`, {
                code,
                playerName: newPlayerName
            },{withCredentials: true});

            setPlayers(prevPlayers => [...prevPlayers, response.data]);
            setNewPlayerName('');
            setIsAddingPlayer(false);
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto h-screen p-6">
            <Button onClick={() => navigate(-1)} className='bg-slate-700 p-3 text-2xl md:text-3xl font-medium lg:text-4xl hover:bg-slate-800 text-white self-start mt-10 w-36 h-auto rounded-none' size={'lg'}>Back</Button>
            <div className="bg-slate-300 shadow-lg rounded-lg flex flex-col items-center overflow-hidden">
                <div className="flex justify-between p-6 bg-gray-800 text-white w-full">
                    <div className="text-xl font-semibold">MATCH</div>
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
                    onClick={() => setIsTimeEnd(true)}
                    className={`w-full rounded-none bg-blue-700`}
                >
                    {isTimeEnd ? 'End Round' : 'End Round'}
                </Button>
                <Dialog open={isTimeEnd} onOpenChange={setIsTimeEnd}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Congratulations!</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 text-center">
                            <p>The game has ended. Well done!</p>
                        </div>
                        <DialogClose onClick={async (e) => {
                            e.preventDefault();
                            await addMatchHistory();
                            navigate(`/winner/?code=${code}`);
                        }} 
                        className='bg-slate-700 p-3 text-white rounded-lg'>
                            Winners Dashboard
                        </DialogClose>
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
                <PointsDialog onSubmitPoints={handleSubmitPoints} />
                <Button onClick={() => navigate(`/qrCode`)}>QR Code List To Download</Button>
            </div>
            <QrScanner />
        </div>
    );
}

export default GamePage;
