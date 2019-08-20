const axios = require('axios');
export default {
    async login(data) {
        return await axios.post(`https://seemba-api.herokuapp.com/api/dashboard/v1/authenticate`, data)
            .catch((error) => {
            return error.response;
        });
    },

    async getMe(data) {
        return await axios.get(`https://seemba-api.herokuapp.com/api/dashboard/v1/editors/me`, { headers: { Authorization: data } })
            .catch((error) => {
            return error.response;
        });
    }
};