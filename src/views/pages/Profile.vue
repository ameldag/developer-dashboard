<template>
	<vue-scroll class="page-profile" id="affix-container">
		<div class="card-base card-shadow--medium identity" id="boundary">
			<div class="cover"></div>
			<!--<div class="username" v-affix="{parentid: 'affix-container', boundaryid: '', delay:600, offset:0, enable:() => affixEnabled}">-->
			
				<span class="username">{{this.$store.state.session.user.first_name}} {{this.$store.state.session.user.last_name}}</span>
			
			<div class="avatar-upload">
				<div class="avatar-preview" v-loading="uploadAvatarLoader">
					<img :src="me.avatar" alt="avatar" >
				</div>
				<div class="avatar-edit">
					<input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" @change="profileImage" />
					<label for="imageUpload"></label>
				</div>
			</div>		
    	</div>
		
		<div class="page-profile card-base card-shadow--medium" style="padding: 20px;" id="boundary">
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
			
			<el-col :span="12" :md="24" :sm="24" :xs="24">
					<el-button class="float-right" type="primary" @click="onSubmit">Save</el-button>
					<el-button class="float-right mr-5">Cancel</el-button>
			</el-col>
		</el-form>
		</div>
	</vue-scroll>
</template>

<script>
import ColorThief from 'color-thief-browser'
import Affix from '@/components/Affix'
import userServices from '../../services/user'
export default {
	name: 'Profile',
	data() {
		return {
			uploadAvatarLoader: false,
			me : {
				first_name: this.$store.state.session.user.first_name,
				last_name: this.$store.state.session.user.last_name,
				address: this.$store.state.session.user.address,
				country: this.$store.state.session.user.country,
				city: this.$store.state.session.user.city,
				zipcode: this.$store.state.session.user.zipcode,
				avatar: this.$store.state.session.user.avatar,
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

		async profileImage($event){
			if (event.target.files.length) {
				this.uploadAvatarLoader = true
				await userServices.uploadAvatar(event.target.files[0])
				.then((res) => {
					this.me.avatar = res.data.data
					this.uploadAvatarLoader = false
				})
				.catch((error) => {
					this.uploadAvatarLoader = true
					this.$notify({
						title: 'something went wrong please try later',
						type: 'error',
						customClass: 'error-alert',
					});
				});
			}
		},

		async onSubmit(){
			this.$store.commit('setSplashScreen', true)
			let data = {
				token : localStorage.getItem("token"),
				id : this.$store.getters['session/me']._id
			}
			await userServices.updateUser(data, this.me)
			.then(async (res) => {
				await this.$store.dispatch("session/getMe", localStorage.getItem('token'))
				this.$store.commit('setSplashScreen', false)
				this.$notify({
					title: 'User updated successfully',
					type: 'success',
					customClass: 'success-alert',
				});
			})
			.catch((error) => {
				this.$store.commit('setSplashScreen', false)
				this.$notify({
					title: 'something went wrong please try later',
					type: 'error',
					customClass: 'error-alert',
				});
			});
		}
	},
	mounted() {

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
			background-image: url('../../assets/images/couverture.png');
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
			bottom: 40px;
			left: 0;
			right: 0;
			background: #fff;
			line-height: 50px;
			box-sizing: border-box;
			padding-left: 250px;
			font-size: 25px;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);

			// .cover-small {
			// 	width: 220px;
			// 	height: 50px;
			// 	overflow: hidden;
			// 	display: block;
			// 	float: left;
			// 	margin-right: -220px;
			// 	position: relative;
			// 	left: -250px;
			// 	border-radius: 9px;
			// 	-webkit-box-sizing: border-box;
			// 	box-sizing: border-box;
			// 	border: 4px solid white;
			// 	opacity: 0;
			// 	top: 0px;
			// 	background-image: url('../../assets/images/cover-2.jpg');
			// 	background-position: 50%;
			// 	background-size: cover;
			// 	background-repeat: no-repeat;
			// 	-webkit-transition: all .5s;
			// 	transition: all .5s;
			// }
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

				// .cover-small {
				// 	opacity: 1;
				// }

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
			position: absolute;
			bottom: 10px;
			left: 50px;
			width: 180px;
			height: 180px;
			overflow: hidden;
			// border-radius: 50%;
			// box-sizing: border-box;
			// box-shadow: 0px 20px 15px -15px rgba(0, 0, 0, 0.15);

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.avatar-upload {
			max-width: 205px;
			margin: 13px auto;
			position: absolute;
			bottom: 0px;
			left:50px;
			width: 180px;
			height: 180px;
			overflow: hidden;
		}
		.avatar-upload .avatar-edit {
			position: absolute;
			right: 12px;
			z-index: 3000;
			bottom: 5px;
		}
		.avatar-upload .avatar-edit input {
			display: none;
		}
		.avatar-upload .avatar-edit input + label {
			display: inline-block;
			width: 34px;
			height: 34px;
			margin-bottom: 0;
			border-radius: 100%;
			background: #FFFFFF;
			border: 1px solid transparent;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
			cursor: pointer;
			font-weight: normal;
			transition: all 0.2s ease-in-out;
		}
		.avatar-upload .avatar-edit input + label:hover {
			background: #f1f1f1;
			border-color: #d6d6d6;
		}
		.avatar-upload .avatar-edit input + label:after {
			content: "\f040";
			font-family: 'FontAwesome';
			color: #757575;
			position: absolute;
			top: 6px;
			left: 0;
			right: 0;
			text-align: center;
			margin: auto;
		}
		.avatar-upload .avatar-preview {
			position: absolute;
			bottom: 0px;
			left: 0px;
			width: 180px;
			height: 180px;
			overflow: hidden;
			border-radius: 50%;
			box-sizing: border-box;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
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

.success-alert{
	background-color: #f0f9eb;
	color: #67c23a
}
	
.error-alert{
	background-color: #fef0f0;
	color: #f56c6c
}
.float-right{
	float: right
}
}
@media screen and (min-width: 991px) and (max-width: 1130px) {
	.page-profile {
		.identity {
			.username {
				padding-left: 190px;
			}
			.avatar-upload {
				left:25px;
				width: 150px;
				height: 150px;
			}
			.avatar-upload .avatar-preview {
				width: 150px;
				height: 150px;
			}
			.avatar-upload .avatar-edit {
				position: absolute;
				right: 0px;
				z-index: 3000;
				bottom: 3px;
			}
		}
	}
}
@media screen and (min-width: 768px) and (max-width: 991px) {
	.page-profile {
		.identity {
			.username {
				padding-left: 155px;
			}
			.avatar-upload {
				left:25px;
				width: 120px;
				height: 120px;
			}
			.avatar-upload .avatar-preview {
				width: 120px;
				height: 120px;
			}
			.avatar-upload .avatar-edit {
				position: absolute;
				right: 0px;
				z-index: 3000;
				bottom: 3px;
			}
		}
	}
}
@media (max-width: 768px) {
	.page-profile {
		.identity {
			height: 180px;
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
				color: #32325d;
				position: absolute;
				width: 100%;
				height: 20px;
				bottom: 20px;
				left: 0;
				right: 0;
				background: #fff;
				line-height: 20px;
				box-sizing: border-box;
				padding-left: 80px;
				font-size: 12px;
				font-weight: bold;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);

				.colors-box {
					display: none;
				}

				.avatar-small {
					display: none;
				}

				// .cover-small {
				// 	display: none;
				// }

			}

			.avatar-upload {
				max-width: 205px;
				margin: 13px auto;
				position: absolute;
				bottom: 0px;
				left:8px;
				width: 65px;
				height: 65px;
				overflow: hidden;
			}
			.avatar-upload .avatar-edit {
				position: absolute;
				right: 1px;
				z-index: 3000;
				bottom: -5px;
			}
			.avatar-upload .avatar-edit input {
				display: none;
			}
			.avatar-upload .avatar-edit input + label {
				display: inline-block;
				width: 15px;
				height: 15px;
				margin-bottom: 0;
				border-radius: 100%;
				background: #FFFFFF;
				border: 1px solid transparent;
				box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
				cursor: pointer;
				font-weight: normal;
				transition: all 0.2s ease-in-out;
			}
			.avatar-upload .avatar-edit input + label:hover {
				background: #f1f1f1;
				border-color: #d6d6d6;
			}
			.avatar-upload .avatar-edit input + label:after {
				content: "\f040";
				font-family: 'FontAwesome';
				color: #757575;
				font-size: 11px;
				position: absolute;
				top: 2px;
				left: 0;
				right: 0;
				text-align: center;
				margin: auto;
			}

			.avatar-upload .avatar-preview {
				position: absolute;
				bottom: 0px;
				left: 0px;
				width: 65px;
				height: 65px;
				overflow: hidden;
				border-radius: 50%;
				box-sizing: border-box;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
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
