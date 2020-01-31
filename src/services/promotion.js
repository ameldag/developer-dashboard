const axios = require('axios');

// const APIPATH = "http://localhost:8000/api/dashboard/v1"
const APIPATH = process.env.VUE_APP_API_PATH

export default {
    async promotions(data) {
        return await axios.get(APIPATH + `/promotions/teams/` + data.id , { headers: { 'x-access-token': data.token } })
        .catch((error) => {
        return error.response;
        });
    },
};