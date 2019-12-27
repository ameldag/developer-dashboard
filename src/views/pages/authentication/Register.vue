<template>
	<vue-scroll class="register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo_seemba_white.png" alt="logo"/>
				
				<float-label class="styled">
					<input type="text" placeholder="Firstname" v-model="data.first_name">
				</float-label>
				<float-label class="styled">
					<input type="text" placeholder="Lastname" v-model="data.last_name">
				</float-label>
				<float-label class="styled">
					<input type="email" placeholder="E-mail" v-model="data.email">
				</float-label>
				<float-label class="styled">
					<input type="text" placeholder="Team name" v-model="data.company_name">
				</float-label>
				<float-label class="styled">
					<input type="password" placeholder="Password" v-model="data.password">
				</float-label>
				<float-label class="styled">
					<input type="password" placeholder="Password (confirm)" v-model="data.pwConfirm">
				</float-label>
				
				<div class="flex">
					<div class="box grow"><el-checkbox>I read and accept terms</el-checkbox></div>
				</div>

				<div class="flex text-center center pt-30 pb-20">			
					<el-button plain size="small" @click="signup" class="signin-btn tada animated">
						SIGN IN
					</el-button>
				</div>

				<div class="text-center login-box pt-10">
					Already have an account? <a href="/login">Login</a>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
export default {
	name: 'Register',
	data() {
		return {
			data: {
				first_name:'',
				last_name:'',
				company_name:'',
				email: '',
				password: '',
				pwConfirm:''
			}
		}
	},
	methods: {
		async signup(e) {
			console.log(this.data)
			e.preventDefault();

			if (this.data.email && this.data.first_name && this.data.last_name && this.data.company_name && this.data.password) {
			await this.$store.dispatch("session/signup", this.data)
			.then((res) => {
				console.log({res});
				this.$router.push('/')
			})
			.catch(err => console.log({err}))
			} else { 
				console.log('====================================');
				console.log("no pwd no em;");
				console.log('====================================')
			}
		}
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.register-page {
	background: $background-color;
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;

		a {
			font-size: 14px;
			color: $text-color-accent;
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 270px;
			margin: 0px auto;
			margin-bottom: 50px;
			display: block;
		}

		.signin-btn {
			width: 160px;
		}

		.login-box {
			font-size: 14px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.register-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
