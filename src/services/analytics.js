const axios = require('./axios').instance;

export default {
    async game_played_monthly(data) {
        return await axios.post( `/analytics/game-played-monthly/` + data.id,{ headers: { 'x-access-token': localStorage.getItem("token") }})
        .catch((error) => {
            throw error;
        });
    },


    async installs_monthly(data) {
        return await axios.post( `/analytics/seemba-install-monthly/` + data.id,{ headers: { 'x-access-token': localStorage.getItem("token") }})
        .catch((error) => {
            throw error;
        });
    },

    async seembaARPDU(data){
        return await axios.post( `/analytics/seemba-arpdau-monthly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },

    async estimatedRevenue(data){
        return await axios.post( `/analytics/estimated-gross-revenue-monthly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },

    async allTournamentsWeekly(data){
        return await axios.post( `/analytics/all-tournaments-weekly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async freeTournamentsWeekly(data){
        return await axios.post( `/analytics/free-tournaments-weekly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async cashTournamentsWeekly(data){
        return await axios.post( `/analytics/cash-tournaments-weekly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async allChallengesWeekly(data){
        return await axios.post( `/analytics/all-challenges-weekly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async freeChallengesWeekly(data){
        return await axios.post( `/analytics/free-challenges-weekly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async cashChallengesWeekly(data){
        return await axios.post( `/analytics/cash-challenges-weekly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async netIncomeMonthly(data){
        return await axios.post( `/analytics/net-income-monthly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },

    async newReturningMonthly(data){
        return await axios.post( `/analytics/new-returning-monthly/${data.id}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },

};