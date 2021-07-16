import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


import session from './modules/session'
import games from './modules/games'
import team from './modules/team'
import analytics from './modules/analytics'
import promotion from './modules/promotion'
import payment from './modules/payment'
import resources from './modules/resources'
import userService from '../services/user'
import event from './modules/event'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        session,
        games,
        team,
        analytics,
        promotion,
        event,
        payment,
        resources,
    },
    state: {
        layout: {
            navPos: 'left', //top, bottom, left, right, false
            toolbar: 'top', //top, bottom, false
            footer: true, //above, below, false
            boxed: false, //true, false
            roundedCorners: false, //true, false
            viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
        },
        confirmEmailTitle: '',
        confirmEmailMsg: '',
        splashScreen: true,
        logged: true
    },
    mutations: {
        setLayout(state, payload) {
            if (payload && payload.navPos !== undefined)
                state.layout.navPos = payload.navPos

            if (payload && payload.toolbar !== undefined)
                state.layout.toolbar = payload.toolbar

            if (payload && payload.footer !== undefined)
                state.layout.footer = payload.footer

            if (payload && payload.boxed !== undefined)
                state.layout.boxed = payload.boxed

            if (payload && payload.roundedCorners !== undefined)
                state.layout.roundedCorners = payload.roundedCorners

            if (payload && payload.viewAnimation !== undefined)
                state.layout.viewAnimation = payload.viewAnimation
        },
        setLogin(state, payload) {
            state.logged = true
        },
        setLogout(state, payload) {
            state.layout.navPos = null
            state.layout.toolbar = null
            state.logged = false
        },
        setSplashScreen(state, payload) {
            state.splashScreen = payload
        },
        setConfirmEmailMsg(state, payload) {
            state.confirmEmailMsg = payload
        },
        setConfirmEmailTitle(state, payload) {
            state.confirmEmailTitle = payload
        }
    },
    actions: {
        async confirmEmail({ commit }, token) {
            await userService.confirmEmail(token)
                .then((res) => {
                    if (res.data.success) {
                        commit('setConfirmEmailTitle', 'Email confirmed')
                    } else {
                        commit('setConfirmEmailTitle', 'Sorry')
                    }
                    commit('setConfirmEmailMsg', res.data.message)
                })
                .catch((error) => {
                    commit('setConfirmEmailMsg', error)
                });
        }
    },
    getters: {
        layout(state, getters) {
            return state.layout
        },
        navPos(state, getters) {
            return state.layout.navPos
        },
        toolbar(state, getters) {
            return state.layout.toolbar
        },
        footer(state, getters) {
            return state.layout.footer
        },
        boxed(state, getters) {
            return state.layout.boxed
        },
        roundedCorners(state, getters) {
            return state.layout.roundedCorners
        },
        viewAnimation(state, getters) {
            return state.layout.viewAnimation
        },
        isLogged(state, getters) {
            return state.logged
        },
        splashScreen(state, getters) {
            return state.splashScreen
        }
    },
    plugins: [createPersistedState({ paths: ['layout'] })],
    strict: debug
})