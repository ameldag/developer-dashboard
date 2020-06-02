import Vue from 'vue'
import Router from 'vue-router'
import { mapState } from 'vuex'

//apps
import Dashboard from '../views/apps/Dashboard.vue'

//pages
import Login from '../views/pages/authentication/Login.vue'
import Login2 from '../views/pages/authentication/Login2.vue'
import Register from '../views/pages/authentication/Register.vue'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import ResetPassword from '../views/pages/authentication/ResetPassword'
import Confirm from '../views/pages/authentication/Confirm'
import EmailConfirmation from '../views/pages/authentication/EmailConfirmation'
import Approval from '../views/pages/authentication/Approval'
import Profile from '../views/pages/Profile.vue'
import NotFound from '../views/pages/NotFound.vue'

import Games from '../views/pages/management/Games.vue'
import Teams from '../views/pages/management/Teams.vue'
import Promotions from '../views/pages/management/Promotions.vue'
import Promotion from '../views/pages/management/Promotion.vue'
import Game from '../views/pages/management/Game.vue'
import Statement from '../views/pages/Statements.vue'
import Resources from '../views/pages/Resources.vue'

import layouts from '../layout'
import store from '../store/index.js'

Vue.use(Router)


const router = new Router({
	mode: 'history',
	//base: '/sub-path/',
	routes: [
		{
			path: '/',
			alias: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/management/games',
			name: 'games_management',
			component: Games,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/management/teams',
			name: 'teams_management',
			component: Teams,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/management/promotions',
			name: 'promotions_management',
			component: Promotions,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/promotions/:id',
			name: 'promotion',
			component: Promotion,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/games/:id',
			name: 'game',
			component: Game,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/statements',
			name: 'statement',
			component: Statement,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/resources',
			name: 'resources',
			component: Resources,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login2,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/password/new/:token',
			name: 'reset-password',
			component: ResetPassword,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/confirm',
			name: 'confirm-email',
			component: Confirm,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/confirmation',
			name: 'email-confirmation',
			component: EmailConfirmation,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/approval',
			name: 'account-approval',
			component: Approval,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{ 
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/login'})
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		}
	]
})


const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		console.log({store})
		store.commit('setLayout', layout)
	}
}

//insert here login logic
let auth = {
	loggedIn() {
		if (localStorage.getItem("token")) {
			return true
		} else {
			return false
		}
		//return store.getters.isLogged
	},
	logout() {
		localStorage.removeItem('token')
		localStorage.removeItem('current_team')
	}
}

router.beforeEach((to, from, next) => {
		// console.log('loggedin',auth.loggedIn());


			var hasPermission = localStorage.getItem("token");
			console.log('store.state.session.user.validated',store.state.session.user.validated)
			console.log('store.state.session.user.approved',store.state.session.user.approved)
			if(hasPermission != null ){
				if(store.state.session.user.validated){
					if(store.state.session.user.approved){
						if(to.name === 'login' || to.name === 'register'){
							window.location.href = '/'
							return false
						} else {
							next()
						}
					} else {
						window.location.href = '/approval'
					}
				} else {
					if(to.name !== 'login' && to.name !== 'register'){
						window.location.href = '/confirm'
						return false
					} else {
						next()
					}
				}
			} else {
				if(to.name === 'login' || to.name === 'register' || to.name === 'forgot-password' || to.name === 'reset-password' || to.name === 'confirm-email' || to.name === 'email-confirmation' || to.name === 'account-approval'){
					next()
				} else {
					window.location.href = '/login'
					return false
				}
			}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
})

router.afterEach((to, from) => {
	/* setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500) */
})

export default router