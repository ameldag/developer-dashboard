const axios = require('axios');

// const APIPATH = "http://localhost:8000/api/dashboard/v1"
const APIPATH = process.env.VUE_APP_API_PATH

export default {
    async myGames(data) {
        return await axios.get(APIPATH + `/games/` + data.id , { headers: { "x-access-token": data.token } })
        .catch((error) => {
            return error.response;
        });
    },
    async createGame(data, game) {
        return await axios.post(APIPATH + `/games/` + data.id , game, { headers: { "x-access-token": data.token } })
        .catch((error) => {
            return error.response;
        });
    },
    async updateGame(data, game) {
        return await axios.put(APIPATH + `/games/` + data.id + '/' + data.game_id, game, { headers: { "x-access-token": data.token } })
        .catch((error) => {
            return error.response;
        });
    },
};