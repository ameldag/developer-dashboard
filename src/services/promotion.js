import { updateLocale } from 'moment';

const axios = require('./axios').instance;

export default {

    async add(data){
        await axios.post(`/promotions/${localStorage.getItem('current_team')}` ,data ,{ headers: { "x-access-token": localStorage.getItem('token') } })
        .catch((error) => {
            throw error;
        })
    },

    async update(id, data){
        await axios.put(`/promotions/${id}` ,data ,{ headers: { "x-access-token": localStorage.getItem('token') } })
        .catch((error) => {
            throw error;
        })
    },

    async retreiveAll(data) {
        return await axios.get(`/promotions/teams/${data.id}`, { headers: { 'x-access-token': localStorage.getItem('token') } })
        .catch((error) => {
            throw error;
        });
    },

    async retreive(id) {
        return await axios.get(`/promotions/${id}`, { headers: { 'x-access-token': localStorage.getItem('token') } })
        .catch((error) => {
            throw error;
        });
    },
};