<template>
	<vue-scroll class="register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo_seemba_white.png" alt="logo"/>
				<el-form :model="user" class="form-box" :rules="rules" ref="user" >
					<el-form-item class="styled" prop="first_name">
						<el-input type="text" placeholder="Firstname" v-model="user.first_name"></el-input>
					</el-form-item>
					<el-form-item class="styled" prop="last_name">
						<el-input type="text" placeholder="Lastname" v-model="user.last_name"></el-input>
					</el-form-item>
					<el-form-item class="styled" prop="email">
						<el-input type="email" placeholder="E-mail" v-model="user.email" :disabled="emailDisabled"></el-input>
					</el-form-item>
					<el-form-item class="styled" v-if="!this.$route.query.code" prop="company_name">
						<el-input type="text" placeholder="Team name" v-model="user.company_name"></el-input>
					</el-form-item>
					<el-form-item class="styled" prop="password">
						<el-input type="password" placeholder="Password" v-model="user.password"></el-input>
					</el-form-item>
					<el-form-item class="styled" prop="pwConfirm">
						<el-input type="password" placeholder="Password (confirm)" v-model="user.pwConfirm"></el-input>
					</el-form-item>
					
					<el-form-item class="styled" prop="checked">
						<el-checkbox v-model="user.checked">I read and accept terms</el-checkbox>
					</el-form-item>

					<p class="text-center" style="color: red;">{{ error }}</p>

					<div class="flex text-center center pt-30 pb-20">
						<el-button type="primary signin-btn tada animated" @click="signup('user')">SIGN UP</el-button>
					</div>

					<div class="text-center login-box pt-10">
						Already have an account? <a href="/login">Login</a>
					</div>
				</el-form>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
export default {
	name: 'Register',
	data() {
		return {
			error : '',
			user: {
				first_name:'',
				last_name:'',
				company_name:'',
				email: this.$route.query.email != null ? this.$route.query.email : '',
				password: '',
				pwConfirm:'',
				checked: false,
			},
			emailDisabled: this.$route.query.email != null ? true : false,
			rules: {
				first_name: [
					{ required: true, message: 'enter your firstname', trigger: 'change' }
				],
				last_name: [
					{ required: true, message: 'enter your lastname', trigger: 'change' }
				],
				company_name: [
					{ required: true, message: 'enter your company name', trigger: 'change' }
				],
				email: [
				{ type: "email", required: true, message: 'Please enter a valid email', trigger: 'change' }
				],
				password: [
					{ required: true, message: 'Please enter your password', trigger: 'change' }
				],
				pwConfirm: [
					{ required: true, message: 'Please confirm your password', trigger: 'change' },
					{validator: (rule, value, callback, source, options) => {
						if(value !== this.user.password){
							callback(new Error('password should match'))
						} else {
							callback();
						}
					}, trigger: 'change'}
				],
				checked: [
					{validator: (rule, value, callback, source, options) => {
						if(!value ){
							callback(new Error('check this box to continue'))
						} else {
							callback();
						}
					}, trigger: 'change'}
				],
			}
		}
	},
	methods: {
		signup(user) {
			this.$refs[user].validate(async (valid) => {
				if (valid) {
					this.$store.commit('setSplashScreen', true)
					await this.$store.dispatch("session/signup", this.user)
					.then((res) => {
						this.$router.push('/')
						this.$store.commit('setSplashScreen', false)
					})
					.catch(err => {
						this. error = this.$store.state.session.errorMessage
						this.$store.commit('setSplashScreen', false)
						})
				} else {
					return false;
				}
			});
		}
	},
	mounted(){
		this.$store.commit('setSplashScreen', false)
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
		padding: 10px;
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
			display: block;
		}

		.signin-btn {
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

@media (max-width: 768px) {
	.layout-container .container .view.register-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
