import React from "react";
import { Button } from "../../components/ui/Button.tsx";
import { useNavigate } from "react-router-dom";

const RulesPage = () => {

    const liStyle = {
        fontSize: "20px",
        fontWeight: "bold",
        color: "white",
    };
    const navigate = useNavigate();

    return (
        <div className="flex flex-col  gap-10">
            <Button onClick={() => navigate(-1)} className='bg-slate-700 p-3 text-2xl md:text-3xl font-medium lg:text-4xl hover:bg-slate-800 text-white self-start mt-10 w-36 h-auto rounded-none' size={'lg'}> Back</Button>

            <div className="text-5xl font-bold my-10 text-blue-900">Game Rules</div>

            <li style={liStyle}>
            While playing the Scrabble game, the players can add the total points they have acquired by selecting the “Add Points” button. After submitting the points, the gray box will proceed to the next player, and they can add points for themselves. The order of the player’s turn starts from the top to the bottom, and it will repeat until the players want to end the round.
            </li>
            <li style={liStyle}>
            When it comes to the player’s turn, the player can select the “Add Points” window and a popup window will appear. The player must select the amount of points they have acquired. They can click “Submit” button to proceed to the next person.
            </li>
            <li style={liStyle}>
            Based on the special box multiplier the previous player hit, the next player has to use the built in QR code scanner in the website to scan the QR code. The order of the list is arranged based on the difficulty level of the questions, where “2 letter” being the easiest while “3 word” being the hardest.  They will be brought into the question page, and the player is required to pick a correct answer out of the three options.
            </li>
            <li style={liStyle}>
            Once all of the players are done with playing Scrabble, they can select the “End Game” button located in the lobby page, and the leaderboard page will appear after the game has ended.
            </li>
        </div>
    )
}

export default RulesPage;
