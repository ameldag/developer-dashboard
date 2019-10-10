const axios = require('axios');

// const APIPATH = "https://api.seemba.com/api/dashboard/v1"
const APIPATH = "https://seemba-api.herokuapp.com/api/dashboard/v1"

export default {
    async myGames(data) {
        return await axios.get(APIPATH + `/games/` + data.id , { headers: { Authorization: data.token } })
            .catch((error) => {
            return error.response;
        });
    },

};