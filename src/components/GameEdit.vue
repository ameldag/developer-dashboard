<template>
	
	<div class="page-game-edit">
		<div class="page-header">
			<h1>{{action}} game </h1>
		</div>
		
		<el-form ref="currentGame" :model="game" :rules="currentRules" label-width="120px" :label-position="labelPosition">
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
						<el-input type="text" v-model="game.name" />
					</el-form-item>
				</el-col>
				
				<el-col class="col-p">
					<el-form-item label="Description" prop="description">
						<textarea v-model="game.description" autosize></textarea>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Platform" prop="platforms">
						<el-checkbox-group v-model="game.platforms">
							<el-checkbox label="Android" border></el-checkbox>
							<el-checkbox label="IOS" border></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Orientation" prop="orientation">
						<el-radio-group v-model="game.orientation">
							<el-radio label="portrait" border></el-radio>
							<el-radio label="landscape" border></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Engine" prop="engine">
						<el-radio-group v-model="game.engine">
							<el-radio label="unity" border></el-radio>
							<el-radio label="unreal" border disabled ></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Score mode" prop="score_mode">
						<el-radio-group v-model="game.score_mode">
							<el-radio label="highest" border></el-radio>
							<el-radio label="lowest" border ></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Status" prop="status">
						<el-radio-group v-model="game.status">
							<el-radio label="true" border>Active</el-radio>
							<el-radio label="false" border>Disabled</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</div>
			<div v-if="active===1">
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Duels" prop="tournaments">
						<el-checkbox-group v-model="game.tournaments">
							<el-checkbox label="Novice" border></el-checkbox>
							<el-checkbox label="Amateur" border></el-checkbox>
							<el-checkbox label="Confirmed" border></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Brackets" prop="brackets">
						<el-checkbox-group v-model="game.brackets">
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
						<img width="50px" heigth="50px" :src="game.icon" v-if="game.icon"/>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20 flex-display">
					<el-form-item label="Background" prop="background_image">
						<input name="backgrounginput" type="file"  accept=".jpg, .jpeg, .png" @change="processBackground" />
						<img width="50px" heigth="50px" :src="game.background_image" v-if="game.background_image"/>
					</el-form-item>
				</el-col>
			</div>
			<div v-if="active===3">
				<div >
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="FCM file" prop="fcm_file">
							<input name="fileinput" type="file" accept=".json" @change="processFCMfile" />
						</el-form-item>
					</el-col>
				</div>
			</div>
	
			<el-col class="col-p">
				<el-form-item>
					<el-button @click="back" v-if="active!==0 ">Back</el-button>
					<el-button type="primary"  style="float:right;" @click="next('game')">Next</el-button>
				</el-form-item>
			</el-col>
			</div>
		</el-form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'GameEdit',
	props: ['action','currentGame'],
	watch: { 
		currentGame: function(newVal, oldVal) { // watch it
			this.game = {...newVal}
		}
	},
	data() {
		return {
			active: 0,
			labelPosition: 'left', //left, right, or top
			game: {
				name: '',
				description: '',
				icon: '',
				background_image: '',
				fcm_file: '',
				p_12_password: '',
				p_12_password_overwrite: '',
				gcm_api_key: '',
				appstore_id: '',
				bundle_id: null,
				orientation: null,
				score_mode: null,
				status: null,
				engine: null,
				platforms: [],
				tournaments: [],
				brackets: [],
			},
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
					score_mode: [
						{ required: true, message: 'Please choose a score mode', trigger: 'change' }
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
							if(value === ''){
								callback(new Error('Please upload a backgroud image'))
							} else {
								callback();
							}
						}, trigger: 'change'}
					],
				},
				// 3: {
				// 	fcm_file: [
				// 		{
				// 			validator: (rule, value, callback, source, options) => {
				// 			if(value === '' || value === null){
				// 				callback(new Error('Please upload an icon'))
				// 			} else {
				// 				callback();
				// 			}
				// 		}, trigger: 'change'}
				// 	],
				// 	p_12_password: [
				// 		{ required: true, message: 'Please enter a password', trigger: 'change' }
				// 	],
				// 	gcm_api_key: [
				// 		{ required: true, message: 'Please enter your server key', trigger: 'change' }
				// 	]
				// }
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
		...mapActions('games', ['create', 'update']),
		next(currentGame) {
			this.$refs['currentGame'].validate(async (valid) => {
			if (valid) {
				if (++this.active > 3) {
					this.$store.commit('setSplashScreen', true)
					if(this.action == "Update"){
						const formData = new FormData();
						await Object.keys(this.game).forEach((key) => {
							if(key == 'platforms' || key == 'brackets' || key == 'tournaments')
								formData.append(key, JSON.stringify(this.game[key]))
							else
								formData.append(key,this.game[key])
						})
						
						await this.update({
							id: this.$route.params.id,
							data: formData
						})
						.then((res) => {
							this.$router.replace('/management/games');
							this.$store.commit('setSplashScreen', false)
							this.$notify({
								title: 'game updated successfully',
								type: 'success',
								customClass: 'success-alert',
							});
						})
						.catch((error) => {	
							console.error(error);
													
							this.$store.commit('setSplashScreen', false)
							this.$notify({
								title: 'something went wrong please try later',
								type: 'error',
								customClass: 'error-alert',
							});
							return error.response;
						});
					} else {
						const formData = new FormData();
						await Object.keys(this.game).forEach((key) => {
							formData.append(key,this.game[key])
						})
						await this.create(formData)
						.then((res) => {
							this.$router.replace('/management/games');
							this.$store.commit('setSplashScreen', false)
							this.$notify({
								title: 'game added successfully',
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
				this.game.icon = event.target.files[0]
			}
		},
		async processBackground($event){
			if (event.target.files.length) {
				this.game.background_image = event.target.files[0]
			}
		},
		async processFCMfile($event){
			if (event.target.files.length) {
				this.game.fcm_file = event.target.files[0]
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
