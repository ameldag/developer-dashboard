const state = {
    assets: null,
    errorMessage: ''
};
// mutations
const mutations = {
    setAssetes(state, assets) {
        state.assets = assets;
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

    assets: state => {
        return state.assets
    },

};
// actions
const actions = {

};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
