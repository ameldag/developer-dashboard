const axios = require('axios');

// const APIPATH = "http://localhost:8000/api/dashboard/v1"
const APIPATH = process.env.VUE_APP_API_PATH

export default {
    async team_members(data) {
        return await axios.get(APIPATH + `/editors/` + data.id , { headers: { Authorization: data.token }})
		.catch((error) => {
            return error.response;
        });
    },

};