import resourcesService from '../../services/resources'
const state = {
    assets: [],
    errorMessage: ''
};
// mutations
const mutations = {
    setAssets(state, assets) {
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
    async retreiveAssets({ commit }){
        await resourcesService.retreiveAssets()
        .then((res) => {
            if(res.data.success){
                commit('setAssets', res.data.data)
            } else {
                commit('setErrorMessage', res.data.error);
            }
        })
        .catch((error) => {
            throw error
        })
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
