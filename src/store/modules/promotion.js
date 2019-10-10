import promotion from '../../services/promotion';
const state = {
    promotions: [],
    errorMessage: ''
};
// mutations
const mutations = {
    setPromotions(state, promotions) {
        state.promotions = promotions;
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

    promotions: state => {
        return state.promotions
    },

};
// actions
const actions = {

    async getPromotions(store, data) {

        await promotion.promotions(data).then(res => {
            console.log({res})
            if (res.success == false) {
                store.commit('setErrorMessage', res.data.error);
            } else {
                store.commit('setPromotions', res.data.data);
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
