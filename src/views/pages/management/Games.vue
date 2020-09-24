<template>
	<div class="page-vue-good-table scrollable only-y">
		<div class="page-header">
			<h1>{{ $t('gamesPage.Manage_your_revenue') }}</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-gamepad-right"></i></el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('Management') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('Games') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('List') }}</el-breadcrumb-item>
			</el-breadcrumb>
			<el-button type="primary" class="text-truncate add-button" @click="addGamePage" >{{ $t('gamesPage.new_game_button') }}</el-button>
		</div>

		<div class="vue-good-table-box card-base card-shadow--medium">
			<vue-good-table v-loading="loadingTableData"
				:columns="columns"
				:rows="this.games"
				:search-options="{
					enabled: false,
					placeholder: 'Search this table'
				}"
				:pagination-options="{
					enabled: true,
					mode: 'records',
					perPage: 10,
					perPageDropdown: [10, 20, 30, 40, 50],
					nextLabel: $t('pagination_option.nextLabel'),
					prevLabel: $t('pagination_option.prevLabel'),
					rowsPerPageLabel: $t('pagination_option.rowsPerPageLabel'),
					ofLabel: $t('pagination_option.ofLabel'),
					pageLabel: $t('pagination_option.pageLabel'), // for 'pages' mode
					allLabel: $t('pagination_option.allLabel'),
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
						<span>{{moment(props.row.createdAt).format('YYYY/MM/DD')}}</span>
					</span>
					
					<span v-else-if="props.column.field == 'name'">
						<el-button type="text" class="text-truncate" @click="GameProfile(props.row._id)">{{ props.row.name }}</el-button>
					</span>
					
					<span v-else-if="props.column.field == 'game_status'">
						<span v-if="props.row.game_status == 'Running'">
							<el-button type="success" class="text-truncate" round>{{ props.row.game_status }}</el-button>
						</span>
						<span v-else-if="props.row.game_status == 'Finished'">
							<el-button type="warning" class="text-truncate" round>{{ props.row.game_status }}</el-button>
						</span>
						<span v-else>
							<el-button type="danger" class="text-truncate" round>{{ props.row.game_status }}</el-button>
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
import { mapState, mapActions } from 'vuex'

export default {
	name: 'Games',
	data(){
		return {
			loadingTableData: true,
			columns: [
				{
					label: this.$i18n.t('gamesPage.icon_label'),
					field: 'icon',
					filterable: false,
				},
				{
					label: this.$i18n.t('gamesPage.app_name_label'),
					field: 'name',
					filterable: true,
				},
				{
					label: this.$i18n.t('gamesPage.game_id_label'),
					field: '_id',
					html: false,
					filterable: true,
				},
				{
					label: this.$i18n.t('gamesPage.created_label'),
					field: 'createdAt',
					type: 'string'
				},
				{
					label: this.$i18n.t('gamesPage.status_label'),
					field: 'game_status',
					html: false,
				},
			],
		}
	},
	computed: {
		...mapState('games', ['games'])
	},
    methods: {
		...mapActions('games', ['getGames']),

        GameProfile(id){
			this.$router.replace('/games/' + id);
        },

		addGamePage(){
			this.$router.replace('/games/new');
		}
    },
	beforeMount() {
		this.loadingTableData = true;
	},
	async mounted() {
		await this.getGames()
		console.log(this.games[0])
		this.loadingTableData= false;
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';
.page-vue-good-table {
	overflow: hidden;
}

.app-icon {
	height: 40px;
	width: 40px;
	object-fit: cover;
	border-radius: 5px;
}

.add-button{
	float:right;
}

.card-date {
	-webkit-box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
	box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
	background-color: $card-background-color;
    border-radius: 5px;
	overflow: hidden;
	margin: 10px 0px;
	padding: 10px 20px;
	font-weight: 900;
}

@media (max-width: 768px) {
	.add-button{
		float:left;
	}
	
}
</style>

