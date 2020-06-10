const axios = require('./axios').instance;

export default {
    async myGames(data) {
        return await axios.get(`/games/${data.id}`, { headers: { "x-access-token": data.token } })
        .catch((error) => {
            throw error;
        });
    },
    async createGame(data, game) {
        return await axios.post(`/games/${data.id}` , game, { headers: { "x-access-token": data.token } })
        .catch((error) => {
            throw error;
        });
    },
    async updateGame(data, game) {
        return await axios.put(`/games/${data.id}/${data.game_id}`, game, { headers: { "x-access-token": data.token } })
        .catch((error) => {
            throw error;
        });
    },
};