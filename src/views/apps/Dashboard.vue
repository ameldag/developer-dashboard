<template>
	<vue-scroll class="page-dashboard">
		
		
		<resize-observer @notify="__resizeHanlder" />

		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
						
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-multiple accent-text fs-60"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up success-text mr-10"></i><strong class="accent-text">{{ this.$store.state.analytics.game_played_monthly_percentage }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Played Duels This Month</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.game_played_monthly }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-plus-outline accent-text fs-60"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up success-text mr-10"></i><strong class="accent-text">{{ this.$store.state.analytics.percentage_of_new_installs }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Installs</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.new_installs }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-convert success-text fs-60"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-neutral info-text mr-10"></i><strong class="success-text">{{ this.$store.state.analytics.percentage_arpdu }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Seemba ARPDU</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.arpdu }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cash-multiple success-text fs-60"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-neutral info-text mr-10"></i><strong class="success-text">{{ this.$store.state.analytics.percentage_revenue }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Estimated Revenue</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.revenue }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>



		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium bg-accent p-20 " style="height:400px" v-loading="!asyncChart1">
					<h1 class="white-text mv-0 animated fadeInDown">NET INCOME</h1>
					<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">Total. {{ this.$store.state.analytics.monthly_income }}</h3>
					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: "77%", fill: ["#56f19a"] }' :data="this.$store.state.analytics.monthly_income_chart[1].toString()"/>
				</div>
			</el-col>
		</el-row>

		

		<el-row class="mt-30 mb-15" :gutter="30">
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-finance success-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">All Tournaments</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.all_tournaments }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#991FE3"] }' :data="this.$store.state.analytics.all_tournaments_chart.toString()"/>
					
				</div>
			</el-col>
			
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-poll-box success-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Free Tournaments</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.free_tournaments }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80 }' :data="this.$store.state.analytics.free_tournaments_chart.toString()"/>
					
				</div>
			</el-col>
			
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cash-multiple success-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Cash Tournaments</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.cash_tournaments }}</h2>
								<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#56f19a"] }' :data="this.$store.state.analytics.cash_tournaments_chart.toString()"/>
							</div>
						</div>
					</div>

					
				</div>
			</el-col>





		</el-row>



		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
				<div class="card-base card-shadow--medium bg-danger p-20" style="height:530px" v-loading="!asyncChart1">
					<h1 class="white-text mv-0 animated fadeInDown">Recurring Users</h1>
					<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">Returning and new users</h3>
					<peity :type="'pie'" :options="{  width: '100%', height:'80%',  'radius': 40 }" :data="[$store.state.analytics.new_monthly,$store.state.analytics.returning_monthly].toString()"></peity>
					<!-- <div id="piechart" style="height:300px; width:100%"></div> -->
				</div>
			</el-col>

			

			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-finance success-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">All Challenges</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.all_challenges }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#fe5000"] }' :data="this.$store.state.analytics.all_challenges_chart.toString()"/>
					
				</div>
			</el-col>
			
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-poll-box success-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Free Challenges</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.free_challenges }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#74d2e7"] }' :data="this.$store.state.analytics.free_challenges_chart.toString()"/>
					
				</div>
			</el-col>
			
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cash-multiple success-text fs-30"></i>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Cash Challenges</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.analytics.cash_challenges }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#7d3f98"] }' :data="this.$store.state.analytics.cash_challenges_chart.toString()"/>
					
				</div>
			</el-col>
		</el-row>


	
	</vue-scroll>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
	name: 'Dashboard',
	data () {
		return {
			played_games: 0,
			played_percentage: 0,
			percentage_of_new_installs: 0,
			new_installs: 0,
			percentage_arpdu: 0,
			arpdu: 0,
			percentage_revenue: 0,
			revenue: 0,

			all_tournaments: 0,
			all_tournaments_chart: [],
			free_tournaments: 0,
			free_tournaments_chart: [],
			cash_tournaments: 0,
			free_tournaments_chart: [],

			all_challenges: 0,
			free_challenges: 0,
			cash_challenges: 0,

			asyncComponent: 'peity',
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
		}
	},
	methods: {
		getChart1datax() {
			axios.post(this.$APIPATH + `/analytics/net-income-monthly/` + localStorage.getItem("current_team"))
			.then(response => {
				console.log(response.data.data.chart[0])
				return response.data.data.chart[0]
				})
		},
		getChart1datay() {
			axios.post(this.$APIPATH + `/analytics/net-income-monthly/` + localStorage.getItem("current_team"))
			.then(response => {
				console.log(response.data.data.chart[1])
				return response.data.data.chart[1]
				})
		},
		__resizeHanlder: _.throttle(function (e) {
			if(this.resized) {			

				this.asyncComponent = null
				this.removePeity()
				setTimeout(()=>{this.asyncComponent = 'peity'}, 1000)
		
				this.asyncChart1 = false
				this.asyncChart2 = false
				setTimeout(()=>{this.asyncChart1 = true; this.resizeChart1()}, 1000)
				setTimeout(()=>{this.asyncChart2 = true; this.resizeChart2()}, 2500)
			}
			this.resized = true
		}, 700),
		removePeity() {
			const peityEl = document.querySelectorAll('.widget .peity')//.forEach((el)=>{el.remove()})
			//ie fix
			for(let i=0; i<peityEl.length; i++) {peityEl[i].parentNode.removeChild(peityEl[i])}
		},
		initChart1() {
			this.chart1 = echarts.init(document.getElementById('chart1'))

			// Generate data
			// let category = [];
			let dottedBase = +new Date();
			let lineData = [];
			let barData = [];

			for (let i = 0; i < 6; i++) {
				let date = new Date(dottedBase += 3600 * 24 * 1000);
				// category.push([
				// 	date.getFullYear(),
				// 	date.getMonth() + 1,
				// 	date.getDate()
				// ].join('-'));
				let b = Math.random() * 200;
				let d = Math.random() * 200;

				barData.push(parseInt(b))
				// lineData.push(parseInt(d + b));
			}


			this.chart1.setOption({
				//backgroundColor: '#0f375f',
				grid: {
					show: false,
					left: '20px',
					right: '50px',
					bottom: '20px',
					top: '20px',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				legend: {
					show: false,
					data: ['line', 'bar'],
					textStyle: {
						color: '#ccc'
					}
				},
				xAxis: {
					data: this.getChart1datax(),
					boundaryGap : false,
					axisLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.5)'
						}
					}
				},
				yAxis: {
					splitLine: {show: false},
					axisLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.5)'
						}
					}
				},
				series: [
					{
						name: 'Data A',
						type: 'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#fff'
						},
						itemStyle: {
							color: '#fff', 
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
						data: this.getChart1datay(),
					},
					{
						name: 'Data A',
						type: 'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#fff'
						},
						itemStyle: {
							color: '#fff', 
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
						data: this.getChart1datay(),
					}
				]
			})
		},
		destroyChart1() {
			if(this.chart1) {
				this.chart1.dispose()
				this.chart1 = null
			}
		},

	},
	async mounted() {
		if(localStorage.getItem('token')) {
			await this.$store.dispatch("session/getMe", localStorage.getItem('token'))
		}
		let data = {
			token : localStorage.getItem("token"),
			id : localStorage.getItem("current_team")
		}

		//played duels this month
		this.$store.dispatch("analytics/game_played_monthly", data)

		//seemba installs this month
		this.$store.dispatch("analytics/newInstalls", data)

		//seemba ARPDU this month
		this.$store.dispatch("analytics/ARPDU", data)

		//seemba revenue this month
		this.$store.dispatch("analytics/revenue", data)

		this.$store.dispatch("analytics/allTournaments", data)

		this.$store.dispatch("analytics/freeTournaments", data)

		this.$store.dispatch("analytics/cashTournaments", data)

		this.$store.dispatch("analytics/allChallenges", data)

		this.$store.dispatch("analytics/freeChallenges", data)

		this.$store.dispatch("analytics/cashChallenges", data)

		this.$store.dispatch("analytics/netIncomeMonthly", data)

		this.$store.dispatch("analytics/newReturningMonthly", data)

		// axios.post(this.$APIPATH + `/analytics/net-income-monthly/` + localStorage.getItem("current_team"))
		// .then(response => {
		// 	this.category = response.data.data.chart[0]
		// 	// this.chart1.setOption.xAxis.data = response.data.data.chart[0]
		// 	this.lineData = response.data.data.chart[1]
		// 	console.log(chart1.setOption)
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/all-tournaments-weekly/` + localStorage.getItem("current_team"))
		// .then(response => {
		// 	this.all_tournaments = response.data.data.total
		// 	this.all_tournaments_chart = response.data.data.chart
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/free-tournaments-weekly/` + localStorage.getItem("current_team"))
		// .then(response => {
		// 	this.free_tournaments = response.data.data.total
		// 	this.free_tournaments_chart = response.data.data.chart
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/cash-tournaments-weekly/` + localStorage.getItem("current_team"))
		// .then(response => {
		// 	this.cash_tournaments = response.data.data.total
		// 	this.cash_tournaments_chart = response.data.data.chart
		// 	})

			
		// // Duels
		// axios.post(this.$APIPATH + `/analytics/all-challenges-weekly/` + localStorage.getItem("current_team"))
		// .then(response => {
		// 	this.all_challenges = response.data.data.total
		// 	this.all_challenges_chart = response.data.data.chart
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/free-challenges-weekly/` + localStorage.getItem("current_team"))
		// .then(response => {
		// 	this.free_challenges = response.data.data.total
		// 	this.free_challenges_chart = response.data.data.chart
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/cash-challenges-weekly/` + localStorage.getItem("current_team"))
		// .then(response => {
		// 	this.cash_challenges = response.data.data.total
		// 	this.cash_challenges_chart = response.data.data.chart
		// 	})
	},
	beforeDestroy() {
	},
	components: {
		Timeline,
		TimelineItem,
		TimelineTitle
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

</style>

<style lang="scss">
.page-dashboard {}

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

	
}
</style>


