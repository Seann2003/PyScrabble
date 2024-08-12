import React, { useState, useEffect } from "react";
import OptionCards from "../../../components/ui/OptionCards.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MediumQuestion = () =>{
    const [randomQuestion, setRandomQuestion] = useState<any>(null);
    const MediumQuestionPageUrl = "http://localhost:3000/mediumQuestion";
    const navigate = useNavigate();

    useEffect(() => {
        const getRandomQuestion = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/questions/medium',{withCredentials: true});
                const data = response.data;
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
            alert("Correct Answer!!!");
            setTimeout(() => navigate(-1), 500);
        } else {
            alert("Wrong Answer");
        }
    }



    return(
        <>
            <section className="flex justify-center gap-x-4 items-center w-full">
                {randomQuestion && randomQuestion.options && Array.isArray(randomQuestion.options) ?(
                    <div className="flex justify-center items-center flex-col">
                        <div className="bg-yellow-500 text-white self-end mt-10 text-3xl pr-20 pl-5 py-2">Medium</div>
                        <div className="flex justify-center text-center items-start pt-32 text-white rounded-lg max-w-[900px] h-[300px] text-4xl">{randomQuestion.question_title}</div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-x-10 text-center">
                            {randomQuestion.options.map((option, index) => {
                                return(
                                    <OptionCards key={index} answer={option} onClick={() => handleOptionClick(option)}/>
                                )
                            })}
                        </div>
                    </div>
                ):(
                    <div>Loading...</div>
                )}
            </section>
        </>
    )
} 

export default MediumQuestion;