import React from "react";
import OptionCards from "../../../components/ui/OptionCards";

const HardQuestion = () =>{
    <>
        <section className="flex justify-center gap-x-4 items-center w-full">
                {python_quiz_questions.filter(question => question.difficulty === 3)
                .map((question, index) => (
                    <div key={index} className="flex justify-center items-center flex-col">
                        <div className="bg-red-500 text-white self-end mt-10 text-3xl pr-20 pl-5 py-2">Hard</div>
                        <div className="flex justify-center text-center items-center text-white rounded-lg max-w-[900px] h-[400px] text-4xl">{question.question_title}</div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-x-10">
                            {question.options.map((option, index) => {
                                return(
                                    <OptionCards key={index} answer={option}/>
                                )
                            })}
                        </div>
                    </div>

                ))}
        </section>
    </>
} 

export default HardQuestion;