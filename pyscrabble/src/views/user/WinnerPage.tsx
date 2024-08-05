import React, { useState, useEffect } from "react";
import PlayerCard from "../../components/ui/PlayerCard.tsx";
import { Button } from "../../components/ui/Button.tsx";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axios from 'axios';

interface Player {
    id: number;
    user_id: number;
    lobby_id: number;
    final_points: number;
    bot_name: string | null;
    user_name?: string;
}

const WinnerPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [players, setPlayers] = useState<Player[]>([]);
    const lobbyCode = searchParams.get('code');

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/players/${lobbyCode}`,{withCredentials: true});
                const playersData = response.data;
                setPlayers(playersData);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };

        if (lobbyCode) {
            fetchPlayers();
        }
    }, [lobbyCode]);

    const sortedPlayers = [...players].sort((a, b) => b.final_points - a.final_points);

    return (
        <div className="flex flex-col min-h-screen justify-center">
            <h1 className="text-7xl text-white font-bold text-center mb-10">Ranking</h1>
            <div>
                {sortedPlayers.map((player, index) => (
                    <div key={player.id} className="flex flex-col w-full items-center">
                        <PlayerCard 
                            ranking={index + 1} 
                            playerName={player.bot_name || player.user_name || 'Unknown'} 
                            points={player.final_points} 
                            lives={null}
                            cardSize="lg:w-[500px] md:w-96 w-72 p-5"
                        />
                    </div>
                ))}
            </div>
            <Button 
                onClick={() => navigate('/userPage')} 
                className='mr-28 bg-slate-700 p-3 text-2xl md:text-3xl font-medium lg:text-4xl hover:bg-slate-800 text-white self-end mt-10 w-36 h-auto rounded-none' 
                size={'lg'}
            > 
                Next
            </Button>
        </div>
    );
}

export default WinnerPage;