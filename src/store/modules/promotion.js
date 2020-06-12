import promotion from '../../services/promotion';
const state = {
    promotions: [],
    currentPromotion: {
        promotion_name: '',
        game: '',
        channels: [],
        start_date: '',
        end_date: '',
    },
    errorMessage: ''
};
// mutations
const mutations = {
    setPromotions(state, promotions) {
        state.promotions = promotions;
    },
    setCurrentPromotion(state, promotion) {
        state.currentPromotion = promotion;
    },
    addPromotion(state, promotion) {
        state.promotions.unshift(promotion);
    },
    updatePromotion(state, promotion) {
        var ids = state.promotions.map( element => element._id)
        state.promotions[ids.indexOf(promotion._id)] = promotion
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

    async getPromotions({commit}) {

        await promotion.retreiveAll()
        .then(res => {
            if (!res.data.success) {
                commit('setErrorMessage', res.data.error);
            } else {
                commit('setPromotions', res.data.data);
                commit('clearMessage');
            }
        })
        .catch( error => {
            throw error
        })
    },

    async add({commit}, data){
        await promotion.add(data)
        .then( res => {
            if(!res.data.success){
                commit('setErrorMessage', res.data.error);
            } else {
                commit('addPromotion', res.data.data);
                commit('clearMessage');
            }
        })
        .catch( error => {
            throw error
        })
    },

    async update({commit}, {id, data}){
        await promotion.update(id, data)
        .then( res => {
            if(!res.data.success){
                commit('setErrorMessage', res.data.error);
            } else {
                commit('updatePromotion', res.data.data);
                commit('clearMessage');
            }
        })
        .catch( error => {
            throw error
        })
    },

    async retreive({commit}, id){
        await promotion.retreive(id)
        .then( res => {
            if(!res.data.success){
                commit('setErrorMessage', res.data.error);
            } else {
                commit('setCurrentPromotion', res.data.data);
                commit('clearMessage');
            }
        })
        .catch( error => {
            throw error
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
