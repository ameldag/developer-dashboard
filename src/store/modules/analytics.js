import analytics from '../../services/analytics';
const state = {
    game_played_monthly : 0,
    game_played_monthly_percentage : 0,
    new_installs: 0,
    percentage_of_new_installs: 0,
    arpdu: 0,
    percentage_arpdu: 0,
    revenue: 0,
    percentage_revenue: 0,
    all_tournaments: 0,
	all_tournaments_chart: [],
    free_tournaments: 0,
	free_tournaments_chart: [],
    cash_tournaments: 0,
	cash_tournaments_chart: [],
    all_challenges: 0,
	all_challenges_chart: [],
    free_challenges: 0,
	free_challenges_chart: [],
    cash_challenges: 0,
	cash_challenges_chart: [],
    errorMessage: ''
};
// mutations
const mutations = {
    setGamePlayedMonthly(state, game_played_monthly) {
        state.game_played_monthly = game_played_monthly;
    },
    setGamePlayedMonthlyPercentage(state, game_played_monthly_percentage) {
        state.game_played_monthly_percentage = game_played_monthly_percentage;
    },
    setNewInstalls(state, new_installs) {
        state.new_installs = new_installs;
    },
    setPercentageNewInstalls(state, percentage_of_new_installs) {
        state.percentage_of_new_installs = percentage_of_new_installs;
    },
    setArpdu(state, arpdu) {
        state.arpdu = arpdu;
    },
    setPercentageArpdu(state, percentage_arpdu) {
        state.percentage_arpdu = percentage_arpdu;
    },
    setRevenue(state, revenue) {
        state.revenue = revenue;
    },
    setPercentageRevenue(state, percentage_revenue) {
        state.percentage_revenue = percentage_revenue;
    },
    setAllTournaments(state, all_tournaments) {
        state.all_tournaments = all_tournaments;
    },
    setAllTournamentsChart(state, all_tournaments_chart) {
        state.all_tournaments_chart = all_tournaments_chart;
    },
    setFreeTournaments(state, free_tournaments) {
        state.free_tournaments = free_tournaments;
    },
    setFreeTournamentsChart(state, free_tournaments_chart) {
        state.free_tournaments_chart = free_tournaments_chart;
    },
    setCashTournaments(state, cash_tournaments) {
        state.cash_tournaments = cash_tournaments;
    },
    setCashTournamentsChart(state, cash_tournaments_chart) {
        state.cash_tournaments_chart = cash_tournaments_chart;
    },
    setAllChallenges(state, all_challenges) {
        state.all_challenges = all_challenges;
    },
    setAllChallengesChart(state, all_challenges_chart) {
        state.all_challenges_chart = all_challenges_chart;
    },
    setFreeChallenges(state, free_challenges) {
        state.free_challenges = free_challenges;
    },
    setFreeChallengesChart(state, free_challenges_chart) {
        state.free_challenges_chart = free_challenges_chart;
    },
    setCashChallenges(state, cash_challenges) {
        state.cash_challenges = cash_challenges;
    },
    setCashChallengesChart(state, cash_challenges_chart) {
        state.cash_challenges_chart = cash_challenges_chart;
    },
    setErrorMessage(state, msg) {
        state.errorMessage = msg;
    },
    clearMessage(state) {
        state.errorMessage = '';
    }
};
// getters
const getters = {

    gamePlayedMonthly: state => {
        return state.game_played_monthly
    },
    gamePlayedMonthlyPercentage: state => {
        return state.game_played_monthly_percentage
    },
    newInstalls: state => {
        return state.new_installs
    },
    percentageNewInstalls: state => {
        return state.percentage_of_new_installs
    },
    arpdu: state => {
        return state.arpdu
    },
    percentageArpdu: state => {
        return state.percentage_arpdu
    },
    revenue: state => {
        return state.revenue
    },
    percentageRevenue: state => {
        return state.percentage_revenue
    },
    allTournaments: state => {
        return state.all_tournaments
    },
    allTournamentsChart: state => {
        return state.all_tournaments_chart
    },
    freeTournaments: state => {
        return state.free_tournaments
    },
    freeTournamentsChart: state => {
        return state.free_tournaments_chart
    },
    cashTournaments: state => {
        return state.cash_tournaments
    },
    cashTournamentsChart: state => {
        return state.cash_tournaments_chart
    },
    allChallenges: state => {
        return state.all_challenges
    },
    allChallengesChart: state => {
        return state.all_challenges_chart
    },
    freeChallenges: state => {
        return state.free_challenges
    },
    freeChallengesChart: state => {
        return state.free_challenges_chart
    },
    cashChallenges: state => {
        return state.cash_challenges
    },
    cashChallengesChart: state => {
        return state.cash_challenges_chart
    },
};
// actions
const actions = {

    async game_played_monthly(store, data) {

        await analytics.game_played_monthly(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setGamePlayedMonthly', res.data.data.currentMonth);
                store.commit('setGamePlayedMonthlyPercentage', res.data.data.percentage);
                store.commit('clearMessage');
            }
        })
    },

    async newInstalls(store, data) {

        await analytics.installs_monthly(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setNewInstalls', res.data.data.currentMonth);
                store.commit('setPercentageNewInstalls', res.data.data.percentage);
                store.commit('clearMessage');
            }
        })
    },

    async ARPDU(store, data) {

        await analytics.seembaARPDU(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setArpdu', res.data.data.currentMonth);
                store.commit('setPercentageArpdu', res.data.data.percentage);
                store.commit('clearMessage');
            }
        })
    },

    async revenue(store, data) {

        await analytics.estimatedRevenue(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setRevenue', res.data.data.currentMonth);
                store.commit('setPercentageRevenue', res.data.data.percentage);
                store.commit('clearMessage');
            }
        })
    },

    async allTournaments(store, data) {

        await analytics.allTournamentsWeekly(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setAllTournaments', res.data.data.total);
                store.commit('setAllTournamentsChart', res.data.data.chart);
                store.commit('clearMessage');
            }
        })
    },

    async freeTournaments(store, data) {

        await analytics.freeTournamentsWeekly(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setFreeTournaments', res.data.data.total);
                store.commit('setFreeTournamentsChart', res.data.data.chart);
                store.commit('clearMessage');
            }
        })
    },

    async cashTournaments(store, data) {

        await analytics.cashTournamentsWeekly(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setCashTournaments', res.data.data.total);
                store.commit('setCashTournamentsChart', res.data.data.chart);
                store.commit('clearMessage');
            }
        })
    },

    async allChallenges(store, data) {

        await analytics.allChallengesWeekly(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setAllChallenges', res.data.data.total);
                store.commit('setAllChallengesChart', res.data.data.chart);
                store.commit('clearMessage');
            }
        })
    },

    async freeChallenges(store, data) {

        await analytics.freeChallengesWeekly(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setFreeChallenges', res.data.data.total);
                store.commit('setFreeChallengesChart', res.data.data.chart);
                store.commit('clearMessage');
            }
        })
    },

    async cashChallenges(store, data) {

        await analytics.cashChallengesWeekly(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setCashChallenges', res.data.data.total);
                store.commit('setCashChallengesChart', res.data.data.chart);
                store.commit('clearMessage');
            }
        })
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
