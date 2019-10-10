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
		</div>

		<div class="vue-good-table-box card-base card-shadow--medium">
			<vue-good-table
				:columns="columns"
				:rows="rows"
				:search-options="{
					enabled: true,
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
						<button class="el-button el-button--primary is-plain">{{ props.row.first_name }} {{ props.row.last_name }}</button>
					</span>
					
					<span v-else-if="props.column.field == 'role_in_team'">
						<span v-if="props.row.role_in_team == 'Administrator'">
							<button class="el-button el-button--success is-round">{{ props.row.role_in_team }}</button>
						</span>
						<span v-else>
							<button class="el-button el-button--default is-round">{{ props.row.role_in_team }}</button>
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
			rows: [],
		}
	},
	mounted() {
		let data = {
			token : localStorage.getItem("token"),
			id : this.$store.getters['session/me'].team
		}
		this.$store.dispatch("team/getMembers", data).then((res) => {
			this.rows = this.$store.getters['team/members']
		});
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

.card-date {
	-webkit-box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
	box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
	background-color: #fff;
    border-radius: 5px;
	overflow: hidden;
	margin: 10px 0px;
	padding: 10px 20px;
	font-weight: 900;
}
</style>

