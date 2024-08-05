import React, { useEffect, useState } from "react";
import axios from "axios";

interface MatchHistory {
  id: number;
  created_time: string;
  user_id: string;
  points: number;
  lobby_code: string;
}

const UserHistory: React.FC = () => {
  const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([]);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/matchHistory', {withCredentials: true});
        setMatchHistory(response.data);
      } catch (error) {
        console.error("Error fetching match history:", error);
      }
    };
    fetchMatchHistory();
  }, []);

  return (
    <div className="flex flex-col text-white items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Match History</h1>
      {matchHistory.length > 0 ? (
        <ul className="w-full max-w-md">
          {matchHistory.map((match) => (
            <li key={match.id} className="mb-4 p-4 border rounded shadow">
              <p>Lobby Code: {match.lobby_code}</p>
              <p>Date: {new Date(match.created_time).toLocaleString()}</p>
              <p>Points: {match.points}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No match history available.</p>
      )}
    </div>
  );
};

export default UserHistory;