const express = require('express');
const router = express.Router();
const { authenticateJwtToken } = require('../middleware/authenticateJwtToken');
const { adminOnly } = require('../middleware/adminOnly');
const supabase = require('../supabaseClient');

// Middleware to ensure the user is an admin
const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admins only' });
    }
};

// Create a question
const createQuestion = async (req, res) => {
    const { question_title, options, correct_answer, difficulty } = req.body;
    try {
        const { data, error } = await supabase
            .from('questions')
            .insert([{ question_title, options, correct_answer, difficulty }]);

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read all questions
const getAllQuestions = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('questions')
            .select('*');

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a question
const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { question_title, options, correct_answer, difficulty } = req.body;
    try {
        const { data, error } = await supabase
            .from('questions')
            .update({ question_title, options, correct_answer, difficulty })
            .eq('id', id);

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a question
const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('questions')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createQuestion, getAllQuestions, updateQuestion, deleteQuestion };
