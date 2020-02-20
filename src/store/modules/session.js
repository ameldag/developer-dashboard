import session from '../../services/session';
let state = {
    token: null,
    user: {},
    errorMessage: ''
};
// mutations
const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    setUser(state, user) {
        state.user = user;
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

    token: state => {
        return state.token
    },
    me: state => {
        return state.user
    }

};
// actions
const actions = {
    async login(store, data) {
        await session.login(data).then(async res => {
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.message);
            }
            else {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("current_team", res.data.editor.teams[0]._id)
                await store.dispatch("team/setCurrentTeam", res.data.editor.teams[0], {root:true})
                store.commit('setToken', res.data.token);
                store.commit('setUser', res.data.editor);
                store.commit('clearMessage');
            }
            return res
        });
    },

    async signup(store, data) {
        await session.signup(data).then(async res => {
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.message);
            }
            else {
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("current_team", res.data.editor.teams[0]._id)
                await store.dispatch("team/setCurrentTeam", res.data.editor.teams[0], {root:true})
                store.commit('setToken', res.data.token);
                store.commit('setUser', res.data.editor);
                store.commit('clearMessage');
            }
        });
    },

    async getMe(store, data) {
        
        await session.getMe(data).then(async res => {
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.message);
            } else {
                store.commit('setUser', res.data.editor);
                await store.dispatch("team/setCurrentTeam", res.data.editor.teams[0], {root:true})
                store.commit('setToken', data);
                store.commit('clearMessage');
            }
        })
    },

    logout({ commit }) {
        commit("setLogoutPending")
        commit("logout")
        unsetToken()
        commit("unsetLogoutPending")
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
