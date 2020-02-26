const axios = require('axios');

// const APIPATH = "http://localhost:8000/api/dashboard/v1"
const APIPATH = process.env.VUE_APP_API_PATH

export default {
    async uploadAvatar(avatar) {
        const formData = new FormData();
        formData.append('image',avatar)
        return await axios.post(APIPATH + `/editors/picture/upload` ,formData ,{ headers: { "x-access-token": localStorage.getItem('token') } })
    },
    async updateUser(data, user) {
        return await axios.put(APIPATH + `editors/` + data.id + '/personal' ,user ,{ headers: { "x-access-token": data.token } })
        
    },

};