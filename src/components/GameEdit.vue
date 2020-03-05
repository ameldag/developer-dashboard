<template>
	
	<div class="page-game-edit">
		<div class="page-header">
			<h1>{{action}} game </h1>
		</div>
		
		<el-form ref="currentGame" :model="currentGame" :rules="currentRules" label-width="120px" :label-position="labelPosition">
			<div class="card-base card-shadow--medium info" style="padding: 20px;">
			<el-steps :active="active" finish-status="success" style="padding-bottom: 30px" align-center>
				<el-step title="Informations"></el-step>
				<el-step title="Tournaments"></el-step>
				<el-step title="Additional Information"></el-step>
				<el-step title="Notification"></el-step>
			</el-steps>
			<div v-if="active===0">
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Name" prop="name">
						<el-input type="text" v-model="currentGame.name"/>
					</el-form-item>
				</el-col>
				
				<el-col class="col-p">
					<el-form-item label="Description" prop="description">
						<textarea v-model="currentGame.description" autosize></textarea>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Platform" prop="platforms">
						<el-checkbox-group v-model="currentGame.platforms">
							<el-checkbox label="Android" border></el-checkbox>
							<el-checkbox label="IOS" border></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Orientation" prop="orientation">
						<el-radio-group v-model="currentGame.orientation">
							<el-radio label="portrait" border></el-radio>
							<el-radio label="landscape" border></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Engine" prop="engine">
						<el-radio-group v-model="currentGame.engine">
							<el-radio label="unity" border></el-radio>
							<el-radio label="unreal" border></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Status" prop="status">
						<el-radio-group v-model="currentGame.status">
							<el-radio label="true" border>Active</el-radio>
							<el-radio label="false" border>Disabled</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</div>
			<div v-if="active===1">
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Duels" prop="tournaments">
						<el-checkbox-group v-model="currentGame.tournaments">
							<el-checkbox label="Novice" border></el-checkbox>
							<el-checkbox label="Amateur" border></el-checkbox>
							<el-checkbox label="Confirmed" border></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Brackets" prop="brackets">
						<el-checkbox-group v-model="currentGame.brackets">
							<el-checkbox label="Confident" border></el-checkbox>
							<el-checkbox label="Champion" border></el-checkbox>
							<el-checkbox label="Legend" border></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</div>
			<div v-if="active===2">
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20 flex-display">
					<el-form-item label="Icon" prop="icon">
						<input type="file" accept=".jpg, .jpeg, .png" @change="processIcon" >
						<img width="50px" heigth="50px" :src="currentGame.icon" v-if="currentGame.icon"></img>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20 flex-display">
					<el-form-item label="Background" prop="background_image">
						<input name="backgrounginput" type="file"  accept=".jpg, .jpeg, .png" @change="processBackground" />
						<img width="50px" heigth="50px" :src="currentGame.background_image" v-if="currentGame.background_image"></img>
					</el-form-item>
				</el-col>
			</div>
			<div v-if="active===3">
				<div v-if="currentGame.platforms.includes('IOS')">
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20 ">
						<h3 class="tx-gray-800 tx-uppercase tx-bold tx-16 mg-t-30 mg-b-10">iOS Notifications</h3>
						<p>Switch your notifications from sandbox to production. For any assistance in switching over your notifications, visit our <a href="https://www.google.com">Documentation</a>.</p>
					</el-col>
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="p12 file" prop="p_12_file">
							<input name="fileinput" type="file" accept=".p12" @change="processP12" />
						</el-form-item>
					</el-col>

					<el-col class="col-p">
						<el-form-item label="p12 password" prop="p_12_password">
							<el-input type="password" v-model="currentGame.p_12_password" autosize></el-input>
						</el-form-item>
					</el-col>
				</div>
				<div v-if="currentGame.platforms.includes('Android')">
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<h3 class="tx-gray-800 tx-uppercase tx-bold tx-16 mg-t-30 mg-b-10">Android - GCM Notifications</h3>
						<p>To get token, go to the <a href="https://developer.android.com/distribute/console">Developer Console</a>.</p>
						<div class="mg-t-25 mg-l-20"><ul class="list-group"><li> APIs &amp; Auth </li> <li> Credentials </li> <li> Add Credentials </li> <li> Server Key </li> <li> Give it a name, leave "&nbsp;Accept requests from these server IP addresses&nbsp;" blank, click create </li> <li> You are given an API key </li></ul></div>
					</el-col>
					
					
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="Enter this key" prop="gcm_api_key">
							<el-input type="text" v-model="currentGame.gcm_api_key" autosize></el-input>
						</el-form-item>
					</el-col>
				</div>
			</div>
	
			<el-col class="col-p">
				<el-form-item>
					<el-button @click="back" v-if="active!==0 ">Back</el-button>
					<el-button type="primary"  style="margin-top: 12px; float:right;" @click="next('currentGame')">Next</el-button>
				</el-form-item>
			</el-col>
			</div>
		</el-form>
	</div>
</template>

<script>
const axios = require('axios');
import gamesService from '../services/games' 
export default {
	name: 'GameEdit',
	props: ['action','currentGame'],
	data() {
		return {
			active: 0,
			labelPosition: 'left', //left, right, or top
			rules: {
				0: {
					 name: [
						{ required: true, message: 'Please input Activity name', trigger: 'change' },
					],
					platforms: [
						{ type: 'array', required: true, message: 'Please select at least one platform', trigger: 'change' }
					],
					orientation: [
						{ required: true, message: 'Please choose orientation', trigger: 'change' }
					],
					engine: [
						{ required: true, message: 'Please choose an engine', trigger: 'change' }
					],
					status: [
						{ required: true, message: 'Please choose status', trigger: 'change' }
					],
				},
				1: {
					tournaments: [
						{ type: 'array', required: true, message: 'Please select at least one', trigger: 'change' }
					],
					brackets: [
						{ type: 'array', required: true, message: 'Please select at least one', trigger: 'change' }
					],
				},
				2: {
					icon: [
						{
							validator: (rule, value, callback, source, options) => {
							console.log({value})
							if(value === ''){
								callback(new Error('Please upload an icon'))
							} else {
								callback();
							}
						}, trigger: 'change'}
					],
					background_image: [
						{
							validator: (rule, value, callback, source, options) => {
							console.log({value})
							if(value === ''){
								callback(new Error('check this box to continue'))
							} else {
								callback();
							}
						}, trigger: 'change'}
					],
				},
				3: {
					p_12_file: [
						{
							validator: (rule, value, callback, source, options) => {
							console.log({value})
							if(value === '' || value === null){
								callback(new Error('Please upload an icon'))
							} else {
								callback();
							}
						}, trigger: 'change'}
					],
					p_12_password: [
						{ required: true, message: 'Please enter a password', trigger: 'change' }
					],
					gcm_api_key: [
						{ required: true, message: 'Please enter your server key', trigger: 'change' }
					]
				}
			}
		}
	},
    props: {
		action : String,
		currentGame : Object
	},
	computed: {
		currentRules() {
			return this.rules[this.active]
		}
	},
	methods: {
		next(currentGame) {
			this.$refs[currentGame].validate(async (valid) => {
			if (valid) {
				console.log(this.active)
				if (++this.active > 3) {
					this.$store.commit('setSplashScreen', true)
					let data = {
						token : localStorage.getItem("token"),
						id : localStorage.getItem("current_team")
					}
					console.log(this.action)
					if(this.action == "Update"){
						data.game_id = this.$route.params.id
						await gamesService.updateGame(data, this.currentGame)
						.then((res) => {
							this.$router.replace('/management/games');
							this.$store.commit('setSplashScreen', false)
							this.$notify({
								title: res.data.message,
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
							return error.response;
						});
					} else {
						await gamesService.createGame(data, this.currentGame)
						.then((res) => {
							this.$router.replace('/management/games');
							this.$store.commit('setSplashScreen', false)
							this.$notify({
								title: res.data.message,
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
							return error.response;
						});
					}
				}
			} else {
				return false;
			}
			});
		},
		back() {
			this.active--
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'	
			}
		},
		async processIcon($event){
			if (event.target.files.length) {
				gamesService.uploadIcon(event.target.files[0])
				.then((res) => {
					this.currentGame.icon = res.data.data
				})
				.catch((error) => {
					return error.response;
				});
			}
		},
		async processBackground($event){
			if (event.target.files.length) {
				gamesService.uploadIcon(event.target.files[0])
				.then((res) => {
					this.currentGame.background_image = res.data.data
				})
				.catch((error) => {
					return error.response;
				});
			}
		},
		async processP12($event){
			if (event.target.files.length) {
				gamesService.uploadIcon(event.target.files[0])
				.then((res) => {
					this.currentGame.p_12_file = res.data.data
				})
				.catch((error) => {
					return error.response;
				});
			}
		},

	},
	mounted() {
		this.resizeLabelPosition();
        window.addEventListener('resize', this.resizeLabelPosition);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition);
	}
}
</script>

<style lang="scss" scoped>
// @import '../../assets/scss/_variables';

.page-profile-edit {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
}
</style>
