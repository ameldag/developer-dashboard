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

    async updateUser(user) {
        return await axios.put(`/editors`, user, { headers: { "x-access-token": localStorage.getItem('token') } })
        .catch((error) => {
            throw error;
        })
    },
    
    async confirmEmail(token) {
        return await axios.post(`/editors/confirmation`, { token: token }, null)
        .catch((error) => {
            throw error;
        })
    },
    
    async resentConfirmationEmail() {
        return await axios.post(`/editors/confirmation/resent`, null, { headers: { "x-access-token": localStorage.getItem('token') } })
        .catch((error) => {
            throw error;
        })
    },
    
    async resetPasswordEmail(data) {
        return await axios.post(`/editors/password/reset`, data, null)
        .catch((error) => {
            throw error;
        })
    },

};