import React from "react";
import PlayerCard from "../../components/ui/PlayerCard.tsx";
import { Button } from "../../components/ui/Button.tsx";
import { useNavigate } from "react-router-dom";

interface Player {
    id: number;
    name: string;
    points: number;
    lives: number;
}

const players: Player[] = [
    { id: 1, name: 'Alex', points: 10, lives: 4 },
    { id: 2, name: 'John', points: 600, lives: 4 },
    { id: 3, name: 'Bob', points: 300, lives: 3 },
    { id: 4, name: 'David', points: 100, lives: 3 },
];

const WinnerPage = () =>{
    const navigate = useNavigate();
    const sortPlayersByRanking = players.sort((a,b) => b.points - a.points)
    return(
        <div className="flex flex-col min-h-screen justify-center">
            <h1 className="text-7xl text-white font-bold text-center mb-10">Ranking</h1>
            <div>
                {sortPlayersByRanking.map((player, index) => (
                    <div key={player.id} className="flex flex-col w-full items-center">
                        <PlayerCard ranking={index + 1} playerName={player.name} points={player.points} lives={null} cardSize="lg:w-[500px] md:w-96 w-72 p-5"/>
                    </div>
                ))}
            </div>
            <Button onClick={() => navigate('/userPage')} 
                className='mr-28 bg-slate-700 p-3 text-2xl md:text-3xl font-medium lg:text-4xl hover:bg-slate-800 text-white self-end mt-10 w-36 h-auto rounded-none' 
                size={'lg'}
            > 
                Next
            </Button>

        </div>
    )
}

export default WinnerPage