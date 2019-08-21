const axios = require('axios');

const APIPATH = "https://api.seemba.com/api/dashboard/v1"

export default {
    async login(data) {
        return await axios.post(APIPATH + `/authenticate`, data)
            .catch((error) => {
            return error.response;
        });
    },

    async getMe(data) {
        return await axios.get(APIPATH + `/editors/me`, { headers: { Authorization: data } })
            .catch((error) => {
            return error.response;
        });
    }
};