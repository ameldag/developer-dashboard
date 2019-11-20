<template>
	<vue-scroll class="page-profile" id="affix-container">
		<div class="card-base card-shadow--medium identity" id="boundary">
			<div class="cover"></div>
			<!--<div class="username" v-affix="{parentid: 'affix-container', boundaryid: '', delay:600, offset:0, enable:() => affixEnabled}">-->
			<div class="username">
				<div class="cover-small"></div>
				<div class="avatar-small"><img src="@/assets/images/avatar.jpg" alt="avatar"></div>
				<span>{{me.first_name}} {{me.last_name}}</span>
				<div class="colors-box">
					<div v-for="i in 5" :key="i" :class="{'color':true, 'active':colorActive}" :style="{'background':color}"></div>
				</div>
			</div>
			<div class="avatar"><img :src="me.avatar" alt="avatar"></div>
		</div>
		<div class="page-profile" id="boundary">
			<el-form ref="form" label-width="120px">
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="First Name">
					<el-input type="text" v-model="me.first_name"/>
				</el-form-item>
			</el-col>
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Last Name">
					<el-input type="text" v-model="me.last_name"/>
				</el-form-item>
			</el-col>
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Adress">
					<el-input type="text" v-model="me.address"/>
				</el-form-item>
			</el-col>
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Country">
					<el-input type="text" v-model="me.country"/>
				</el-form-item>
			</el-col>
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="City">
					<el-input type="text" v-model="me.city"/>
				</el-form-item>
			</el-col>
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Zip Code">
					<el-input type="text" v-model="me.zipcode"/>
				</el-form-item>
			</el-col>
			
			<el-col class="col-p">
				<el-form-item>
					<el-button type="primary" @click="onSubmit">Save</el-button>
					<el-button>Cancel</el-button>
				</el-form-item>
			</el-col>
		</el-form>
		</div>
	</vue-scroll>
</template>

<script>
import ColorThief from 'color-thief-browser'
import Affix from '@/components/Affix'
const axios = require('axios');

export default {
	name: 'Profile',
	data() {
		return {
			me : {
				first_name: this.$store.getters['session/me'].first_name,
				last_name: this.$store.getters['session/me'].last_name,
				address: this.$store.getters['session/me'].address,
				country: this.$store.getters['session/me'].country,
				city: this.$store.getters['session/me'].city,
				zipcode: this.$store.getters['session/me'].zipcode,
				avatar: this.$store.getters['session/me'].avatar,
			},
			colorActive: false,
			color: 'white',
			affixEnabled: true
		}
	},
	methods: {
		resizeAffixEnabled() {
			if(window.innerWidth <= 768) {
				this.affixEnabled = false	
			} else {
				this.affixEnabled = true	
			}
		},

		async onSubmit(){
			let data = {
				token : localStorage.getItem("token"),
				id : this.$store.getters['session/me']._id
			}
			console.log(this.me)
			await axios.put(`http://localhost:8000/api/dashboard/v1/editors/` + data.id + '/personal' ,this.me ,{ headers: { "x-access-token": localStorage.getItem('token') } })
			.then((res) => {
				console.log({res})
				this.$router.replace('/dashboard');
			})
			.catch((error) => {
				return error.response;
			});
		}
	},
	mounted() {
		var colorThief = new ColorThief();
		setTimeout(()=>{
			let rgb = colorThief.getColor(document.getElementById('color-thief'))
			//console.log('Profile mounted', rgb)
			this.colorActive = true
			this.color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
		}, 1000)

		this.resizeAffixEnabled();
		window.addEventListener('resize', this.resizeAffixEnabled);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeAffixEnabled);
	},
	components: {
		Affix,
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-profile {
	overflow: auto;

	.identity {
		margin-bottom: 20px;
		position: relative;
		width: 100%;
		height: 370px;

		.cover {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-image: url('../../assets/images/cover-2.jpg');
			background-position: 50%;
			background-size: cover;
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;
		}
		.username {
			color: #32325d;
			position: absolute;
			width: 100%;
			height: 50px;
			bottom: 75px;
			left: 0;
			right: 0;
			background: #fff;
			line-height: 50px;
			box-sizing: border-box;
			padding-left: 250px;
			font-size: 25px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);

			.cover-small {
				width: 220px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -220px;
				position: relative;
				left: -250px;
				border-radius: 9px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				background-image: url('../../assets/images/cover-2.jpg');
				background-position: 50%;
				background-size: cover;
				background-repeat: no-repeat;
				-webkit-transition: all .5s;
				transition: all .5s;
			}
			.avatar-small {
				width: 50px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -50px;
				position: relative;
				left: -100px;
				border-radius: 50%;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				transform: rotate(-50deg);
				transition: all .5s;
			}
			.avatar-small img {
				width: 100%;
			}

			&.affix {
				z-index: 99;
				border-radius: 5px;

				.cover-small {
					opacity: 1;
				}

				.avatar-small {
					opacity: 1;
					left: -60px;
					transform: rotate(0deg);
				}
			}

			.colors-box {
				height: 50px;
				background: white; //091c2d
				float: right;

				.color {
					width: 50px;
					height: 50px;
					background: white; //091c2d
					float: right;
					transform: skew(-45deg);
					box-shadow: 1px 0px 1px 0px transparent;
					position: relative;
					right: -25px;
					margin-right: -50px;
					transition: margin-right .75s;

					&.active {
						margin-right: 0;
					}

					&:nth-child(2) { opacity: .8; }
					&:nth-child(3) { opacity: .6; }
					&:nth-child(4) { opacity: .4; }
					&:nth-child(5) { opacity: .2; }
				}
			}
		}
		.avatar {
			border: 6px solid #fff;
			position: absolute;
			bottom: 10px;
			left: 50px;
			width: 180px;
			height: 180px;
			overflow: hidden;
			border-radius: 50%;
			box-sizing: border-box;
			box-shadow: 0px 20px 15px -15px rgba(0, 0, 0, 0.15);

			img {
				width: 100%;
			}
		}

		.color-thief {
			display: block;
			width: 100px;
			visibility: hidden;
			z-index: -999999;
			position: absolute;
		}
	}

	.info {
		padding: 24px 32px;
	}
}

@media (max-width: 768px) {
	.page-profile {
		.identity {
			height: auto;

			.avatar {
				bottom: inherit;
				top: 10px;
				left: 50%;
				width: 100px;
				margin-left: -50px;
				height: 100px;
				border-width: 3px;
			}

			.username {
				position: inherit;
				padding: 10px ;
				margin: 0;
				top: inherit;
				left: inherit;
				z-index: 1;
				right: inherit;
				text-align: center;
				bottom: inherit;
				white-space: inherit;
				line-height: inherit;
				height: auto;
				margin-top: 120px;
				width: 90%;
				margin-left: 5%;
				margin-bottom: 10px;
				border-radius: 50px;

				.colors-box {
					display: none;
				}

				.avatar-small {
					display: none;
				}

				.cover-small {
					display: none;
				}
			}
		}

		.info {
			padding: 8px 16px;
		}
	}
}
</style>

<style lang="scss">
.page-profile {
	.el-tabs:not(.el-tabs--border-card) {
		.el-tabs__item:not(.is-active) {
			color: #32325d;
		}
	}
}
</style>
