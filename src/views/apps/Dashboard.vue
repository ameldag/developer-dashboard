<template>
	<vue-scroll class="page-dashboard">
		
		
		<resize-observer @notify="__resizeHanlder" />

		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
						
					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-multiple accent-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up success-text mr-10"></i><strong class="accent-text">{{ played_percentage }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Played Duels This Month</div>
								<h2 class="m-0 text-truncate">{{ played_games }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'line'" :options='{ width: "100%", height: 80 }' :data="[1, 3, 2, 4, 4, 9, 3, 4, 6, 5, 4, 6, 9, 8, 11, 12, 13, 12, 12, 14].toString()"/>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-plus-outline accent-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up success-text mr-10"></i><strong class="accent-text">{{ percentage_of_new_installs }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Installs</div>
								<h2 class="m-0 text-truncate">{{ new_installs }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#c6d9fd"] }' :data="[1, 3, 2, 4, 4, 9, 3, 4, 6, 5, 4, 6, 9, 8, 7, 6, 5, 12, 10, 9].toString()"/>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-convert success-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-neutral info-text mr-10"></i><strong class="success-text">{{ percentage_arpdu }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Seemba ARPDU</div>
								<h2 class="m-0 text-truncate">{{ arpdu }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'line'" :options='{ width: "100%", height: 80, fill: "#56f19a", stroke: "#67C23A" }' :data="[10, 7, 8, 5, 4, 9, 3, 4, 6, 5, 4, 4, 2, 4, 5, 9, 13, 12, 12, 14].toString()"/>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cash-multiple success-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-neutral info-text mr-10"></i><strong class="success-text">{{ percentage_revenue }}%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Estimated Revenue</div>
								<h2 class="m-0 text-truncate">{{ revenue }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#56f19a"] }' :data="[6, 5, 4, 3, 5, 3, 4, 5, 6, 5, 4, 2, 3, 8, 7, 6, 5, 2, 1, 5].toString()"/>
				</div>
			</el-col>
		</el-row>



		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium bg-accent p-20" style="height:400px" v-loading="!asyncChart1">
					<h1 class="white-text mv-0 animated fadeInDown">Statistics</h1>
					<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">revenue</h3>
					<div id="chart1" style="height:300px; width:100%"></div>
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
								<h2 class="m-0 text-truncate">{{ all_tournaments }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#991FE3"] }' :data="[6, 5, 4, 3, 5, 3, 4, 5, 6, 5, 4, 2, 3, 8, 7, 6, 5, 2, 1, 5].toString()"/>
					
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
								<h2 class="m-0 text-truncate">{{ free_tournaments }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80 }' :data="[6, 5, 4, 3, 5, 3, 4, 5, 6, 5, 4, 2, 3, 8, 7, 6, 5, 2, 1, 5].toString()"/>
					
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
								<h2 class="m-0 text-truncate">{{ cash_tournaments }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#56f19a"] }' :data="[6, 5, 4, 3, 5, 3, 4, 5, 6, 5, 4, 2, 3, 8, 7, 6, 5, 2, 1, 5].toString()"/>
					
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
								<h2 class="m-0 text-truncate">{{ all_challenges }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#fe5000"] }' :data="[6, 5, 4, 3, 5, 3, 4, 5, 6, 5, 4, 2, 3, 8, 7, 6, 5, 2, 1, 5].toString()"/>
					
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
								<h2 class="m-0 text-truncate">{{ free_challenges }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#74d2e7"] }' :data="[6, 5, 4, 3, 5, 3, 4, 5, 6, 5, 4, 2, 3, 8, 7, 6, 5, 2, 1, 5].toString()"/>
					
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
								<h2 class="m-0 text-truncate">{{ cash_challenges }}</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#7d3f98"] }' :data="[6, 5, 4, 3, 5, 3, 4, 5, 6, 5, 4, 2, 3, 8, 7, 6, 5, 2, 1, 5].toString()"/>
					
				</div>
			</el-col>




		</el-row>



		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium bg-danger p-20" style="height:400px" v-loading="!asyncChart1">
					<h1 class="white-text mv-0 animated fadeInDown">Recurring Users</h1>
					<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">Returning and new users</h3>
					
					<peity  data-peity='{ "height": 100, "radius": 40, "height": 70, "width": 200 }' :type="'pie'" :data="'226/360'"></peity>
					<!-- <div id="piechart" style="height:300px; width:100%"></div> -->
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
			free_tournaments: 0,
			cash_tournaments: 0,

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
			list: [
				{"activity":111, "progress": 70, "status":"active", "id":1,"first_name":"Fidela","last_name":"MacLaverty","email":"fmaclaverty0@scribd.com","gender":"Female","ip_address":"165.9.197.163"},
				{"activity":111, "progress": 55, "status":"intermediary", "id":2,"first_name":"Garrard","last_name":"Inge","email":"ginge1@51.la","gender":"Male","ip_address":"138.87.225.97"},
				{"activity":111, "progress": 100, "status":"positive", "id":3,"first_name":"Clayborn","last_name":"Blencoe","email":"cblencoe2@cbc.ca","gender":"Male","ip_address":"237.146.154.222"},
				{"activity":111, "progress": 12, "status":"negative", "id":6,"first_name":"Elna","last_name":"Deboick","email":"edeboick5@4shared.com","gender":"Female","ip_address":"53.209.210.199"},
				{"activity":111, "progress": 0, "status":"", "id":8,"first_name":"Sheffie","last_name":"Fellgett","email":"sfellgett7@ow.ly","gender":"Male","ip_address":"219.29.191.217"},
				//{"activity":111, "progress": 68, "status":"active", "id":4,"first_name":"Reinaldos","last_name":"Briiginshaw","email":"rbriiginshaw3@mashable.com","gender":"Male","ip_address":"35.148.222.21"},
				//{"activity":111, "progress": 43, "status":"intermediary", "id":5,"first_name":"Abigael","last_name":"Richmond","email":"arichmond4@shinystat.com","gender":"Female","ip_address":"135.221.192.85"},
				//{"activity":111, "progress": 100, "status":"positive", "id":7,"first_name":"Lanna","last_name":"Prentice","email":"lprentice6@oracle.com","gender":"Female","ip_address":"198.34.29.215"},
				//{"activity":111, "progress": 88, "status":"active", "id":9,"first_name":"Mamie","last_name":"Calkin","email":"mcalkin8@oakley.com","gender":"Female","ip_address":"69.0.235.44"},
				//{"activity":111, "progress": 9, "status":"negative", "id":10,"first_name":"Saudra","last_name":"Dunniom","email":"sdunniom9@ameblo.jp","gender":"Female","ip_address":"182.157.218.101"}
			],
			radio1: 'Month',
			radio2: 'Week',
			data3: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
				datasets: [{
					label: 'Visitors',
					backgroundColor: '#fff',
					stack: 'Stack 0',
					data: [
						23,
						41,
						34,
						62,
						46,
						57,
						68
					]
				}]
            },
            options3: {
				maintainAspectRatio: false,
                title: {
					display: false,
					text: 'Chart.js Bar Chart - Stacked'
				},
				legend: {
					display: false
				},
				tooltips: {
					mode: 'index',
					intersect: false
				},
				responsive: true,
				scales: {
					xAxes: [{
						stacked: true,
						gridLines: {
							display:false,
							drawBorder: false,
						},
						ticks: {
							fontColor: "#fff",
						}
					}],
					yAxes: [{
						stacked: true,
						gridLines: {
							display:false,
							drawBorder: false,
						},
						ticks: {
							display: false
						}
					}]
				}
            },
		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		}
	},
	methods: {
		getChart1datax() {
			axios.post(this.$APIPATH + `/analytics/net-income-monthly/` + this.$store.getters['session/me'].team)
			.then(response => {
				console.log(response.data.data.chart[0])
				return response.data.data.chart[0]
				})
		},
		getChart1datay() {
			axios.post(this.$APIPATH + `/analytics/net-income-monthly/` + this.$store.getters['session/me'].team)
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
	mounted() {
		
		let data = {
			token : localStorage.getItem("token"),
			id : this.$store.getters['session/me'].team
		}

		//played duels this month
		this.$store.dispatch("analytics/game_played_monthly", data)
		.then((res) => {
			this.played_games = this.$store.getters['analytics/gamePlayedMonthly']
			this.played_percentage = Math.trunc(this.$store.getters['analytics/gamePlayedMonthlyPercentage']);
		});

		//seemba installs this month
		this.$store.dispatch("analytics/newInstalls", data)
		.then((res) => {
			this.new_installs = this.$store.getters['analytics/newInstalls']
			this.percentage_of_new_installs = Math.trunc(this.$store.getters['analytics/percentageNewInstalls']) 
		});

		//seemba ARPDU this month
		this.$store.dispatch("analytics/ARPDU", data)
		.then((res) => {
			this.arpdu = this.$store.getters['analytics/arpdu']
			this.percentage_arpdu = Math.trunc(this.$store.getters['analytics/percentageArpdu']) 
		});

		//seemba revenue this month
		this.$store.dispatch("analytics/revenue", data)
		.then((res) => {
			this.revenue = this.$store.getters['analytics/revenue']
			this.percentage_revenue = Math.trunc(this.$store.getters['analytics/percentageRevenue']) 
		})

		this.$store.dispatch("analytics/allTournaments", data)
		.then((res) => {
			this.all_tournaments = this.$store.getters['analytics/allTournaments']
			this.all_tournaments_chart = this.$store.getters['analytics/allTournamentsChart']
		})

		this.$store.dispatch("analytics/freeTournaments", data)
		.then((res) => {
			this.free_tournaments = this.$store.getters['analytics/freeTournaments']
			this.free_tournaments_chart = this.$store.getters['analytics/freeTournamentsChart']
		})

		this.$store.dispatch("analytics/cashTournaments", data)
		.then((res) => {
			this.cash_tournaments = this.$store.getters['analytics/cashTournaments']
			this.cash_tournaments_chart = this.$store.getters['analytics/cashTournamentsChart']
		})

		this.$store.dispatch("analytics/allChallenges", data)
		.then((res) => {
			this.all_challenges = this.$store.getters['analytics/allChallenges']
			this.all_challenges_chart = this.$store.getters['analytics/allChallengesChart']
		})

		this.$store.dispatch("analytics/freeChallenges", data)
		.then((res) => {
			this.free_challenges = this.$store.getters['analytics/freeChallenges']
			this.free_challenges_chart = this.$store.getters['analytics/freeChallengesChart']
		})

		this.$store.dispatch("analytics/cashChallenges", data)
		.then((res) => {
			this.cash_challenges = this.$store.getters['analytics/cashChallenges']
			this.cash_challenges_chart = this.$store.getters['analytics/cashChallengesChart']
		})

		// axios.post(this.$APIPATH + `/analytics/net-income-monthly/` + this.$store.getters['session/me'].team)
		// .then(response => {
		// 	this.category = response.data.data.chart[0]
		// 	// this.chart1.setOption.xAxis.data = response.data.data.chart[0]
		// 	this.lineData = response.data.data.chart[1]
		// 	console.log(chart1.setOption)
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/all-tournaments-weekly/` + this.$store.getters['session/me'].team)
		// .then(response => {
		// 	this.all_tournaments = response.data.data.total
		// 	this.all_tournaments_chart = response.data.data.chart
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/free-tournaments-weekly/` + this.$store.getters['session/me'].team)
		// .then(response => {
		// 	this.free_tournaments = response.data.data.total
		// 	this.free_tournaments_chart = response.data.data.chart
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/cash-tournaments-weekly/` + this.$store.getters['session/me'].team)
		// .then(response => {
		// 	this.cash_tournaments = response.data.data.total
		// 	this.cash_tournaments_chart = response.data.data.chart
		// 	})

			
		// // Duels
		// axios.post(this.$APIPATH + `/analytics/all-challenges-weekly/` + this.$store.getters['session/me'].team)
		// .then(response => {
		// 	this.all_challenges = response.data.data.total
		// 	this.all_challenges_chart = response.data.data.chart
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/free-challenges-weekly/` + this.$store.getters['session/me'].team)
		// .then(response => {
		// 	this.free_challenges = response.data.data.total
		// 	this.free_challenges_chart = response.data.data.chart
		// 	})

		
		// axios.post(this.$APIPATH + `/analytics/cash-challenges-weekly/` + this.$store.getters['session/me'].team)
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


