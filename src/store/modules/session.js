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
    login(store, data) {
        session.login(data).then(res => {
            console.log({ res });
            console.log("************************************");
            console.log(res.data);
            if (res.data.error) {
                store.commit('setErrorMessage', res.data.error);
            }
            else {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.editor))
                localStorage.setItem("team", JSON.stringify(res.data.editor.teams[0]))
                store.commit('setToken', res.data.token);
                store.commit('setUser', res.data.editor);
                store.commit('clearMessage');
                // this.$router.push('/')
            }
        });
    },

    getMe(store, data) {
        // const { commit, dispatch } = store
        console.log("checking the data " + data);

        session.getMe(data).then(res => {
            if (res.data.error) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                localStorage.setItem("token", res.data.token)
                store.commit('setToken', res.data.token);
                store.commit('setUser', res.data.editor);
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
