const axios = require('axios');

const APIPATH = "http://localhost:8000/api/dashboard/v1"
// const APIPATH = "https://seemba-api.herokuapp.com/api/dashboard/v1"

export default {
    async promotions(data) {
        return await axios.get(APIPATH + `/promotions/` + data.id , { headers: { 'x-access-token': data.token } })
        .catch((error) => {
        return error.response;
        });
    },
};