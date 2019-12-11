<template>
	<div class="page-vue-good-table scrollable only-y">
		<div class="page-header">
			<h1>Manage your games</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-gamepad-right"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Management</el-breadcrumb-item>
				<el-breadcrumb-item>Games</el-breadcrumb-item>
				<el-breadcrumb-item>List</el-breadcrumb-item>
			<button class="el-button el-button--primary" style="float:right;" @click="addGamePage" >Add new game</button>
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
					<span v-if="props.column.field == 'icon'">
						<span v-if="props.row.icon">
							<img v-bind:src="props.row.icon" alt="icon" class="app-icon">
						</span>
						<span v-else>
							<img src="http://via.placeholder.com/300x300" alt="icon" class="app-icon">
						</span>
					</span>
					
					<span v-else-if="props.column.field == 'createdAt'">
						<span class="card-date">{{moment(props.row.createdAt).format('YYYY-MM-DD')}}</span>
					</span>
					
					<span v-else-if="props.column.field == 'name'">
						<button class="el-button el-button--primary is-plain" @click="GameProfile(props.row._id)">{{ props.row.name }}</button>
					</span>
					
					<span v-else-if="props.column.field == 'game_status'">
						<span v-if="props.row.game_status == 'Finished'">
							<button class="el-button el-button--success is-round">{{ props.row.game_status }}</button>
						</span>
						<span v-else>
							<button class="el-button el-button--warning is-round">{{ props.row.game_status }}</button>
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
					label: 'App Icon',
					field: 'icon',
					filterable: false,
				},
				{
					label: 'App Name',
					field: 'name',
					filterable: true,
				},
				{
					label: 'Game Id',
					field: '_id',
					html: false,
					filterable: true,
				},
				{
					label: 'Created On',
					field: 'createdAt',
					type: 'string'
				},
				{
					label: 'Status',
					field: 'game_status',
					html: false,
				},
			],
			rows: [],
		}
	},
    methods: {
        GameProfile(id){
			this.$router.replace('/games/' + id);
        },

		addGamePage(){
			this.$router.replace('/games/new');
		}
    },
	mounted() {
		let data = {
			token : localStorage.getItem("token"),
			id : localStorage.getItem("current_team")
		}
		this.$store.dispatch("games/getGames", data).then((res) => {
			this.rows = this.$store.getters['games/games']
		});
		
	}
}
</script>

<style lang="scss">
.page-vue-good-table {
	overflow: hidden;
}

.app-icon {
	height: 40px;
	width: 40px;
	object-fit: cover;
	border-radius: 5px;
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

