const axios = require('axios');

const APIPATH = "http://localhost:8000/api/dashboard/v1"
// const APIPATH = "https://seemba-api.herokuapp.com/api/dashboard/v1"

export default {
    async login(data) {
        return await axios.post(APIPATH + `/authenticate`, data)
            .catch((error) => {
            return error.response;
        });
    },

    async signup(data) {
        return await axios.post(APIPATH + `/editors`, data)
            .catch((error) => {
            return error.response;
        });
    },

    async getMe(data) {
        return await axios.get(APIPATH + `/editors/me`, { headers: { 'x-access-token': data } })
            .catch((error) => {
            return error.response;
        });
    }
};