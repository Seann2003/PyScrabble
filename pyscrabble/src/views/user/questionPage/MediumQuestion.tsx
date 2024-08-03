import React from "react";
import OptionCards from "../../../components/ui/OptionCards.tsx";

const python_quiz_questions = [
    {
        "question": "What keyword is used to define a class in Python?",
        "options": ["class", "def", "function"],
        "correct_answer": "class",
        "difficulty": 1
    },
    {
        "question": "Which method is automatically called when an object is created?",
        "options": ["__init__", "__main__", "__str__"],
        "correct_answer": "__init__",
        "difficulty": 1
    },
    {
        "question": "What is the first parameter in a method definition within a class?",
        "options": ["self", "this", "class"],
        "correct_answer": "self",
        "difficulty": 1
    },
    {
        "question": "What is encapsulation in object-oriented programming?",
        "options": [
            "Hiding implementation details",
            "Creating multiple instances",
            "Defining class methods"
        ],
        "correct_answer": "Hiding implementation details",
        "difficulty": 2
    },
    {
        "question": "Which of the following is used to create an instance of a class?",
        "options": [
            "Constructor",
            "Method",
            "Attribute"
        ],
        "correct_answer": "Constructor",
        "difficulty": 2
    },
    {
        "question": "What does the 'super()' function do in a class?",
        "options": [
            "Calls a method from the parent class",
            "Creates a new instance",
            "Defines a static method"
        ],
        "correct_answer": "Calls a method from the parent class",
        "difficulty": 2
    },
    {
        "question": "What is method overriding in Python?",
        "options": [
            "Defining a method in a subclass with the same name as in the superclass",
            "Creating multiple methods with the same name in a single class",
            "Using a method from another class without inheriting"
        ],
        "correct_answer": "Defining a method in a subclass with the same name as in the superclass",
        "difficulty": 3
    },
    {
        "question": "Which of the following is true about multiple inheritance in Python?",
        "options": [
            "A class can inherit from multiple parent classes",
            "Python doesn't support multiple inheritance",
            "Only the first parent class methods are accessible"
        ],
        "correct_answer": "A class can inherit from multiple parent classes",
        "difficulty": 3
    },
    {
        "question": "What is a metaclass in Python?",
        "options": [
            "A class that defines the behavior of other classes",
            "A class that cannot be instantiated",
            "A class that only contains static methods"
        ],
        "correct_answer": "A class that defines the behavior of other classes",
        "difficulty": 3
    },    
    {
        "question": "What is the output of the following code?\n\nclass A:\n    def __init__(self):\n        print(1)\n\nclass B(A):\n    def __init__(self):\n        print(2)\n        super().__init__()\n\nclass C(B):\n    def __init__(self):\n        print(3)\n        super().__init__()\n\nC()",
        "options": [
            "3 2 1",
            "1 2 3",
            "3 1 2"
        ],
        "correct_answer": "3 2 1",
        "difficulty": 4
    },
    {
        "question": "Which of the following is true about the __slots__ attribute in Python classes?",
        "options": [
            "It can improve memory usage and attribute access time",
            "It automatically creates getter and setter methods",
            "It defines abstract methods that must be implemented in subclasses"
        ],
        "correct_answer": "It can improve memory usage and attribute access time",
        "difficulty": 4
    },
    {
        "question": "What is the purpose of the __new__ method in Python classes?",
        "options": [
            "To control instance creation before __init__ is called",
            "To define class-level attributes",
            "To implement multiple inheritance"
        ],
        "correct_answer": "To control instance creation before __init__ is called",
        "difficulty": 4
    }
]

const MediumQuestion = () =>{
    <>
        <section className="flex justify-center gap-x-4 items-center w-full">
            {python_quiz_questions.filter(question => question.difficulty === 2)
            .map((question, index) => (
                <div key={index} className="flex justify-center items-center flex-col">
                    <div className="bg-yellow-300 text-white self-end mt-10 text-3xl pr-20 pl-5 py-2">Medium</div>
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

export default MediumQuestion;