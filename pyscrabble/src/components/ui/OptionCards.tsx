import React from "react";

interface QuestionCardsProps{
    answer: string
}

const QuestionCards: React.FC<QuestionCardsProps> = ({answer}) => {
    return (
        <>
            <div className="flex items-center justify-center rounded-lg p-4 mb-2 w-[310px] h-[324px] bg-slate-600 hover:bg-slate-500 text-white cursor-pointer text-2xl">
                {answer}
            </div>
        </>
    );
}

export default QuestionCards;