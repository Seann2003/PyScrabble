const supabase = require('../config/supabase')

const getWinners = async (req, res) => {
    const code = req.params.lobbyId
    console.log(code)
    const {data:checkCode, checkError} = await supabase
        .from('lobby')
        .select('*')
        .eq('lobby_code', code)
        .single();
    console.log(checkCode)
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('lobby_id', checkCode.id)
        .order('final_points', { ascending: false })
    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        console.log(data)
        res.status(200).json(data);
    }
}



module.exports = {
    getWinners
}