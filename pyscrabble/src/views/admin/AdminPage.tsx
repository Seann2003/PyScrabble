import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '../../components/ui/Input.tsx';
import { Button } from '../../components/ui/Button.tsx';

interface Question {
    id: string;
    question_title: string;
    options: string[];
    correct_answer: string;
    difficulty: number;
}

const AdminPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [form, setForm] = useState<Question>({ id: '', question_title: '', options: ['', '', ''], correct_answer: '', difficulty: 1 });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            // Fetching the questions from the server
            const response = await axios.get('http://localhost:3000/api/sysQuestions/questions', { withCredentials: true });
            setQuestions(response.data);
        } catch (error) {
            console.error('Some errors occured while fetching the question', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // If statement for dealing with options
        if (name.startsWith('option')) {
            const index = parseInt(name.replace('option','')) - 1;

            setForm(prev => {
                // Ensure options is an array
                const options = Array.isArray(prev.options) ? [...prev.options] : [];
    
                // Update the specific option at the index
                options[index] = value;
    
                return { ...prev, options };
            });
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const submissionData = {
                ...form,
            };
            // If the question is being edited not created, then can update the question
            if (isEditing) {
                await axios.put(`http://localhost:3000/api/sysQuestions/questions/${form.id}`, submissionData, { withCredentials: true });
                alert('Question updated successfully');
            } else {
                await axios.post('http://localhost:3000/api/sysQuestions/questions', submissionData, { withCredentials: true });
                alert('Question created successfully');
            }
            setForm({ id: '', question_title: '', options: ['', '', ''], correct_answer: '', difficulty: 1 });
            setIsEditing(false);
            fetchQuestions();
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    const handleEdit = (question: Question) => {
        setForm({
            ...question,
            options: [...question.options, ...Array(3 - question.options.length).fill('')] // Ensure 3 options
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/sysQuestions/questions/${id}`, { withCredentials: true });
            alert('Question deleted successfully');
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <section className='flex flex-col items-center justify-center text-white'>
            <h1 className='text-2xl font-bold my-4'>Admin Page</h1>
            
            <form onSubmit={handleSubmit} className=' flex flex-col w-full max-w-lg mb-8 text-black'>
                <label htmlFor="question_title">Question Title</label>
                <Input
                    type="text"
                    name="question_title"
                    value={form.question_title}
                    onChange={handleChange}
                    placeholder="Question Title"
                    required
                />
                <label htmlFor="options">Options</label>

                {Array.isArray(form.options) && form.options.map((option, index) => (
                    <Input
                        key={index}
                        type="text"
                        name={`option${index + 1}`}
                        value={option}
                        onChange={handleChange}
                        placeholder={`Option ${index + 1}`}
                        required={index === 3} // At least 3 options required
                    />
                ))}
                <label htmlFor="correct_answer">Correct Answer</label>
                <Input
                    type="text"
                    name="correct_answer"
                    value={form.correct_answer}
                    onChange={handleChange}
                    placeholder="Correct Answer"
                    required
                />
                <label htmlFor="difficulty">Difficulty</label>
                <Input
                    type="number"
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    placeholder="Difficulty"
                    required
                />
                <Button type="submit" variant={'secondary'} className='mt-4'>
                    {isEditing ? 'Update Question' : 'Create Question'}
                </Button>
            </form>

            <h2 className='text-xl font-bold mb-2'>Available Questions</h2>
            <ul className='w-full max-w-2xl'>
                {questions.map((question) => (
                    <li key={question.id} className='bg-gray-800 p-4 mb-4 rounded'>
                        <h3 className='font-bold'>{question.question_title}</h3>
                        <h1>Options:</h1>
                        <h1>{`1) ${question.options[0]}`}</h1>
                        <h1>{`2) ${question.options[1]}`}</h1>
                        <h1>{`3) ${question.options[2]}`}</h1>
                        <p>Correct Answer: {question.correct_answer}</p>
                        <p>Difficulty: {question.difficulty}</p>
                        <div className='mt-2'>
                            <button onClick={() => handleEdit(question)} className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2'>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(question.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AdminPage;
