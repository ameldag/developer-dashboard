const axios = require('./axios').instance;

export default {
    async retreiveAccount(id){
        return await axios.get(`/editors/payment/retreiveAccount/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        })
        .catch((error) => {
            throw error
        })
    },

    async countriesSpecs(){
        return await axios.get(`/editors/payment/country_specs`, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        })
        .catch((error) => {
            throw error
        })
    },

    async createAccount(data){
        return await axios.post(`/editors/create/connect_account`, data, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        })
        .catch((error) => {
            throw error
        })
    },

    async verificationLinks(data){
        return await axios.post(`/editors/payment/links`,
        data, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        })
        .catch((error) => {
            throw error
        })
    },

    async widhdraw(data){
        return await await axios.post(`/editors/payment/payout`,
        data, {
            headers: {
                'x-access-token': localStorage.getItem("token"),
            }
        })
        .catch((error) => {
            throw error
        })
    },
}