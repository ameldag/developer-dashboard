<template>
	<div class="page-vue-good-table scrollable only-y">
		<div class="page-header">
			<h1>Manage your promotions</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-gamepad-right"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Management</el-breadcrumb-item>
				<el-breadcrumb-item>Promotions</el-breadcrumb-item>
				<el-breadcrumb-item>List</el-breadcrumb-item>
			</el-breadcrumb>
			<button class="el-button el-button--primary" style="float:right;" @click="addPromotionPage" >Create Promotion</button>
		</div>

		<div class="vue-good-table-box card-base card-shadow--medium">
			<vue-good-table
				:columns="columns"
				:rows="this.$store.state.promotion.promotions"
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
						<span v-if="props.row.game.icon">
							<img v-bind:src="props.row.game.icon" alt="icon" class="icon">
						</span>
						<span v-else>
							<img src="http://via.placeholder.com/300x300" alt="icon" class="icon">
						</span>
					</span>
					
					<span v-else-if="props.column.field == 'created_at'">
						<span class="card-date-promotions">{{moment(props.row.created_at).format('YYYY-MM-DD')}}</span>
					</span>
					
					<span v-else-if="props.column.field == 'start_date'">
						<span class="card-date-promotions">{{moment(props.row.start_date).format('YYYY-MM-DD')}}</span>
					</span>
					
					<span v-else-if="props.column.field == 'end_date'">
						<span class="card-date-promotions">{{moment(props.row.end_date).format('YYYY-MM-DD')}}</span>
					</span>
					
					<span v-else-if="props.column.field == 'promotion_name'">
						<button class="el-button el-button--primary is-plain" @click="goToPromotion(props.row._id)">{{ props.row.promotion_name }}</button>
					</span>
					
					<span v-else-if="props.column.field == 'channels'">
                        <span v-for="game in props.row.channels" class="el-tag" >{{ game.name }}</span>
					</span>
					
					<span v-else-if="props.column.field == 'status'">
						<span v-if="props.row.status == 'running'">
                            <button type="button" class="el-button el-button--success is-circle">
                                <i class="el-icon-check"></i>
                            </button>
						</span>
						<span v-else>
                            <button type="button" class="el-button el-button--danger is-circle">
                                <i class="el-icon-check"></i>
                            </button>
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
	name: 'Promotions',
	data(){
		return {
			columns: [
				{
					label: 'Icon',
					field: 'icon',
					filterable: false,
				},
				{
					label: 'Name',
					field: 'promotion_name',
					html: true,
					filterable: true,
				},
				{
					label: 'Game',
					field: 'game.name',
					filterable: true,
				},
				{
					label: 'Featured In',
					field: 'channels',
					filterable: true,
				},
				{
					label: 'Status',
					field: 'status',
					html: false,
					filterable: true,
				},
				{
					label: 'Reach',
					field: 'reach_count',
					html: false,
					filterable: true,
				},
				{
					label: 'Starts At',
					field: 'start_date',
					type: 'string'
				},
				{
					label: 'Ends At',
					field: 'end_date',
					type: 'string'
				},
			],
		}
    },
    methods: {
        goToPromotion(id){
			this.$router.replace('/promotions/' + id);
        },

		addPromotionPage(){
			this.$router.replace('/promotions/new');
		}
    },
	mounted() {

		let data = {
			token : localStorage.getItem("token"),
			id : localStorage.getItem("current_team")
		}

		this.$store.dispatch("promotion/getPromotions", data)

	}
}
</script>

<style lang="scss">
.page-vue-good-table {
	overflow: hidden;
}

.icon {
	height: 40px;
	width: 40px;
	object-fit: cover;
	border-radius: 10px;
}

.card-date-promotions {
	// -webkit-box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
	// box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
	// background-color: #fff;
    // border-radius: 5px;
	// overflow: hidden;
	// margin: 10px 0px;
	// padding: 10px 20px;
	// font-weight: 900;
}
</style>

