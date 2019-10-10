import team from '../../services/team';
const state = {
    members: null,
    errorMessage: ''
};
// mutations
const mutations = {
    setMembers(state, members) {
        state.members = members;
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

    members: state => {
        return state.members
    },

};
// actions
const actions = {

    async getMembers(store, data) {

        await team.team_members(data).then(res => {
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setMembers', res.data.data);
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
