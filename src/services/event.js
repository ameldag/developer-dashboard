const axios = require('./axios').instance;

export default {

    async add(data) {
        return await axios.post(`/events/${localStorage.getItem('current_team')}`, data, {
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
            })
            .catch((error) => {
                throw error;
            })
    },

    async update(id, data) {
        return await axios.put(`/events/${localStorage.getItem('current_team')}/${id}`, data, {
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
            })
            .catch((error) => {
                throw error;
            })
    },

    async retreiveAll(data) {
        return await axios.get(`/events/teams/${localStorage.getItem('current_team')}?eventPeriode=` + data.eventPeriode + ((data.game_id == undefined) ? '' :
                `&game_id=` + data.game_id), {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .catch((error) => {
                throw error;
            });
    },

    async retreive(id) {
        return await axios.get(`/events/${id}`, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    async leaderboardEvent(id) {
        return await axios.post(`/events/${id}/leaderboard`, {
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
            })
            .catch((error) => {
                throw error;
            })
    }

};