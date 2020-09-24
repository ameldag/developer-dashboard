<template>
	<div class="page-vue-good-table scrollable only-y">
		<div class="page-header">
			<h1>{{ $t('promotionsPage.Manage_your_promotions') }}</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-gamepad-right"></i></el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('Management') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('Promotions') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('List') }}</el-breadcrumb-item>
			</el-breadcrumb>
			<el-button type="primary" class="text-truncate add-button" @click="addPromotionPage" >Create Promotion</el-button>
		</div>

		<div class="vue-good-table-box card-base card-shadow--medium">
			<vue-good-table v-loading="loadingTableData"
				v-if="this.promotions ? this.promotions.length : false "
				:columns="columns"
				:rows="this.promotions"
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
						<span v-if="props.row.game.icon">
							<img v-bind:src="props.row.game.icon" alt="icon" class="icon">
						</span>
						<span v-else>
							<img src="http://via.placeholder.com/300x300" alt="icon" class="icon">
						</span>
					</span>
					
					<span v-else-if="props.column.field == 'createdAt'">
						<span>{{moment(props.row.createdAt).format('YYYY/MM/DD')}}</span>
					</span>
					
					<span v-else-if="props.column.field == 'start_date'">
						<span>{{moment(props.row.start_date).format('YYYY/MM/DD')}}</span>
					</span>
					
					<span v-else-if="props.column.field == 'end_date'">
						<span>{{moment(props.row.end_date).format('YYYY/MM/DD')}}</span>
					</span>
					
					<span v-else-if="props.column.field == 'promotion_name'">
						<el-button type="text" class="text-truncate" @click="goToPromotion(props.row._id)">{{ props.row.promotion_name }}</el-button>
					</span>
					
					<span v-else-if="props.column.field == 'channels'">
                        <span v-for="game in props.row.channels" :key="game._id" class="el-tag mr-5" >{{ game.name }}</span>
					</span>
					
					<span v-else-if="props.column.field == 'status'">
						<span v-if="props.row.status == 'running'">
                            <el-button type="success" icon="el-icon-check" circle></el-button>
						</span>
						<span v-else>
                            <el-button type="danger" icon="el-icon-check" circle></el-button>
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
import { mapActions, mapState } from 'vuex'
export default {
	name: 'Promotions',
	data(){
		return {
			loadingTableData: true,
			columns: [
				{
					label: this.$i18n.t('promotionsPage.icon_label'),
					field: 'icon',
					filterable: false,
				},
				{
					label: this.$i18n.t('promotionsPage.name_label'),
					field: 'promotion_name',
					html: true,
					filterable: true,
				},
				{
					label: this.$i18n.t('promotionsPage.game_label'),
					field: 'game.name',
					filterable: true,
				},
				{
					label: this.$i18n.t('promotionsPage.featured_in_label'),
					field: 'channels',
					filterable: true,
				},
				{
					label: this.$i18n.t('promotionsPage.status_label'),
					field: 'status',
					html: false,
					filterable: true,
				},
				{
					label: this.$i18n.t('promotionsPage.reach_label'),
					field: 'reach_count',
					html: false,
					filterable: true,
				},
				{
					label: this.$i18n.t('promotionsPage.start_date_label'),
					field: 'start_date',
					type: 'string'
				},
				{
					label: this.$i18n.t('promotionsPage.end_date_label'),
					field: 'end_date',
					type: 'string'
				},
			],
		}
	},
	computed:{
		...mapState('promotion', ['promotions']),
	},
    methods: {
		...mapActions('promotion', ['getPromotions']),

        goToPromotion(id){
			this.$router.replace('/promotions/' + id);
        },

		addPromotionPage(){
			this.$router.replace('/promotions/new');
		}
    },
	async mounted() {
		this.loadingTableData = true;
		await this.getPromotions()
		this.loadingTableData = false
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

.add-button{
	float:right;
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

@media (max-width: 768px) {
	.add-button{
		float:left;
	}
	
}
</style>

