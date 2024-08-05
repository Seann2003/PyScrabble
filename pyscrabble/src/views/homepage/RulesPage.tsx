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
                A QR code sticker is pasted under the Scrabble board for users to scan
                using their phone's default QR scanner application. After scanning the QR code, they will be
                automatically brought into the game lobby. They also have the option to join the lobby using
                the room code at the top middle of the web page.
            </li>
            <li style={liStyle}>
                The game will start once all players have joined the lobby.
            </li>
            <li style={liStyle}>
                When it comes to the player’s turn, a popup window will appear, and the player must type in
                the total points after placing the word on the Scrabble board. If the player’s word is placed on
                any special box multipliers, they are required to select the special box multipliers.
            </li>
            <li style={liStyle}>
                Based on the special box multiplier the previous player hit, if any of the players in the lobby
                wish to negate the special box's effect, they can scan the QR code which will bring them to
                different questions with distinct difficulty. The order of the list is
                arranged based on the difficulty level of the questions, where “2 letter” being the easiest
                while “3 word” being the hardest.
            </li>
            <li style={liStyle}>
                If the player wants to negate the special box multiplier the other player got, they can scan the
                QR code using their phone’s default QR code scanner. They will be brought into the question
                page, and they have three minutes to choose the correct answer.
            </li>
            <li style={liStyle}>
                If the player managed to provide the correct solution, the previous player must resubmit their
                points without the special box's multiplier effect.
            </li>
            <li style={liStyle}>
                If the player provided the incorrect solution, this player would lose a life point, and the special
                box multiplier is not negated.
            </li>
            <li style={liStyle}>
                In the scenario where the other three players died or the 30 minutes play time is out, the game
                will be officially ended, and the page will first display the final winner of the game. After this, a new page will display the scoreboard containing the final ranking
                and points for each player in the lobby.
            </li>
        </div>
    )
}

export default RulesPage;
