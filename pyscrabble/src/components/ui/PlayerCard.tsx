import React from "react";
import HeartLogo from '../../assets/heart.jpeg'
import { FaHeart } from "react-icons/fa";


interface PlayerCardProps{
    ranking: number | null;
    playerName: string;
    points: number;
    lives: number | null;
    cardSize?: string;
    isActive?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ ranking, playerName, points, lives, cardSize, isActive}) => {
    return (
        <>
            <div className={`flex items-center p-4 mb-2 bg-[rgb(22,20,64)]  ${isActive ? 'bg-slate-400': 'bg-white'} rounded-md  text-white ${cardSize}`}>
                {ranking != null? (
                    <div className="lg:text-3xl text-xl lg:w-32 md:w-24 w-12 font-bold ">{ranking}</div>
                ) : ''}
                <div className={` ${ranking!=null ? 'w-full justify-between' : ''} flex`}>
                    <div className={`lg:text-lg text-sm lg:w-32 w-16 text-ellipsis text-wrap overflow-hidden font-bold ${ranking!=null ? 'lg:text-3xl text-xl' : ''}`}>
                        {playerName}
                    </div>
                    {lives != null?  (
                    <>     
                        <div className="flex lg:w-64 w-32">
                            {Array.from({ length: lives }).map((_, i) => (
                                <FaHeart key={i} className="lg:w-8 lg:h-7 w-6 h-5 text-red-500" />
                            ))}
                        </div>
                    </>) : ''}
                    <div className={`lg:text-lg text-sm font-bold ${ranking!=null ? 'lg:text-3xl text-xl' : ''}`}>{points}PTS</div>
                </div>


            </div>
        </>
    );
}

export default PlayerCard;