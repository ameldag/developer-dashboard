import games from '../../services/games';
const state = {
    games: [],
    currentGame: {
        name: '',
        description: '',
        icon: '',
        background_image: '',
        fcm_file: '',
        p_12_password: '',
        p_12_password_overwrite: '',
        gcm_api_key: '',
        appstore_id: '',
        bundle_id: null,
        orientation: null,
        status: null,
        engine: null,
        platforms: [],
        tournaments: [],
        brackets: [],
    },
    errorMessage: ''
};
// mutations
const mutations = {
    setGames(state, games) {
        state.games = games;
    },
    setCurrentGame(state, game) {
        state.currentGame = game;
    },
    addGame(state, game) {
        state.games.unshift(game);
        state.games = [game, ...state.games]
    },
    updateGame(state, game) {
        var ids = state.games.map( element => element._id)
        state.games[ids.indexOf(game._id)] = game
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

    async getGames({ commit }) {

        await games.retreiveAll()
        .then(res => {
            if (!res.data.success) {
                commit('setErrorMessage', res.data.error);
            } else {
                commit('setGames', res.data.data);
                commit('clearMessage');
            }
        })
        .catch((error) => {
            throw error
        })
    },

    async create({ commit }, data) {

        await games.create(data)
        .then(res => {
            if (!res.data.success) {
                commit('setErrorMessage', res.data.error);
            } else {
                commit('addGame', res.data.data);
                commit('clearMessage');
            }
        })
        .catch((error) => {
            throw error
        })
    },

    async update({ commit }, {id, data}) {
        
        await games.update(id, data)
        .then(res => {
            if (!res.data.success) {
                commit('setErrorMessage', res.data.error);
            } else {
                commit('updateGame', res.data.data);
                commit('clearMessage');
            }
        })
        .catch((error) => {
            throw error
        })
    },

    async retreive({commit}, id){
        await games.retreive(id)
        .then( res => {
            if(!res.data.success){
                commit('setErrorMessage', res.data.error);
            } else {
                commit('setCurrentGame', res.data.data);
                commit('clearMessage');
            }
        })
        .catch( error => {
            throw error
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
