import session from '../../services/session';
const state = {
    token: null,
    user: null,
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
        await session.login(data).then(res => {
            console.log(res)
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.message);
            }
            else {
                localStorage.setItem("token", res.data.token)
                store.commit('setToken', res.data.token);
                store.commit('setUser', res.data.editor);
                store.commit('clearMessage');
            }
        });
    },

    async getMe(store, data) {
        console.log({data});
        
        await session.getMe(data).then(res => {
            console.log({res})
            if (res.data.success == false) {
                store.commit('setErrorMessage', res.data.message);
            } else {
                store.commit('setUser', res.data.editor);
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
