const axios = require('./axios').instance;

export default {
    async login(data) {
        return await axios.post(`/authenticate`, data)
        .catch((error) => {
            throw error;
        });
    },

    async signup(data) {
        return await axios.post(`/editors`, data)
        .catch((error) => {
            throw error;
        });
    },

    async getMe() {
        return await axios.get(`/editors/me`, { headers: { 'x-access-token': localStorage.getItem('token') } })
        .catch((error) => {
            throw error;
        });
    }
};