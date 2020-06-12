const axios = require('./axios').instance;

export default {
    async retreiveAll() {
        return await axios.get(`/games/${localStorage.getItem("current_team")}`, { headers: { "x-access-token": localStorage.getItem("token") } })
        .catch((error) => {
            throw error;
        });
    },
    async retreive(id) {
        return await axios.get(`/games/${localStorage.getItem("current_team")}/${id}`)
        .catch((error) => {
            throw error;
        });
    },
    async create(data) {
        return await axios.post(`/games/${localStorage.getItem("current_team")}` , data, { headers: { "x-access-token": localStorage.getItem("token") } })
        .catch((error) => {
            throw error;
        });
    },
    async update(id, data)  {
        return await axios.put(`/games/${localStorage.getItem("current_team")}/${id}`, data, { headers: { "x-access-token": localStorage.getItem("token") } })
        .catch((error) => {
            throw error;
        });
    },
};