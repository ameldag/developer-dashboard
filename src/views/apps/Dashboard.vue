<template>
	<vue-scroll class="page-dashboard">

		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!loadingChart">
						
					<div class="widget-header ph-20 pt-20 pb-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-multiple accent-text fs-60"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up accent-text mr-10"></i><strong class="accent-text">{{ this.$store.state.analytics.game_played_monthly_percentage }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="m-0 widget-title text-truncate pt-5 pb-10" title="Played Duels This Month">Played Duels This Month</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.game_played_monthly }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!loadingChart">

					<div class="widget-header ph-20 pt-20 pb-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-plus-outline accent-text fs-60"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up accent-text mr-10"></i><strong class="accent-text">{{ this.$store.state.analytics.percentage_of_new_installs }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="m-0 widget-title text-truncate pt-5 pb-10" title="Installs">Installs</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.new_installs }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!loadingChart">

					<div class="widget-header ph-20 pt-20 pb-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-convert accent-text fs-60"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up accent-text mr-10"></i><strong class="accent-text">{{ this.$store.state.analytics.percentage_arpdu }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="m-0 widget-title text-truncate pt-5 pb-10" title="Seemba ARPDU">Seemba ARPDU</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.arpdu }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!loadingChart">

					<div class="widget-header ph-20 pt-20 pb-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cash-multiple accent-text fs-60"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up accent-text mr-10"></i><strong class="accent-text">{{ this.$store.state.analytics.percentage_revenue }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="m-0 widget-title text-truncate pt-5 pb-10" title="Estimated Revenue">Estimated Revenue</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.revenue }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>



		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium bg-gradiant p-20 " style="height:400px" v-loading="!loadingChart">
					<h1 class="white-text mv-0 animated fadeInDown" title="NET INCOME">NET INCOME</h1>
					<h3 class="mt-0 mb-40 white-text m-0 animated slideInUp">Total. {{ this.$store.state.analytics.monthly_income }}</h3>					
					<TrendChart
						v-if="netIncome ? netIncome.length : false "
						width="100%"
						height="65%"
						:datasets="[
							{
							data: netIncome,
							smooth: true,
							fill: true,
							showPoints: true,
							className: 'income-chart'
							}
						]"
						:grid="{
							verticalLines: true,
							horizontalLines: true
						}"
						:labels="{
							xLabels: netIncomeLabels,
							yLabels: 15,
							yLabelsTextFormatter: val => Math.round(val)
						}"
						:min="0">
					</TrendChart>
				</div>
			</el-col>
		</el-row>

		

		<el-row class="mt-30 mb-15" :gutter="30">
			<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!loadingChart">

					
					<div class="widget-header ph-20 pt-20 pb-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-finance accent-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="m-0 widget-title text-truncate pt-5 pb-10" title="All Tournaments">All Tournaments</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.all_tournaments }}</h2>
							</div>
						</div>
					</div>
					<TrendChart
						v-if="all_tournaments_chart ? all_tournaments_chart.length : false "
						:datasets="[
							{
							data: all_tournaments_chart,
							smooth: true,
							fill: true,
							showPoints: true
							}
						]"
						:grid="{
							verticalLines: true,
							horizontalLines: true
						}"
						:labels="{
							xLabels: this.$store.state.analytics.labels,
							yLabels: 5
						}"
						:min="0">
					</TrendChart>
					
				</div>
			</el-col>
			
			<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!loadingChart">

					
					<div class="widget-header ph-20 pt-20 pb-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-poll-box accent-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="m-0 widget-title text-truncate pt-5 pb-10" title="Free Tournaments">Free Tournaments</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.free_tournaments }}</h2>
							</div>
						</div>
					</div>
					<TrendChart
						v-if="free_tournaments_chart ? free_tournaments_chart.length : false "
						:datasets="[
							{
							data: free_tournaments_chart,
							smooth: true,
							fill: true,
							showPoints: true
							}
						]"
						:grid="{
							verticalLines: true,
							horizontalLines: true
						}"
						:labels="{
							xLabels: this.$store.state.analytics.labels,
							yLabels: 5
						}"
						:min="0">
					</TrendChart>
					
				</div>
			</el-col>
			
			<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!loadingChart">

					
					<div class="widget-header ph-20 pt-20 pb-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cash-multiple accent-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="m-0 widget-title text-truncate pt-5 pb-10" title="Cash Tournaments">Cash Tournaments</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.cash_tournaments }}</h2>
							</div>
						</div>
					</div>
					<TrendChart
						v-if="cash_tournaments_chart ? cash_tournaments_chart.length : false "
						:datasets="[
							{
							data: cash_tournaments_chart,
							smooth: true,
							fill: true,
							showPoints: true
							}
						]"
						:grid="{
							verticalLines: true,
							horizontalLines: true
						}"
						:labels="{
							xLabels: this.$store.state.analytics.labels,
							yLabels: 5
						}"
						:min="0">
					</TrendChart>
				</div>
			</el-col>

<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
					<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!loadingChart">

						
						<div class="widget-header ph-20 pt-20 pb-20">
							<div class="flex justify-center align-center">
								<div class="widget-icon-box mr-20 animated fadeInRight">
									<i class="widget-icon mdi mdi-finance accent-text fs-30"></i>
								</div>
								<div class="widget-info box grow text-truncate animated fadeInLeft">
									<div class="m-0 widget-title text-truncate pt-5 pb-10" title="All Challenges">All Challenges</div>
									<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.all_challenges }}</h2>
								</div>
							</div>
						</div>
						<TrendChart
							v-if="all_challenges_chart ? all_challenges_chart.length : false "
							:datasets="[
								{
								data: all_challenges_chart,
								smooth: true,
								fill: true,
								showPoints: true
								}
							]"
							:grid="{
								verticalLines: true,
								horizontalLines: true
							}"
							:labels="{
								xLabels: this.$store.state.analytics.labels,
								yLabels: 5
							}"
							:min="0">
						</TrendChart>
						
					</div>
				</el-col>
				
				<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
					<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!loadingChart">

						
						<div class="widget-header ph-20 pt-20 pb-20">
							<div class="flex justify-center align-center">
								<div class="widget-icon-box mr-20 animated fadeInRight">
									<i class="widget-icon mdi mdi-poll-box accent-text fs-30"></i>
								</div>
								<div class="widget-info box grow text-truncate animated fadeInLeft">
									<div class="m-0 widget-title text-truncate pt-5 pb-10" title="Free Challenges">Free Challenges</div>
									<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.free_challenges }}</h2>
								</div>
							</div>
						</div>

						<TrendChart
							v-if="free_challenges_chart ? free_challenges_chart.length : false "
							:datasets="[
								{
								data: free_challenges_chart,
								smooth: true,
								fill: true,
								showPoints: true
								}
							]"
							:grid="{
								verticalLines: true,
								horizontalLines: true
							}"
							:labels="{
								xLabels: this.$store.state.analytics.labels,
								yLabels: 5
							}"
							:min="0">
						</TrendChart>
					</div>
				</el-col>
				
				<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
					<div class="card-base card-shadow--medium widget small-widget" v-loading="!loadingChart">

						
						<div class="widget-header ph-20 pt-20 pb-20">
							<div class="flex justify-center align-center">
								<div class="widget-icon-box mr-20 animated fadeInRight">
									<i class="widget-icon mdi mdi-cash-multiple accent-text fs-30"></i>
								</div>
								<div class="widget-info box grow text-truncate animated fadeInLeft">
									<div class="m-0 widget-title text-truncate pt-5 pb-10" title="Cash Challenges">Cash Challenges</div>
									<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.cash_challenges }}</h2>
								</div>
							</div>
						</div>
						<TrendChart
							v-if="cash_challenges_chart ? cash_challenges_chart.length : false "
							:datasets="[
								{
								data: cash_challenges_chart,
								smooth: true,
								fill: true,
								showPoints: true
								}
							]"
							:grid="{
								verticalLines: true,
								horizontalLines: true
							}"
							:labels="{
								xLabels: this.$store.state.analytics.labels,
								yLabels: 5
							}"
							:min="0">
						</TrendChart>
						
					</div>
				</el-col>



		</el-row>



		<el-row class="mt-30 mb-15" :gutter="30">
		 
			<!--<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
				<div class="card-base card-shadow--medium bg-gradiant p-20" style="height:100%; box-sizing: border-box;" v-loading="!loadingChart">
					<h1 class="white-text mv-0 animated fadeInDown">Recurring Users</h1>
					<h3 class="mt-0 mb-40 white-text m-0 animated slideInUp" title="Returning and new users">Returning and new users</h3>
					<peity :type="'pie'" :options="{  width: '100%', height:'80%',  'radius': 40 }" :data="[$store.state.analytics.new_monthly,$store.state.analytics.returning_monthly].toString()"></peity>
				</div>
			</el-col>-->

			
			<!--<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="padding-left: 0px;padding-right: 0px;">-->
				
			<!--</el-col>-->
		</el-row>


	
	</vue-scroll>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
	name: 'Dashboard',
	data () {
		return {

			loadingChart: false,
			asyncChart1: true,
			asyncChart2: true,
			chart1: null,
			chart2: null,
			category: [],
			lineData: [],
			resized: false,
		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		},
		   ...mapState({
			netIncome: state => state.analytics.monthly_income_chart[1],
			netIncomeLabels: state => state.analytics.monthly_income_chart[0],
			all_tournaments_chart: state => state.analytics.all_tournaments_chart,
			free_tournaments_chart: state => state.analytics.free_tournaments_chart,
			cash_tournaments_chart: state => state.analytics.cash_tournaments_chart,
			all_challenges_chart: state => state.analytics.all_challenges_chart,
			free_challenges_chart: state => state.analytics.free_challenges_chart,
			cash_challenges_chart: state => state.analytics.cash_challenges_chart,

			})
	},

	methods: {
		...mapActions('analytics', ['game_played_monthly', 'newInstalls', 'ARPDU', 'revenue', 'allTournaments', 
									'freeTournaments', 'cashTournaments', 'allChallenges', 'freeChallenges', 
									'cashChallenges', 'netIncomeMonthly', 'newReturningMonthly'])
	},
	async mounted() {
		this.loadingChart = false
		
		//played duels this month
		await this.game_played_monthly()

		//seemba installs this month
		await this.newInstalls()

		//seemba ARPDU this month
		await this.ARPDU()

		//seemba revenue this month
		await this.revenue()

		await this.allTournaments()

		await this.freeTournaments()

		await this.cashTournaments()

		await this.allChallenges()

		await this.freeChallenges()

		await this.cashChallenges()

		await this.netIncomeMonthly()

		await this.newReturningMonthly()

		
		this.$store.commit('setSplashScreen', false)
		this.loadingChart = true
	},
	beforeDestroy() {
	},
	components: {
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

</style>

<style lang="scss">
.page-dashboard {
	.bg-gradiant {
		background: linear-gradient(45deg,slateblue 0,darkturquoise 100%);
		height: 100vh;
	}
}

.peity {
	margin-bottom: -7px;
}

@media (max-width: 768px) {
	.page-dashboard {
		.vb-content {
			padding: 0 5px !important;
			margin: -5px;
			width: calc(100% + 10px) !important;
		}
	}
	.x-labels .label text {
		font-size: 9px;
	}

	.y-labels .label text {
		font-size: 9px;
	}

	
}
</style>


