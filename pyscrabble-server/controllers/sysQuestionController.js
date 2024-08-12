const supabase = require('../config/supabase');

// Create a question
const createQuestion = async (req, res) => {
    const { question_title, options, correct_answer, difficulty } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('question')
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
            .from('question')
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
            .from('question')
            .update({ question_title, options, correct_answer, difficulty, updated_at: new Date() })
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
            .from('question')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createQuestion, getAllQuestions, updateQuestion, deleteQuestion };
