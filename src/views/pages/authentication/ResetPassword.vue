<template>
	<vue-scroll class="reset-password-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.png" alt="logo"/>
				
				<float-label class="styled">
					<input type="password" placeholder="New password" v-model="password">
				</float-label>

				<div class="flex text-center center pt-20 pb-10">			
					<el-button plain size="small" @click="resetPassword" class="send-btn pulse animated themed">
						UPDATE PASSWORD
					</el-button>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
const axios = require('axios');
export default {
	name: 'ResetPassword',
	data() {
		return {
			password: '',
		}
	},
	methods: {
		async resetPassword() {
			console.log(this.password)
			await axios.put(this.$APIPATH + `/editors/password/new` ,{token: this.$route.params.token, new: this.password} ,{ })
			.then((res) => {
				this.$router.replace('/login');
			})
			.catch((error) => {
				return error.response;
			});
		}
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.reset-password-page {
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

		.send-btn {
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
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.forgot-password-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
