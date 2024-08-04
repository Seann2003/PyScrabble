import React, { useState, useEffect } from "react";
import OptionCards from "../../../components/ui/OptionCards.tsx";
import QRCode from 'qrcode.react';
import { useNavigate } from "react-router-dom";

const InsaneQuestion = () =>{
    const [randomQuestion, setRandomQuestion] = useState<any>(null);
    const InsaneQuestionPageUrl = "http://localhost:3001/insaneQuestion";
    const navigate = useNavigate();

    useEffect(() => {
        const getRandomQuestion = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/insane');
                const data = await response.json();
                const randomQuestion = data[Math.floor(Math.random() * data.length)];
                setRandomQuestion(randomQuestion);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        getRandomQuestion();
    },[]);


    const handleOptionClick = (option: string) => {
        if(option === randomQuestion.correct_answer){
            setTimeout(() => navigate(-1), 500);
        } else {
            alert("Wrong Answer");
        }
    }



    return(
        <>
            <QRCode value={InsaneQuestionPageUrl} size={256} />
            <section className="flex justify-center gap-x-4 items-center w-full">
                {randomQuestion && (
                    <div className="flex justify-center items-center flex-col">
                        <div className="bg-red-500 text-white self-end mt-10 text-3xl pr-20 pl-5 py-2">Insane</div>
                        <div className="flex justify-center text-center items-start pt-32 text-white rounded-lg max-w-[900px] h-[300px] text-4xl">{randomQuestion.question_title}</div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-x-10">
                            {randomQuestion.options.map((option, index) => {
                                return(
                                    <OptionCards key={index} answer={option} onClick={() => handleOptionClick(option)}/>
                                )
                            })}
                        </div>
                    </div>

                )}
            </section>
        </>
    )
} 

export default InsaneQuestion;