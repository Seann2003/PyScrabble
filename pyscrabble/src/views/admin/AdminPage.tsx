import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import axios from 'axios';

const AdminPage = () => {
    const [questions, setQuestions] = useState([]);
    const [form, setForm] = useState({ question_title: '', options: '', correct_answer: '', difficulty: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/questions', { withCredentials: true });
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:3000/questions/${editId}`, form, { withCredentials: true });
            } else {
                await axios.post('http://localhost:3000/questions', form, { withCredentials: true });
            }
            setForm({ question_title: '', options: '', correct_answer: '', difficulty: '' });
            setIsEdit(false);
            fetchQuestions();
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    const handleEdit = (question) => {
        setForm(question);
        setIsEdit(true);
        setEditId(question.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/questions/${id}`, { withCredentials: true });
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="question_title"
                    value={form.question_title}
                    onChange={handleChange}
                    placeholder="Question Title"
                    required
                />
                <Input
                    type="text"
                    name="options"
                    value={form.options}
                    onChange={handleChange}
                    placeholder="Options (comma separated)"
                    required
                />
                <Input
                    type="text"
                    name="correct_answer"
                    value={form.correct_answer}
                    onChange={handleChange}
                    placeholder="Correct Answer"
                    required
                />
                <Input
                    type="number"
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    placeholder="Difficulty"
                    required
                />
                <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
            </form>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        {question.question_title} - {question.correct_answer}
                        <button onClick={() => handleEdit(question)}>Edit</button>
                        <button onClick={() => handleDelete(question.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
