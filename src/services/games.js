const axios = require('axios');

// const APIPATH = "http://localhost:8000/api/dashboard/v1"
const APIPATH = process.env.VUE_APP_API_PATH

export default {
    async myGames(data) {
        return await axios.get(APIPATH + `/games/` + data.id , { headers: { Authorization: data.token } })
        .catch((error) => {
            return error.response;
        });
    },
    async createGame(data, game) {
        return await axios.post(APIPATH + `/games/` + data.id , game, { headers: { Authorization: data.token } })
        .catch((error) => {
            return error.response;
        });
    },
    async updateGame(data, game) {
        return await axios.put(APIPATH + `/games/` + data.id + '/' + data.game_id, game, { headers: { Authorization: data.token } })
        .catch((error) => {
            return error.response;
        });
    },
    async uploadIcon(icon){
        const formData = new FormData();
        formData.append('image',icon)
        return await axios.post(APIPATH + '/games/image/upload',formData ,{ headers: { "x-access-token": localStorage.getItem('token') } })
        .catch((error) => {
            return error.response;
        });	
    },
    async uploadBackgroundImage(image){
        const formData = new FormData();
        formData.append('image',image)
        return await axios.post(APIPATH + '/games/image/upload',formData ,{ headers: { "x-access-token": localStorage.getItem('token') } })
        .catch((error) => {
            return error.response;
        });	
    },
    async uploadp12File(file){
        const formData = new FormData();
        formData.append('file',file)
        return await axios.post(APIPATH + '/games/upload',formData ,{ headers: { "x-access-token": localStorage.getItem('token') } })
        .catch((error) => {
            return error.response;
        });	
    },
};