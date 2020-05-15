
const state = {
    account: null,
    errorMessage: '',
};
// mutations
const mutations = {
    setAccount(state, account) {
        state.account = account;
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

    account: state => {
        return state.account
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
