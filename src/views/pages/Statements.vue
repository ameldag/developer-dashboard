<template>
	<div class="">
		<div class="page-header">
			<h1>Manage your revenue</h1>
		</div>
        <el-row :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style='margin: auto; float: none; text-align: center;'>
				<div class="card-base card-shadow--medium mb-30 widget small-widget" >

					<div class="widget-header ph-20 pt-20 pb-20">
						<div class="flex justify-center align-center">
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="m-0 widget-title text-truncate pt-5 pb-10">CURRENT BALANCE</div>
								<div class="m-0 widget-title text-truncate pt-5 pb-10">Quick peek on your current balance</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.team.currentTeam.balance || 0 }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
        </el-row>
		<el-dialog
			:visible.sync="FormVisible"
			width="30%"
			center>
			<el-form>
				<div class="card-base card-shadow--medium info" style="padding: 20px;">
				<!-- rib swift codeagence adressbank montant currency fullname adressfacturation -->
					<el-row :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="Full Name :" >
							<el-input type="text" />
						</el-form-item>
					</el-row>
					
					<el-row slot="footer" class="dialog-footer">
						<el-button class="test-truncate" @click="FormVisible = false">Annuler</el-button>
						<el-button type="primary" class="test-truncate" @click="sendInvitation">Confirmer</el-button>
					</el-row>
				</div>
			</el-form>
		</el-dialog>
		<el-row :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style='margin: auto;	float: none; text-align: center;'>
				<el-button type="primary" class="text-truncate" round @click="FormVisible = true">Withdraw</el-button>
			</el-col>
        </el-row>
    </div>
</template>

<script>
const axios = require('axios');

export default {
	name: 'Games',
	data(){
		return {
			email: '',
			FormVisible: false,
			columns: [
				{
					label: 'Avatar',
					field: 'avatar',
					filterable: false,
				},
				{
					label: 'Name',
					field: 'name',
					filterable: true,
				},
				{
					label: 'Email',
					field: 'email',
					html: false,
					filterable: true,
				},
				{
					label: 'Country',
					field: 'country',
					html: false,
					filterable: true,
				},
				{
					label: 'Registered At',
					field: 'created_at',
					type: 'string'
				},
				{
					label: 'Role',
					field: 'role_in_team',
					html: false,
				},
			],
		}
	},
	mounted() {
		let data = {
			token : localStorage.getItem("token"),
			id : localStorage.getItem("current_team")
		}
		this.$store.dispatch("team/getMembers", data)
	},
	methods: {
		async sendInvitation() {
			let data = {
				token : localStorage.getItem("token"),
				id : localStorage.getItem("current_team")
			}

			await axios.post(`https://seemba-api.herokuapp.com/api/dashboard/v1/editors/` + data.id + '/invite' ,{email : this.email} ,{ headers: { "x-access-token": localStorage.getItem('token') } })
			.then((res) => {
			this.$router.replace('/management/teams');
			})
			.catch((error) => {
				return error.response;
			});
		}
	}
}
</script>

<style lang="scss">
.page-vue-good-table {
	overflow: hidden;
}

.avatar {
	height: 40px;
	width: 40px;
	object-fit: cover;
	border-radius: 50%;
}

// .card-date {
// 	-webkit-box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
// 	box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
// 	background-color: #fff;
//     border-radius: 5px;
// 	overflow: hidden;
// 	margin: 10px 0px;
// 	padding: 10px 20px;
// 	font-weight: 900;
// }
</style>

