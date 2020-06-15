<template>
	
	<div class="page-promotion-edit">
		<div class="page-header">
			<h1>{{action}} promotion </h1>
		</div>
		<el-form ref="promotion" :rules="currentRules" :model="promotion" label-width="120px" :label-position="labelPosition">
		<div class="card-base card-shadow--medium info" style="padding: 20px;">
			<el-steps :active="active" finish-status="success" style="padding-bottom: 30px" align-center>
				<el-step title="Informations"></el-step>
				<el-step title="Channels"></el-step>
				<el-step title="Additional Information"></el-step>
			</el-steps>
			<div v-if="active===0">
				<el-col class="col-p">
					<p>Promote the launch of a new game and make sure all of your players are aware they can enter eSport tournaements and monetize their talent by downloading it !</p>
					<p><b>PROMO DETAILS</b></p>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Promo Name :" prop="promotion_name">
						<el-input type="text" v-model="promotion.promotion_name"/>
					</el-form-item>
				</el-col>
				
				<el-col class="col-p">
					<el-form-item label="Select Game :" prop="game">
						<el-select v-model="promotion.game" placeholder="Select">
							<el-option
							v-for="item in this.games"
							:key="item.value"
							:label="item.name"
							:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</div>

            <div v-if="active===1">
				<el-col class="col-p">
					<p>Choose the games on which you want your new launch promotion to be displayed (Multiple Choice).</p>
				</el-col>

				<el-col :span="12" :md="24" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Platform" prop="channels">
						<el-checkbox-group v-model="promotion.channels">
							<el-checkbox-button 
								v-for="item in getAvailablesGames"
								:key="item.value"
								:label="item._id"
								:value="item._id">
								<el-card :body-style="{ padding: '10px' }">
								<img :src="item.icon" class="image" width='100px' height='100px'>
								<div style="padding: 14px;">
									<span>{{item.name}}</span>
									<div class="bottom clearfix">
									</div>
								</div>
								</el-card>
							</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</div>

            <div v-if="active===2">
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Beginging of Promotion :" prop="start_date">
						<el-date-picker
						v-model="promotion.start_date"
						type="date"
						placeholder="pick a date">
						</el-date-picker>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="End of Promotion :" prop="end_date">
						<el-date-picker
						v-model="promotion.end_date"
						type="date"
						placeholder="pick a date">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</div>
			<el-col class="col-p">
				<el-form-item>
					<el-button @click="back" v-if="active!==0 ">Back</el-button>
					<el-button type="primary" style="float:right;" @click="next('promotion')">Next</el-button>
				</el-form-item>
			</el-col>
		</div>
		</el-form>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	name: 'PromotionEdit',
	props: ['action', 'currentPromotion'],
	watch: { 
		currentPromotion: function(newVal, oldVal) { // watch it
			Object.assign(this.promotion, newVal)
		}
	},
	data() {
		return {
			active: 0,
			labelPosition: 'left', //left, right, or top
			promotion: {
				promotion_name: '',
				game: '',
				channels: [],
				start_date: '',
				end_date: '',
			},
			rules: {
				0: {
					promotion_name: [
						{ required: true, message: 'Please enter promotion name', trigger: 'change' },
					],
					game: [
						{ required: true, message: 'Please enter promotion name', trigger: 'change' },
					],
				},
				1: {
					channels: [
						{ type: 'array', required: true, message: 'Please select at least one platform', trigger: 'change' }
					],
				},
				2:{
					start_date: [
						{ type: 'date', required: true, message: 'Please pick a start date', trigger: 'change' }
					],
					end_date: [
						{ type: 'date', required: true, message: 'Please pick an end date', trigger: 'change' }
					],
				},
			}
		};
	},
	computed: {
		...mapState('games', ['games']),

		getAvailablesGames: function() {
			return this.games.filter( e => e._id != this.currentPromotion.game)
		},
		currentRules() {
			return this.rules[this.active]
		}
	},
    props: {
		action : String,
		currentPromotion : Object
	},
	methods: {
		...mapActions('promotion', ['add', 'update']),
		...mapActions('games', ['getGames']),

		back(){
			this.active--
		},
		next(promotion){
			this.$refs[promotion].validate(async (valid) => {
			if (valid) {
				if (this.active == 2){
					this.$store.commit('setSplashScreen', true)
					if(this.action == "Update"){
						await this.update({
							id: this.$route.params.id, 
							data: this.promotion
						})
						.then((res) => {
								this.$router.replace('/management/promotions');
								this.$store.commit('setSplashScreen', false)
						})
						.catch((error) => {
								return error.response;
								this.$store.commit('setSplashScreen', false)
						});
					} else {
						await this.add(this.promotion)
						.then((res) => {
								this.$router.replace('/management/promotions');
								this.$store.commit('setSplashScreen', false)
						})
						.catch((error) => {
								console.error(error);
								
								this.$store.commit('setSplashScreen', false)
								return error.response;
						});
					}
				} else {
					this.active++
				}
			} else {
				return false;
			}
			});
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'	
			}
		},

	},
	async mounted() {
		await this.getGames()
		this.resizeLabelPosition();
        window.addEventListener('resize', this.resizeLabelPosition);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition);
	}
}
</script>

<style lang="scss" scoped>
// @import '../../assets/scss/_variables';

.page-promotion-edit {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
}
</style>
