<template>
	<div class="login-page flex">
		<div class="box grow scrollable align-vertical side-box box-left">
			<div class="align-vertical-middle wrapper text-center">
				<img class="image-logo" src="@/assets/images/logo.png" alt="logo-left"/>
				<h1 class="h-big"></h1>
				<p class="p-50"></p>
			</div>
		</div>
		<div class="box grow scrollable align-vertical side-box box-right">
			<div class="align-vertical-middle wrapper">
				
				<form class="form-box" @submit.prevent="login">
					<h2>Log in to your account</h2>
					<p class="mb-40">Go to the dashboard</p>
					
					<float-label class="styled">
						<input type="email" name="email" placeholder="Email" v-model="email">
					</float-label>
					<float-label class="styled">
						<input type="password" name="password" placeholder="Password" v-model="password">
					</float-label>

					<div class="flex">
						<div class="box grow text-left"><router-link to="/forgot-password">Forgot password?</router-link></div>
					</div>

					<div class="flex text-center center pt-30 pb-10">			
						<el-button plain size="small" native-type="submit" class="login-btn pulse animated themed">
							Login
						</el-button>
					</div>

					<div class="text-center login-box pt-10">
						Already have an account? <a href="/register">Signup</a>
					</div>

				</form>
			</div>
			
		</div>

	</div>
</template>

<script>
export default {
	name: 'Login2',
	data() {
		return {
			email: '',
			password: ''
		}
	},
  methods: {
    async login(e) {
		e.preventDefault();

		if (this.email && this.password) {
		const user = {
			email: this.email,
			password: this.password
		};
		await this.$store.dispatch("session/login", user)
		.then((res) => {
			console.log({res});
			this.$router.push('/')
		})
		.catch(err => console.log({err}))
		} else { 
			console.log('====================================');
			console.log("no pwd no em;");
			console.log('====================================')}
    	}
  	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.login-page {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0 !important;

	.side-box {
		.wrapper {
			width: 100%;
			box-sizing: border-box;
			padding: 20px;
		}
	}

	.box-left {
		background-image: url('https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500');
		background-size: cover;
		background-position: 50% 50%;

		.wrapper {
			.image-logo {
				width: 90%;
				max-width: 300px;
				margin-top: 25%;
			}

		}
	}
	.box-right {
		background: $background-color;
		color: var(--background-color);
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;
		//background: transparent;

		a {
			font-size: 14px;
			color: $text-color-accent;
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 80px;
			margin: 0px auto;
			margin-bottom: 70px;
			display: block;
		}

		.login-btn {
			background: rgba(var(--color-accent-rgb), .2);
			color: var( --text-color);
			border-color: var(--text-color);
			border-width: 2px;
			font-weight: bold;
			border-radius: 0;

			&:hover {
				background: rgba(var(--color-accent-rgb), 1);
				border-color: var(--text-color);
				color: var( --text-color);
			}
		}

		.login-box {
			font-size: 14px;
		}
	}
}

@media (max-width: 1200px) {
.login-page {
	.box-left {
		.wrapper {
			.h-big {
				font-size: 50px;
			}
		}
	}
}
}
@media (max-width: 900px) {
.login-page {
	.box-left {
		.wrapper {
			.h-big {
				font-size: 30px;
			}
		}
	}
}
}
@media (max-width: 768px) {
.login-page {
	display: block;
	overflow: auto;
	
	.side-box {
		display: block;
	}
}
}
</style>
