const axios = require('axios');

// const APIPATH = "http://localhost:8000/api/dashboard/v1"
const APIPATH = process.env.VUE_APP_API_PATH

export default {
    async myGames(data) {
        return await axios.get(APIPATH + `/games/` + data.id , { headers: { Authorization: data.token } })
            .catch((error) => {
            return error.response;
        });
    },

};