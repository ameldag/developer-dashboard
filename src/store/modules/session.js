import session from '../../services/session';
import router from '../../router';
let state = {
    token: null,
    user: {
        validated: true,
        approved: true,
    },
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
    async login({ commit, dispatch }, data) {
        await session.login(data)
        .then(async res => {
            if (res.data.success) {
                
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("current_team", res.data.editor.teams[0]._id)
                await dispatch("team/setCurrentTeam", res.data.editor.teams[0], {root:true})
                commit('setToken', res.data.token);
                commit('setUser', res.data.editor);
                commit('clearMessage');
            } else {
                commit('setErrorMessage', res.data.message);
            }
        })
        .catch( err => {
            console.log({err});
            
        })
    },

    async signup({ commit, dispatch }, data) {
        await session.signup(data)
        .then(async res => {
            if (!res.data.success) {
                commit('setErrorMessage', res.data.message);
            }
            else {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("current_team", res.data.editor.teams[0]._id)
                await dispatch("team/setCurrentTeam", res.data.editor.teams[0], {root:true})
                commit('setToken', res.data.token);
                commit('setUser', res.data.editor);
                commit('clearMessage');
            }
        });
    },

    async getMe({ commit, dispatch }) {
        
        await session.getMe()
        .then(async res => {
            if (!res.data.success) {
                commit('setErrorMessage', res.data.message);
            } else {
                commit('setUser', res.data.editor);
                await dispatch("team/setCurrentTeam", res.data.editor.teams[0], {root:true})
                console.log('token',res.data.token);
                commit('setToken', res.data.token);
                commit('clearMessage');
                if(!state.user.validated){
                    router.push('/confirm')
                } else {
                    if(!state.user.approved){
                        router.push('/approval')
                    }
                }
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
