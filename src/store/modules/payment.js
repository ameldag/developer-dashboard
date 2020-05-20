
const state = {
    account: null,
    countries_codes: [],
    countries: [],
    currencies: [],
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

};
// actions
const actions = {

};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
