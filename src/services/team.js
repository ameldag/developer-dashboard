const axios = require('./axios').instance;

export default {
    async team_members() {
        return await axios.get(`/editors/${localStorage.getItem("current_team")}`, { headers: { "x-access-token": localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    async inviteTeamMember(data) {
        return await axios.post(`/editors/${localStorage.getItem("current_team")}/invite`, data,{ headers: { "x-access-token": localStorage.getItem("token") } })
        .catch((error) => {
            throw error;
        });
    },

};