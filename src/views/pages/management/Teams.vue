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
			// rows: [
			// 	{_id:1, name:"John",age:20,createdAt: '2010-10-31',score: 0.03343},
			// 	{_id:2, name:"Jane",age:24,createdAt: '2011-10-31',score: 0.03343},
			// 	{_id:3, name:"Susan",age:16,createdAt: '2011-10-30',score: 0.03343},
			// 	{_id:4, name:"Chris",age:55,createdAt: '2011-10-11',score: 0.03343},
			// 	{_id:5, name:"Dan",age:40,createdAt: '2011-10-21',score: 0.03343},
			// 	{_id:6, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
			// 	{_id:7, name:"Jane",age:24,createdAt: '20111031'},
			// 	{_id:8, name:"Susan",age:16,createdAt: '2013-10-31',score: 0.03343},
			// 	{_id:9, name:"Chris",age:55,createdAt: '2012-10-31',score: 0.03343},
			// 	{_id:10, name:"Dan",age:40,createdAt: '2011-10-31',score: 0.03343},
			// 	{_id:11, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
			// 	{_id:12, name:"Jane",age:24,createdAt: '2011-07-31',score: 0.03343},
			// 	{_id:13, name:"Susan",age:16,createdAt: '2017-02-28',score: 0.03343},
			// 	{_id:14, name:"Chris",age:55,createdAt: '',score: 0.03343},
			// 	{_id:15, name:"Dan",age:40,createdAt: '2011-10-31',score: 0.03343},
			// 	{_id:19, name:"Chris",age:55,createdAt: '2011-10-31',score: 0.03343},
			// 	{_id:20, name:"Dan",age:40,createdAt: '2011-10-31',score: 0.03343},
			// ],
			rows: [],
		}
	},
	mounted() {
		axios.get(`https://seemba-api.herokuapp.com/api/dashboard/v1/editors/` + JSON.parse(localStorage.getItem('user')).team)
		.then(response => {			
			this.rows = response.data.data
			})
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

