const axios = require('./axios').instance;

export default {
    async team_members(data) {
        return await axios.get(`/editors/${data.id}`, { headers: { Authorization: data.token }})
		.catch((error) => {
            throw error;
        });
    },
    async inviteTeamMember(data, email) {
        return await axios.post(`/editors/${data.id}/invite`, { email: email },{ headers: { "x-access-token": data.token } })
        .catch((error) => {
            throw error;
        });
    },

};