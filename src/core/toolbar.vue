<template>
	<div class="toolbar flex align-center justify-space-between">
		<div class="box-left box grow flex">
			<button class="collapse-nav" @click="toggleSidebar"><i class="mdi mdi-menu"></i></button>

			<img class="logo-mini" src="@/assets/images/logo_seemba_white.png" alt="logo"/>

			<search class="hidden-xs-only"></search>
		</div>
		<div class="box-right flex align-center pl-10">
			<!--<el-dropdown trigger="click" @command="onCommandLang">
				<span class="el-dropdown-link">
					<i class="flag-icon" :class="{['flag-icon-'+lang]:true}"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="us"><i class="flag-icon flag-icon-us mr-15"></i>English</el-dropdown-item>
					<el-dropdown-item command="it"><i class="flag-icon flag-icon-it mr-15"></i>Italian</el-dropdown-item>
					<el-dropdown-item command="fr"><i class="flag-icon flag-icon-fr mr-15"></i>French</el-dropdown-item>
					<el-dropdown-item command="de"><i class="flag-icon flag-icon-de mr-15"></i>German</el-dropdown-item>
					<el-dropdown-item command="es"><i class="flag-icon flag-icon-es mr-15"></i>Spanish</el-dropdown-item>
					<el-dropdown-item command="cn"><i class="flag-icon flag-icon-cn mr-15"></i>Chinese</el-dropdown-item>
					<el-dropdown-item command="jp"><i class="flag-icon flag-icon-jp mr-15"></i>Japanese</el-dropdown-item>
					<el-dropdown-item command="/multi-language"><i class="mdi mdi-translate mr-15"></i>Read the docs</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>-->
			<button class="fullscreen-button" @click="toggleFullscreen">
				<i class="mdi mdi-fullscreen" v-if="!fullscreen"></i>
				<i class="mdi mdi-fullscreen-exit" v-if="fullscreen"></i>
			</button>
			<!--<el-popover ref="popover" placement="bottom" :width="popoverWidth" trigger="click">
				<notification-box></notification-box>
			</el-popover>
			<el-badge :is-dot="true" class="notification-icon-badge">
				<el-button v-popover:popover icon="mdi mdi-bell" class="notification-icon"></el-button>
			</el-badge>-->
			<span class="username"><router-link to="/profile">{{ this.$store.state.session.user.first_name }} {{ this.$store.state.session.user.last_name }}</router-link></span>
			<el-dropdown trigger="click" @command="onCommand">
				<span class="el-dropdown-link">
					<img v-bind:src="this.$store.state.session.user.avatar" class="avatar" alt="avatar">
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="/profile"><i class="mdi mdi-account mr-10"></i> Profile</el-dropdown-item>
					<span v-for="team in this.$store.state.session.user.teams" :key="team._id">
						<el-dropdown-item @click.native="changeTeam(team._id)" divided><i class="mdi mdi-account mr-10"></i> {{ team.company_name }}</el-dropdown-item>
					</span>
					<el-dropdown-item command="/logout" divided><i class="mdi mdi-logout mr-10"></i> Logout</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>

			<button @click="toggleSidebar" v-if="menuBurger === 'right'" class="toggle-sidebar toggle-sidebar__right card-base card-shadow--small">
				<i class="mdi mdi-menu"></i>
			</button>
		</div>
	</div>
</template>

<script>
import NotificationBox from '@/components/NotificationBox'
import Search from '@/components/Search'
import {mapState}from 'vuex'
export default {
	name: 'Toolbar',
	props: ['menuBurger'],
	data() {
		return {
			popoverWidth: 300,
			fullscreen: false,
			lang: 'us',
		}
	},
	methods: {
		onCommandLang(lang) {
			if(lang.charAt(0) === '/')
				this.onCommand(lang)
			else
				this.lang = lang
		},
		onCommand(path) {
			this.$router.push(path)
		},
		toggleSidebar() {
			this.$emit('toggle-sidebar')
		},
		resizePopoverWidth() {
			if(window.innerWidth <= 768) {
				this.popoverWidth = 250	
			} else {
				this.popoverWidth = 300	
			}
		},
		toggleFullscreen() {
			this.$fullscreen.toggle(document.querySelector('body'), {
				wrap: false,
				callback: () => {this.fullscreen = this.$fullscreen.getState()}
			})
		},
		async changeTeam(team) {
			localStorage.setItem("current_team", team)
			await this.$store.dispatch("team/setCurrentTeam", team, {root:true})
			window.location.href = '/dashboard'
		}
	},
	computed: {
		...mapState({
			user: state => this.$store.state.session.user
		}),
	},
	components: {
		NotificationBox,
		Search
	},
	async mounted() {
		this.fullscreen = this.$fullscreen.getState()
		this.resizePopoverWidth();
		window.addEventListener('screenSize', () => {
			console.log(window.innerWidth)
		});
	},
	updated() {
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizePopoverWidth);
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';

.toolbar {
	width: 100%;
	height: 100%;
	padding: 0 20px;
	box-sizing: border-box;

	.username {
		margin-left: 20px;
		font-weight: bold;
		@include text-bordered-shadow();
		
		a {
			color: $text-color;
			text-decoration: none;

			&:hover {
				color: $text-color-accent;
			}
		}
	}

	.avatar {
		border-radius: 50%;
		width: 35px;
		height: 35px;
		border: 1px solid #FFF;
		margin-left: 20px;
		box-sizing: border-box;
		display: block;
		cursor: pointer;
		box-shadow: 0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08);
		transition: box-shadow .5s;

		&:hover {
			box-shadow: 0px 3px 10px 0 rgba(49, 49, 93, 0.08), 0px 2px 7px 0 rgba(0, 0, 0, 0.08);
		}
	}

	.notification-icon {
		font-size: 20px;
		outline: none;
		padding: 0;
		background: transparent;
		border: none;
		margin-left: 20px;
		//color: #aab7c5;
		color: transparentize($text-color, 0.7);
		@include text-bordered-shadow();

		&:hover {
			color: $text-color-accent;
		}
	}

	.toggle-sidebar {
		border: 1px solid transparent;
		height: 32px;
		min-height: 32px;
		line-height: 32px;
		width: 32px;
		min-width: 32px;
		max-width: 32px;
		box-sizing: border-box;
		text-align: center;
		margin: 0;
		outline: none;
		margin-right: 5px;
		font-size: 24px;
		padding: 0;
		cursor: pointer;
		display: inline-block;
		color: $text-color;
		background: white;
		display: none;
		opacity: 0;
		transition: all .5s;

		&__right {
			margin-right: 0px;
			margin-left: 5px;
		}

		&:hover, &:focus, &:active {
			color: $text-color-accent;
			border-color: $text-color-accent;
		}
	}

	.fullscreen-button {
		font-size: 24px;
		cursor: pointer;
		outline: none;
		padding: 0;
		background: transparent;
		border: none;
		margin-left: 20px;
		//color: #aab7c5;
		color: transparentize($text-color, 0.7);
		@include text-bordered-shadow();

		&:hover {
			color: $text-color-accent;
		}
	}

	.logo-mini {
		width: 32px;
		height: 32px;
		display: none;
	}

	.el-dropdown {
		.flag-icon {
			box-shadow: 0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08);
			cursor: pointer;
			border: 1px solid lighten($background-color, 20%);
			background-color: lighten($background-color, 20%);
		}
	}

	.collapse-nav {
		position: absolute;
		top: 50%;
		left: 10px;
		height: 30px;
		width: 30px;
		margin-top: -15px;
		opacity: 0;
		box-shadow: 0px 0px 20px 10px $background-color;
		cursor: pointer;
		border: 1px solid $text-color-accent;
		border-radius: 50%;
		color: $text-color-accent;
		outline: none;
		background: $background-color;
		transition: all .5s;
	}

	&.horizontal {
		height: 100%;

		.collapse-nav {
			display: none;
		}
	}
}

@media (max-width: 650px) {
	.toolbar {
		.username {
			display: none;
		}
	}
}

@media (max-width: 768px) {
	.toolbar {
		padding: 0 10px;

		.collapse-nav {
			position: unset;
			opacity: 1;
			left: 20px;
			margin-top: 2px;
		}
		.toggle-sidebar {
			display: block;
			opacity: 1;
		}

		.fullscreen-button {
			display: none;
		}

		.logo-mini {
			display: none;
		}
	}
}
</style>
