<template>
	<vue-scroll class="confirm-email-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="confirm-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo_seemba_white.png" alt="logo"/>
				<h1>Confirm your Email</h1>
				<p>Your account has been successfully registred. To complete the process please check your email for a validation request.</p>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
export default {
	name: 'confirm-email',
	data() {
		return {
		}
	},
	methods: {
	},
	mounted(){
		localStorage.removeItem('token')
		localStorage.removeItem('current_team')
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.confirm-email-page {
	background: $background-color;
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}
	
	.confirm-box {
		width: 100%;
		max-width: 540px;
		padding: 10px;
		box-sizing: border-box;
		margin: 20px auto;
        h1,p{
            text-align: center;
        }
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
	.layout-container .container .view.confirm-email-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
