<template>
	
	<div class="page-game-edit">
		<div class="page-header">
			<h1>{{action}} game </h1>
		</div>
		
		<el-form ref="form" :model="currentGame" label-width="120px" :label-position="labelPosition">
		<div class="card-base card-shadow--medium info bg-white black-text" style="padding: 20px;">
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Name">
					<el-input type="text" v-model="currentGame.name"/>
				</el-form-item>
			</el-col>
			
			<el-col class="col-p">
				<el-form-item label="Description">
					<el-input type="textarea" v-model="currentGame.description" autosize></el-input>
				</el-form-item>
			</el-col>

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Platform">
					<el-checkbox-group v-model="currentGame.platforms">
						<el-checkbox label="Android" border></el-checkbox>
						<el-checkbox label="IOS" border></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-col>

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Orientation">
					<el-radio-group v-model="currentGame.orientation">
						<el-radio label="portrait" border></el-radio>
						<el-radio label="landscape" border></el-radio>
					</el-radio-group>
				</el-form-item>
			</el-col>

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Engine">
					<el-radio-group v-model="currentGame.engine">
						<el-radio label="unity" border></el-radio>
						<el-radio label="unreal" border></el-radio>
					</el-radio-group>
				</el-form-item>
			</el-col>

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Status">
					<el-radio-group v-model="currentGame.status">
						<el-radio label="true" border>Active</el-radio>
						<el-radio label="false" border>Disabled</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-col>

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Duels">
					<el-checkbox-group v-model="currentGame.tournaments">
						<el-checkbox label="Novice" border></el-checkbox>
						<el-checkbox label="Amateur" border></el-checkbox>
						<el-checkbox label="Confirmed" border></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-col>

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Brackets">
					<el-checkbox-group v-model="currentGame.brackets">
						<el-checkbox label="Confident" border></el-checkbox>
						<el-checkbox label="Champion" border></el-checkbox>
						<el-checkbox label="Legend" border></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-col>

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Icon">
					<el-input type="file" accept=".jpg, .jpeg, .png" @change="processIcon" v-model="currentGame.icon"/>
				</el-form-item>
			</el-col>

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Background">
				<el-input type="file" accept=".jpg, .jpeg, .png" @change="processBackground" v-model="currentGame.background_image"/>
				</el-form-item>
			</el-col>
		</div>
				<h3 class="tx-gray-800 tx-uppercase tx-bold tx-16 mg-t-30 mg-b-10">iOS Notifications</h3>
				<p>Switch your notifications from sandbox to production. For any assistance in switching over your notifications, visit our <a href="https://www.google.com">Documentation</a>.</p>
		<div class="card-base card-shadow--medium info bg-white black-text" style="padding: 20px;">

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="p12 file">
						<el-input type="file" @change="processP12" v-model="currentGame.p_12_file"/>
				</el-form-item>
			</el-col>

			<el-col class="col-p">
				<el-form-item label="p12 password">
					<el-input type="password" v-model="currentGame.p_12_password" autosize></el-input>
				</el-form-item>
			</el-col>
			</div>
			<h3 class="tx-gray-800 tx-uppercase tx-bold tx-16 mg-t-30 mg-b-10">Android - GCM Notifications</h3>
				<p>To get token, go to the <a href="https://www.google.com">Developer Console</a>.</p>
				<div class="mg-t-25 mg-l-20"><ul class="list-group"><li> APIs &amp; Auth </li> <li> Credentials </li> <li> Add Credentials </li> <li> Server Key </li> <li> Give it a name, leave "&nbsp;Accept requests from these server IP addresses&nbsp;" blank, click create </li> <li> You are given an API key </li></ul></div>

			<div class="card-base card-shadow--medium info bg-white black-text" style="padding: 20px;">
			
			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
				<el-form-item label="Enter this key">
					<el-input type="text" v-model="currentGame.gcm_api_key" autosize></el-input>
				</el-form-item>
			</el-col>
			
			<el-col class="col-p">
				<el-form-item>
					<el-button type="primary" @click="onSubmit">Save</el-button>
					<el-button>Cancel</el-button>
				</el-form-item>
			</el-col>
		</div>
		</el-form>
	</div>
</template>

<script>
const axios = require('axios');
export default {
	name: 'GameEdit',
	props: ['action','currentGame'],
	data() {
		return {
			hobbies: [
				{
					value: 'Model building',
					label: 'Model building'
				}, {
					value: 'Drawing',
					label: 'Drawing'
				}, {
					value: 'Snowboarding',
					label: 'Snowboarding'
				}
			],
			skills: [
				{
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'JavaScript',
					label: 'JavaScript'
				}
			],
			labelPosition: 'left' //left, right, or top
		}
	},
    props: {
		action : String,
		currentGame : Object
	},
	methods: {
		async onSubmit() {
			console.log(this.currentGame)
			console.log(this.action)
			let data = {
				token : localStorage.getItem("token"),
				id : localStorage.getItem("current_team")
			}
			if(this.action == "Update"){
				await axios.put(`http://localhost:8000/api/dashboard/v1/games/` + data.id + '/' + this.$route.params.id ,this.currentGame ,{ headers: { "x-access-token": localStorage.getItem('token') } })
				.then((res) => {
				this.$router.replace('/management/games');
				})
				.catch((error) => {
					return error.response;
				});
			} else {
				await axios.post(`http://localhost:8000/api/dashboard/v1/games/` + data.id ,this.currentGame ,{ headers: { "x-access-token": localStorage.getItem('token') } })
				.then((res) => {
				this.$router.replace('/management/games');
				})
				.catch((error) => {
					return error.response;
				});
			}
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'	
			}
		},
		async processIcon($event){
			if (event.target.files.length) {
				const formData = new FormData();
				formData.append('image',event.target.files[0])
				await axios.post(`https://seemba-api.herokuapp.com/api/dashboard/v1/games/image/upload` ,formData ,{ headers: { "x-access-token": localStorage.getItem('token') } })
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
				const formData = new FormData();
				formData.append('image',event.target.files[0])
				await axios.post(`https://seemba-api.herokuapp.com/api/dashboard/v1/games/image/upload` ,formData ,{ headers: { "x-access-token": localStorage.getItem('token') } })
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
				const formData = new FormData();
				formData.append('file',event.target.files[0])
				await axios.post(`https://seemba-api.herokuapp.com/api/dashboard/v1/games/upload` ,formData ,{ headers: { "x-access-token": localStorage.getItem('token') } })
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
