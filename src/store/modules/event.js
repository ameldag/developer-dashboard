import events from '../../services/event';
const state = {
    events: [],
    currentEvent: {
        name: '',
        description: '',
        game: '',
        icon: '',
        background_image: '',
        start_date: '',
        end_date: '',
        status: null,
    },
    errorMessage: ''
};
// mutations
const mutations = {
    setEvents(state, events) {
        state.events = events;
    },
    setCurrentEvent(state, event) {
        state.currentEvent = event;
    },
    addEvent(state, event) {
        state.events.unshift(event);
    },
    updateEvent(state, event) {
        var ids = state.events.map(element => element._id)
        state.events[ids.indexOf(event._id)] = event
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

    events: state => {
        return state.events
    },

};
// actions
const actions = {

    async getEvents({ commit }, data) {

        await events.retreiveAll(data)
            .then(res => {
                if (!res.data.success) {
                    commit('setErrorMessage', res.data.error);
                } else {
                    commit('setEvents', res.data.data);
                    commit('clearMessage');
                }
            })
            .catch(error => {
                throw error
            })
    },

    async add({ commit }, data) {
        await events.add(data)
            .then(res => {
                if (!res.data.success) {
                    commit('setErrorMessage', res.data.error);
                } else {
                    commit('addEvent', res.data.data);
                    commit('clearMessage');
                }
            })
            .catch(error => {
                throw error
            })
    },

    async update({ commit }, { id, data }) {
        await events.update(id, data)
            .then(res => {
                if (!res.data.success) {
                    commit('setErrorMessage', res.data.error);
                } else {
                    commit('updateEvent', res.data.data);
                    commit('clearMessage');
                }
            })
            .catch(error => {
                throw error
            })
    },

    async retreive({ commit }, id) {
        await events.retreive(id)
            .then(res => {
                if (!res.data.success) {
                    commit('setErrorMessage', res.data.error);
                } else {
                    commit('setCurrentEvent', res.data.data);
                    commit('clearMessage');
                }
            })
            .catch(error => {
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