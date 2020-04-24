<template>
	<vue-scroll class="confirm-email-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="confirm-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo_seemba_white.png" alt="logo"/>
				<h1>{{title}}</h1>
				<p>{{message}}</p>
				<div class="flex text-center center pt-30 pb-20">
                	<el-button class="dashboard-btn" @click="goToDashboard"><b>Go to dashboard</b></el-button>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import axios from'axios'
import { mapState } from 'vuex'
export default {
	name: 'email-confirmation',
	data() {
		return {
		}
	},
	methods: {
		goToDashboard(){
			this.$router.push('/')
		}
	},
    computed: {
        ...mapState({
            message: state => state.confirmEmailMsg,
            title: state => state.confirmEmailTitle,
        }),
    },
    async beforeCreate(){
        await axios.post(process.env.VUE_APP_API_PATH + `/editors/confirmation` ,{token: this.$route.query.token} ,{})
        .then((res) => {
            if(res.data.success){
                this.$store.commit('setConfirmEmailTitle', 'Email confirmed')
            } else {
                this.$store.commit('setConfirmEmailTitle', 'Sorry')
            }
            this.$store.commit('setConfirmEmailMsg', res.data.message)
        })
        .catch((error) => {
            console.log(error)
            this.$store.commit('setConfirmEmailMsg', error)
        });
    },
	mounted(){
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
		.el-button{
			margin: auto;
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

		.dashboard-btn {
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
