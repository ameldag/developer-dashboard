const axios = require('./axios').instance;

export default {
    async game_played_monthly() {
        return await axios.post( `/analytics/game-played-monthly/` + localStorage.getItem("current_team"),{ headers: { 'x-access-token': localStorage.getItem("token") }})
        .catch((error) => {
            throw error;
        });
    },


    async installs_monthly() {
        return await axios.post( `/analytics/seemba-install-monthly/` + localStorage.getItem("current_team"),{ headers: { 'x-access-token': localStorage.getItem("token") }})
        .catch((error) => {
            throw error;
        });
    },

    async seembaARPDU(){
        return await axios.post( `/analytics/seemba-arpdau-monthly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },

    async estimatedRevenue(){
        return await axios.post( `/analytics/estimated-gross-revenue-monthly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },

    async allTournamentsWeekly(){
        return await axios.post( `/analytics/all-tournaments-weekly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async freeTournamentsWeekly(){
        return await axios.post( `/analytics/free-tournaments-weekly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async cashTournamentsWeekly(){
        return await axios.post( `/analytics/cash-tournaments-weekly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async allChallengesWeekly(){
        return await axios.post( `/analytics/all-challenges-weekly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async freeChallengesWeekly(){
        return await axios.post( `/analytics/free-challenges-weekly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async cashChallengesWeekly(){
        return await axios.post( `/analytics/cash-challenges-weekly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },
    
    async netIncomeMonthly(){
        return await axios.post( `/analytics/net-income-monthly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },

    async newReturningMonthly(){
        return await axios.post( `/analytics/new-returning-monthly/${localStorage.getItem("current_team")}`, { headers: { 'x-access-token': localStorage.getItem("token") }})
		.catch((error) => {
            throw error;
        });
    },

};