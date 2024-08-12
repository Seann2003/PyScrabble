import React, { useEffect, useState } from "react";
import axios from "axios";
import TypewriterComponent from 'typewriter-effect/dist/react';
import { Button } from "../../../components/ui/Button.tsx";
import { useNavigate } from "react-router-dom";

interface MatchHistory {
  id: number;
  created_time: string;
  user_id: string;
  points: number;
  lobby_code: string;
}

const UserHistory: React.FC = () => {
    const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([]);
    const [user, setUser] = useState<string>("");
    const navigate = useNavigate();

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

        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user', {withCredentials: true});
                setUser(response.data.user_name);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="flex flex-col text-white items-center justify-center min-h-screen">
            <Button onClick={() => navigate(-1)} className='bg-slate-700 p-3 text-2xl md:text-3xl font-medium lg:text-4xl hover:bg-slate-800 text-white self-start mt-10 w-36 h-auto rounded-none' size={'lg'}> Back</Button>
            <span className="text-6xl font-bold mb-6">
            <TypewriterComponent
                options={{
                    strings: [`Welcome, ${user}`],
                    autoStart: true,
                    loop: true,
                    cursor: "|",
                    cursorClassName: "text-white",
                }}    
            />
            </span>
            <h2 className="text-4xl font-bold mb-6">Match History</h2>
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