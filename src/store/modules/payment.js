import paymentService from '../../services/payment'
const state = {
    account: null,
    countries_codes: [],
    countries: [],
    currencies: [],
    continents: [],
    errorMessage: '',
};
// mutations
const mutations = {
    setAccount(state, account) {
        state.account = account;
    },
    setCountriesCodes(state, countries_codes) {
        state.countries_codes = countries_codes;
    },
    setCountries(state, countries) {
        state.countries = countries;
    },
    setCurrencies(state, currencies) {
        state.currencies = currencies;
    },
    setContinents(state, continents) {
        state.continents = continents;
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
    countries_codes: state => {
        return state.countries_codes
    },
    countries: state => {
        return state.countries
    },
    currencies: state => {
        return state.currencies
    },
    continents: state => {
        return state.continents
    },

};
// actions
const actions = {
    async retreiveAccount({ commit }, id){
        await paymentService.retreiveAccount(id)
        .then((res) => {
            if(res.data.success){
                commit('setAccount', res.data.data)
                commit('clearMessage')
            } else {
                commit('setErrorMessage', res.data.message)
            }
        })
        .catch((error) => {
            commit('setErrorMessage', error.response)    
        })
    },
    
    async getCountriesSpecs({ commit }){
        await paymentService.countriesSpecs()
        .then((res) => {
            if(res.data.success){
                commit('setCountriesCodes', res.data.countries_codes)
                commit('setCountries', res.data.countries)
                commit('setCurrencies', res.data.currencies)
                commit('setContinents', res.data.continents)
                commit('clearMessage')
            } else {
                commit('setErrorMessage', res.data.message)
            }
        })
        .catch((error) => {
            commit('setErrorMessage', error.response)    
        })
    },
    
    async createConnectAccount({ commit, dispatch }, body){
        await paymentService.createAccount(body)
        .then(async (res) => {
            if(res.data.success){
                await dispatch('session/setUser', res.data.editor)
                commit('setAccount', res.data.account)
                commit('clearMessage')
            } else {
                commit('setErrorMessage', res.data.message)
            }
        })
        .catch((error) => {
            commit('setErrorMessage', error.response)    
        })
    },
    
    async withdraw({ commit, dispatch }, body){
        await paymentService.widhdraw(body)
        .then(async (res) => {
            if(res.data.success){
                await dispatch('team/setCurrentTeam', res.data.team)
                commit('clearMessage')
            } else {
                commit('setErrorMessage', res.data.message)
                throw res
            }
        })
        .catch((error) => {
            commit('setErrorMessage', error.response)    
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
