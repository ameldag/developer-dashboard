import team from '../../services/team';
const state = {
    members: null,
    currentTeam: null,
    errorMessage: ''
};
// mutations
const mutations = {
    setMembers(state, members) {
        state.members = members;
    },
    setCurrentTeam(state, team) {
        state.currentTeam = team;
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
    currentTeam: state => {
        return state.currentTeam
    },

};
// actions
const actions = {

    async retreiveMembers(store) {

        await team.team_members().then(res => {
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setMembers', res.data.data);
                store.commit('clearMessage');
            }
        })
    },
    setCurrentTeam(store, team) {
        store.commit('setCurrentTeam', team)
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
