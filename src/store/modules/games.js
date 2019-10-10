import games from '../../services/games';
const state = {
    games: null,
    errorMessage: ''
};
// mutations
const mutations = {
    setGames(state, games) {
        state.games = games;
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

    games: state => {
        return state.games
    },

};
// actions
const actions = {

    async getGames(store, data) {

        await games.myGames(data).then(res => {
            console.log({res})
            if (res.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setGames', res.data.data);
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
