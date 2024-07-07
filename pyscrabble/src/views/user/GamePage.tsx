import React from 'react';


interface Player {
    id: number;
    name: string;
    points: number;
    lives: number;
  }
  
  const players: Player[] = [
    { id: 1, name: 'PLAYER 1 (ME)', points: 1000, lives: 4 },
    { id: 2, name: 'PLAYER 2', points: 600, lives: 4 },
    { id: 3, name: 'PLAYER 3', points: 300, lives: 3 },
    { id: 4, name: 'PLAYER 4', points: 100, lives: 3 },
  ];

const GamePage = () => {
    return (
<div className="max-w-lg mx-auto font-sans">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <div className="text-lg font-bold">LOGO</div>
        <div className="text-lg font-bold">ROOM CODE #PSJO</div>
        <input
          type="text"
          placeholder="PLAYER_NAME"
          className="border p-2"
        />
      </div>
      <div className="flex justify-between p-4 bg-gray-300">
        <div className="text-xl font-bold">MATCH ONGOING</div>
        <div className="text-xl font-bold">TIME: 29:59</div>
      </div>
      <div className="p-4">
        {players.map(player => (
          <div
            key={player.id}
            className="flex justify-between items-center p-4 mb-2 bg-gray-100"
          >
            <div className="text-lg font-bold">{player.id}</div>
            <div className="text-lg font-bold">{player.name}</div>
            <div className="flex">
              {Array.from({ length: player.lives }).map((_, i) => (
                <span key={i} className="text-red-500">❤️</span>
              ))}
              {Array.from({ length: 4 - player.lives }).map((_, i) => (
                <span key={i} className="text-gray-300">❤️</span>
              ))}
            </div>
            <div className="text-lg font-bold">{player.points} PTS</div>
          </div>
        ))}
      </div>
    </div>
    );
}

export default GamePage;
