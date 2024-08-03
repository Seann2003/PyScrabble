import React, { useState } from 'react';
import PlayerCard from '../../components/ui/PlayerCard.tsx';
import CountdownTimer from '../../components/layout/CountdownTimer.tsx';
import { Button } from '../../components/ui/Button.tsx';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '../../components/ui/Dialog.tsx';
import { useNavigate } from 'react-router-dom';

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

const GamePage = () => {
    const navigate = useNavigate();
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isTimeEnd, setIsTimeEnd] = useState<boolean>(false);
    const sortedPlayers = players.sort((a, b) => b.points - a.points);
    const handleTimeEnd = () => {
        setIsTimeEnd(true);
    }
    return (
        <div className="max-w-3xl mx-auto h-screen p-6">
            <div className="bg-slate-300 shadow-lg rounded-lg flex flex-col items-center overflow-hidden">
                <div className="flex justify-between p-6 bg-gray-800 text-white w-full">
                    <div className="text-xl font-semibold">MATCH</div>
                    <CountdownTimer isStarted={isStarted} onTimeEnd={handleTimeEnd} />
                </div>
                <div className="p-6">
                    {sortedPlayers.map((player) => (
                        <PlayerCard
                            ranking={null}
                            playerName={player.name}
                            points={player.points}
                            lives={player.lives}
                        />
                    ))}
                </div>
                <Button size={'lg'} onClick={() => setIsStarted(true)} className={`w-full rounded-none ${isStarted ? 'bg-green-600 pointer-events-none' : 'bg-blue-700'}`}>
                   {isStarted? 'Good Luck!' : 'Start Game'}     
                </Button>
                <Dialog open={isTimeEnd} onOpenChange={setIsTimeEnd}>
                    <DialogTrigger asChild>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Congratulations!</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 text-center">
                            <p>The timer has ended. Well done!</p>
                        </div>
                        <DialogClose onClick={() => navigate('/userPage')} className='bg-slate-700 p-3 text-white rounded-lg'>Back to Main menu</DialogClose>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default GamePage;
