<template>
	<div class="page-vue-good-table scrollable only-y">
		<div class="page-header">
			<h1>Manage your team</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-gamepad-right"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Management</el-breadcrumb-item>
				<el-breadcrumb-item>Team Members</el-breadcrumb-item>
				<el-breadcrumb-item>List</el-breadcrumb-item>
			</el-breadcrumb>
			<el-button type="primary" class="text-truncate" style="float:right;" @click="centerDialogVisible = true" >Invite New Member</el-button>
			<el-dialog
			:visible.sync="centerDialogVisible"
			width="30%"
			center>
			<div>
				<label name="email" class="test-truncate">email :</label>
				<el-input type="text" v-model="email" />
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="test-truncate" @click="centerDialogVisible = false">Annuler</el-button>
				<el-button type="primary" class="test-truncate" v-loading="sendInvitationLoader" @click="sendInvitation">Confirmer</el-button>
			</span>
			</el-dialog>
		</div>
		<div class="vue-good-table-box card-base card-shadow--medium">
			<vue-good-table v-loading="loadingTableData"
				v-if="this.$store.state.team.members ? this.$store.state.team.members.length : false "
				:columns="columns"
				:rows="this.$store.state.team.members"
				:search-options="{
					enabled: false,
					placeholder: 'Search this table'
				}"
				:pagination-options="{
					enabled: true,
					mode: 'records',
					perPage: 10,
					perPageDropdown: [10, 20, 30, 40, 50],
					nextLabel: 'Next',
					prevLabel: 'Prev',
					rowsPerPageLabel: 'Rows per page',
					ofLabel: 'of',
					pageLabel: 'page', // for 'pages' mode
					allLabel: 'All',
				}"
				:lineNumbers="false"
				class="styled">
				<template slot="table-row" slot-scope="props">
					<span v-if="props.column.field == 'avatar'">
						<span v-if="props.row.avatar">
							<img v-bind:src="props.row.avatar" alt="avatar" class="avatar">
						</span>
						<span v-else>
							<img src="http://via.placeholder.com/300x300" alt="avatar" class="avatar">
						</span>
					</span>
					
					<span v-else-if="props.column.field == 'created_at'">
						<span class="card-date">{{moment(props.row.created_at).format('YYYY-MM-DD')}}</span>
					</span>
					
					<span v-else-if="props.column.field == 'name'">
						<el-button type="text" class="text-truncate" plain>{{ props.row.first_name }} {{ props.row.last_name }}</el-button>
					</span>
					
					<span v-else-if="props.column.field == 'role_in_team'">
						<span v-if="props.row.role_in_team == 'Administrator'">
							<el-button type="success" round class="test-truncate">{{ props.row.role_in_team }}</el-button>
						</span>
						<span v-else>
							<el-button type="warning" round class="test-truncate">{{ props.row.role_in_team }}</el-button>
						</span>
					</span>

					<span v-else>
					{{props.formattedRow[props.column.field]}}
					</span>
				</template>
			</vue-good-table>
		</div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
	name: 'Games',
	data(){
		return {
			loadingTableData: true,
			centerDialogVisible: false,
			sendInvitationLoader: false,
			email: '',
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
	async mounted() {
		this.loadingTableData = true
		let data = {
			token : localStorage.getItem("token"),
			id : localStorage.getItem("current_team")
		}
		await this.$store.dispatch("team/getMembers", data)
		this.loadingTableData = false
	},
	methods: {
		async sendInvitation() {
			if(this.email != ''){
				this.sendInvitationLoader = true
				let data = {
					token : localStorage.getItem("token"),
					id : localStorage.getItem("current_team")
				}

				await axios.post(`https://seemba-api.herokuapp.com/api/dashboard/v1/editors/` + data.id + '/invite' ,{email : this.email} ,{ headers: { "x-access-token": localStorage.getItem('token') } })
				.then((res) => {
					this.sendInvitationLoader = false
					this.centerDialogVisible = false
					if(res.data.success){
						this.$notify({
							title: 'Invitation send',
          					type: 'success',
							customClass: 'success-alert',
						});
					} else {
						this.$notify({
							title: res.data.message,
          					type: 'warning',
							customClass: 'warning-alert',
						});
					}
					
				})
				.catch((error) => {
					this.sendInvitationLoader = false
					this.centerDialogVisible = false
					this.$notify({
						title: 'something went wrong please try later',
						type: 'error',
						customClass: 'error-alert',
					});
				});
			}
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

.success-alert{
	background-color: #f0f9eb;
	color: #67c23a
}
.warning-alert{
	background-color: #fdf6ec;
	color: #e6a23c
}
.error-alert{
	background-color: #fef0f0;
	color: #f56c6c
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

