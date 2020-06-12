<template>
	<div class="page-vue-good-table scrollable only-y">
		<div class="vue-good-table-box card-base card-shadow--medium">
			<vue-good-table
				:columns="columns"
				:rows="this.assets"
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
						<span v-if="props.row.game_status == 'Finished'">
							<el-button type="success" class="text-truncate" round>{{ props.row.game_status }}</el-button>
						</span>
						<span v-else>
							<el-button type="warning" class="text-truncate" round>{{ props.row.game_status }}</el-button>
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
	name: 'Resources',
	data() {
		return {
			columns: [
				{
					label: 'Engine',
					field: 'engine',
					filterable: false,
				},
				{
					label: 'Version',
					field: 'version',
					filterable: true,
				},
				{
					label: 'Description',
					field: 'description',
					html: false,
					filterable: true,
				},
				{
					label: 'Changelog',
					field: 'changelog',
					type: 'string'
				},
				{
					label: 'Link',
					field: 'link',
					html: false,
				},
			],
		}
	},
	computed: {
		...mapState('resources', ['assets']),
	},
	async mounted(){
		await this.retreiveAssets()
	},
	methods: {
		...mapActions('resources', ['retreiveAssets',]),
	}
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';

.page-vue-good-table {
	overflow: hidden;
}

.resources-page {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0 !important;

	.side-box {
		.wrapper {
			width: 100%;
			box-sizing: border-box;
			padding: 20px;
		}
	}

	.box-left {
		background: $background-color;
		color: var(--background-color);

		.wrapper {
			.card-base{
				.logo-unity {
					width: 100px;
					height: 100px;
				}
			}

		}
	}
	.box-right {
		background: $background-color;
		color: var(--background-color);
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;
		//background: transparent;

		a {
			font-size: 14px;
			color: $text-color-accent;
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 80px;
			margin: 0px auto;
			margin-bottom: 70px;
			display: block;
		}

		.login-btn {
			background: rgba(var(--color-accent-rgb), .2);
			color: var( --text-color);
			border-color: var(--text-color);
			border-width: 2px;
			font-weight: bold;
			border-radius: 0;

			&:hover {
				background: rgba(var(--color-accent-rgb), 1);
				border-color: var(--text-color);
				color: var( --text-color);
			}
		}

		.login-box {
			font-size: 14px;
		}
	}
}

@media (max-width: 1200px) {
.resources-page {
	.box-left {
		.wrapper {
			.h-big {
				font-size: 50px;
			}
		}
	}
}
}
@media (max-width: 900px) {
.resources-page {
	.box-left {
		.wrapper {
			.h-big {
				font-size: 30px;
			}
		}
	}
}
}
@media (max-width: 768px) {
.resources-page {
	display: block;
	overflow: auto;
	
	.side-box {
		display: block;
	}
}
}
</style>

<style scoped>
.el-button{
	background: transparent;
	border-color: transparent;
}.el-button.is-disabled:hover, .el-button.is-disabled:focus {
	background: transparent;
	border-color: transparent;
    cursor: not-allowed;
}
</style>