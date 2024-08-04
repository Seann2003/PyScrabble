const supabase = require('../config/supabase');

const getEasyQuestion = async (req, res) => {
    const { data, error } = await supabase
        .from('question')
        .select('*')
        .eq('difficulty',1)
    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }   
   
}

const getMediumQuestion = async (req, res) => {
    const { data, error } = await supabase
        .from('question')
        .select('*')
        .eq('difficulty',2);
    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }   
   
}

const getHardQuestion = async (req, res) => {
    const { data, error } = await supabase
        .from('question')
        .select('*')
        .eq('difficulty',3);
    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }   
   
}

const getInsaneQuestion = async (req, res) => {
    const { data, error } = await supabase
        .from('question')
        .select('*')
        .eq('difficulty',4);
    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }   
   
}


module.exports = {getEasyQuestion, getMediumQuestion, getHardQuestion, getInsaneQuestion}