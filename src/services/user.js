const axios = require('./axios').instance;

export default {
    async uploadAvatar(avatar) {
        const formData = new FormData();
        formData.append('image',avatar)
        return await axios.post(`/editors/picture/upload` , formData, { headers: { "x-access-token": localStorage.getItem('token') } })
        .catch((error) => {
            throw error;
        })
    },
    async updateUser(data, user) {
        return await axios.put(`/editors/${data.id}/personal`, user, { headers: { "x-access-token": data.token } })
        .catch((error) => {
            throw error;
        })
        
    },

};