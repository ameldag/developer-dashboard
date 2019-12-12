const axios = require('axios');

const APIPATH = "http://localhost:8000/api/dashboard/v1"
// const APIPATH = "https://seemba-api.herokuapp.com/api/dashboard/v1"

export default {
    async game_played_monthly(data) {
        return await axios.post(APIPATH + `/analytics/game-played-monthly/` + data.id,{ headers: { 'x-access-token': data.token }})
        .catch((error) => {
            return error.response;
        });
    },


    async installs_monthly(data) {
        return await axios.post(APIPATH + `/analytics/seemba-install-monthly/` + data.id,{ headers: { 'x-access-token': data.token }})
        .catch((error) => {
            return error.response;
        });
    },

    async seembaARPDU(data){
        return await axios.post(APIPATH + `/analytics/seemba-arpdau-monthly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },

    async estimatedRevenue(data){
        return await axios.post(APIPATH + `/analytics/estimated-gross-revenue-monthly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },

    async allTournamentsWeekly(data){
        return await axios.post(APIPATH + `/analytics/all-tournaments-weekly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },
    
    async freeTournamentsWeekly(data){
        return await axios.post(APIPATH + `/analytics/free-tournaments-weekly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },
    
    async cashTournamentsWeekly(data){
        return await axios.post(APIPATH + `/analytics/cash-tournaments-weekly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },
    
    async allChallengesWeekly(data){
        return await axios.post(APIPATH + `/analytics/all-challenges-weekly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },
    
    async freeChallengesWeekly(data){
        return await axios.post(APIPATH + `/analytics/free-challenges-weekly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },
    
    async cashChallengesWeekly(data){
        return await axios.post(APIPATH + `/analytics/cash-challenges-weekly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },
    
    async netIncomeMonthly(data){
        return await axios.post(APIPATH + `/analytics/net-income-monthly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },

    async newReturningMonthly(data){
        return await axios.post(APIPATH + `/analytics/new-returning-monthly/` + data.id,{ headers: { 'x-access-token': data.token }})
		.catch((error) => {
            return error.response;
        });
    },

};