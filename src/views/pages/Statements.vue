<template>
	<div class="">
		<div class="page-header">
			<h1 class="main-title">Manage your revenue</h1>
		</div>
		<el-row :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style='margin: auto; float: none;'>

				<div class="grid grid-cols-2 bg-gray-800 rounded-lg overflow-hidden px-5 py-5 mb-20">
					<div class="border-r p-20">
						<h2 class="uppercase font-bold">CURRENT BALANCE</h2>
						<p class="font-thin">Quick peek on your current balance</p>
						<p class="m-0 text-teal-400 font-black text-2xl">
							{{ this.$store.state.team.currentTeam.balance || 0 }} € </p>
					</div>
					<div class="p-20 text-center leading-none relative">
						<div class="inline-block align-middle" v-if="this.account && this.account.payouts_enabled ">
							<i class="text-green-600 shadow">&bull;</i> Verified Account
						</div>
						<div class="inline-block align-middle" v-else>
							<i class="text-red-600 shadow">&bull;</i> Unverified Account
						</div>
					</div>
				</div>

			</el-col>
		</el-row>


		<!-- CREATE ACCOUNT DIALOG -->

		<el-dialog :visible.sync="FormVisible" width="30%" custom-class="dialog" center>
			<el-form label-position="top" ref="accountForm" :model="accountForm" :rules="rules">
				

				<el-form-item label="ACCOUNT HOLDER NAME:" prop="holder_name">
					<el-input type="text" v-model="accountForm.holder_name" />
				</el-form-item>

				<el-form-item label="ACCOUNT HOLDER COUNTRY:" prop="holder_country">
					<el-select v-model="accountForm.holder_country" placeholder="Select" class="w-full">
						<el-option v-for="item in this.countries" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="IBAN:" prop="iban">
					<el-input type="text" style="height=40px;" v-model="accountForm.iban" />
				</el-form-item>

				<el-form-item label="STRIPE ACCOUNT TYPE:" prop="account_type">
					<el-select v-model="accountForm.account_type" placeholder="Select" class="w-full">
						<el-option v-for="item in account_types" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="CURRENCY:" prop="currency">
					<el-select v-model="accountForm.currency" placeholder="Select" class="w-full">
						<el-option v-for="item in currentCurrencies" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="BANK ACCOUNT TYPE:" prop="holder_type">
					<el-select v-model="accountForm.holder_type" placeholder="Select" class="w-full">
						<el-option v-for="item in holder_types" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>

				<div class="grid grid-cols-2 gap-2">
					<button class="bg-gray-100 text-gray-800 rounded-md border-0 shadow py-3 font-bold hover:bg-gray-300" @click="FormVisible = false">Annuler</button>
					<button class="bg-blue-400 text-white rounded-md border-0 shadow py-3 font-bold hover:bg-blue-500" @click="createAccount('accountForm')">Confirmer</button>
				</div>
		</el-dialog>

		<!-- CREATE ACCOUNT DIALOG END -->


		<!-- VERIFY YOUR ACCOUNT DIALOG -->

		<el-dialog :visible.sync="verifyAccountVisible" width="30%" custom-class="dialog" center>
			<div class="grid grid-cols-1 text-gray-100 text-center">
				<h2 class="text-2xl font-bold mb-10">Verify your account</h2>

				<p class="mb-16">Complete the process of verification through the Stripe secured platform</p>

				<svg class="w-24 h-auto" fill="#4379FF" viewBox="0 0 62 26" style="justify-self: center;">
					<path
						d="M5 10.1c0-.6.6-.9 1.4-.9 1.2 0 2.8.4 4 1.1V6.5c-1.3-.5-2.7-.8-4-.8C3.2 5.7 1 7.4 1 10.3c0 4.4 6 3.6 6 5.6 0 .7-.6 1-1.5 1-1.3 0-3-.6-4.3-1.3v3.8c1.5.6 2.9.9 4.3.9 3.3 0 5.5-1.6 5.5-4.5.1-4.8-6-3.9-6-5.7zM29.9 20h4V6h-4v14zM16.3 2.7l-3.9.8v12.6c0 2.4 1.8 4.1 4.1 4.1 1.3 0 2.3-.2 2.8-.5v-3.2c-.5.2-3 .9-3-1.4V9.4h3V6h-3V2.7zm8.4 4.5L24.6 6H21v14h4v-9.5c1-1.2 2.7-1 3.2-.8V6c-.5-.2-2.5-.5-3.5 1.2zm5.2-2.3l4-.8V.8l-4 .8v3.3zM61.1 13c0-4.1-2-7.3-5.8-7.3s-6.1 3.2-6.1 7.3c0 4.8 2.7 7.2 6.6 7.2 1.9 0 3.3-.4 4.4-1.1V16c-1.1.6-2.3.9-3.9.9s-2.9-.6-3.1-2.5H61c.1-.2.1-1 .1-1.4zm-7.9-1.5c0-1.8 1.1-2.5 2.1-2.5s2 .7 2 2.5h-4.1zM42.7 5.7c-1.6 0-2.5.7-3.1 1.3l-.1-1h-3.6v18.5l4-.7v-4.5c.6.4 1.4 1 2.8 1 2.9 0 5.5-2.3 5.5-7.4-.1-4.6-2.7-7.2-5.5-7.2zm-1 11c-.9 0-1.5-.3-1.9-.8V10c.4-.5 1-.8 1.9-.8 1.5 0 2.5 1.6 2.5 3.7 0 2.2-1 3.8-2.5 3.8z">
					</path>
				</svg>

				<button class="bg-blue-600 rounded-md py-3 w-full mt-20" @click="verification()">Go to verification</button>
			</div>
		</el-dialog>

		<!-- VERIFY YOUR ACCOUNT DIALOG END -->

		<!-- PROFILE VERIFIED DIALOG -->

		<!-- <el-dialog :visible.sync="FormVisible" width="30%" custom-class="dialog" center>
			<div class="grid grid-cols-1 text-gray-100 text-center">
				<h2 class="text-2xl font-bold mb-10">Verify your account</h2>

				<p class="mb-16">Profile verified.</p>

				<button class="bg-blue-600 rounded-md py-3 w-full mt-20">Go to verification</button>
			</div>
		</el-dialog> -->

		<!-- PROFILE VERIFIED DIALOG END -->

		<!-- WITHDRAW DIALOG -->

		<el-dialog :visible.sync="withdrawFormVisible" width="30%" custom-class="dialog" center>
			<el-form label-position="top" ref="withdrawForm" :model="withdrawForm" :rules="rules">
				<div class="grid grid-cols-1 text-gray-100 text-center">
					<h2 class="text-2xl font-bold mb-10">WITHDRAW</h2>

					<p class="mb-16">Enter the amount you want to withdraw</p>

				</div>
					<el-form-item label="AMOUNT:" prop="amount">
						<el-input type="number" v-model="withdrawForm.amount"  />
					</el-form-item>
			</el-form>

				<div class="grid grid-cols-2 gap-2">
					<button class="bg-gray-100 text-gray-800 rounded-md border-0 shadow py-3 font-bold hover:bg-gray-300" @click="withdrawFormVisible = false">Annuler</button>
					<button class="bg-blue-400 text-white rounded-md border-0 shadow py-3 font-bold hover:bg-blue-500" @click="withdraw('withdrawForm')">Confirmer</button>
				</div>
		</el-dialog>

		<!-- WITHDRAW DIALOG END -->

		<el-row :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style='margin: auto;	float: none; text-align: center;'>

				<el-button type="primary" class="uppercase bg-teal-600 font-bold" round @click="FormVisible = true"
					v-if="!this.account">Create Account
				</el-button>

				<el-button type="primary" class="uppercase bg-teal-600 font-bold" round @click="verifyAccountVisible = true"
					v-else-if="!this.account.payouts_enabled">verify your account
				</el-button>

				<button class="uppercase bg-teal-600 font-bold py-2 px-4 rounded-full" @click="withdrawFormVisible = true"
					v-else-if="this.account.capabilities.transfers == 'active'">
					Withdraw
				</button>

			</el-col>
		</el-row>
	</div>
</template>

<script>
	const axios = require('axios');
	import { loadStripe } from '@stripe/stripe-js';
	import { mapState, mapMutations, mapActions } from 'vuex'
	let stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);
	export default {
		name: 'Statements',
		data() {
			return {
				FormVisible: false,
				verifyAccountVisible: false,
				withdrawFormVisible: false,
				withdrawForm: {
					amount: '',
				},
				account_types: [{
						value: 'individual',
						label: 'Independent',
					},
					{
						value: 'company',
						label: 'Company',
					},
				],
				holder_types: [{
						value: 'individual',
						label: 'Independent',
					},
					{
						value: 'company',
						label: 'Company',
					},
				],
				// currencies: [{
				// 		value: 'eur',
				// 		label: 'EUR',
				// 	},
				// 	{
				// 		value: 'usd',
				// 		label: 'USD',
				// 	},
				// ],
				accountForm: {
					account_type: '',
					iban: '',
					currency: '',
					holder_name: '',
					holder_type: '',
					holder_country: '',
				},
				rules: {
					account_type: [{
						required: true,
						message: 'Please choose an account type',
						trigger: 'change'
					}, ],
					iban: [{
						required: true,
						message: 'Please enter your IBAN',
						trigger: 'change'
					}],
					currency: [{
						required: true,
						message: 'Please select currency',
						trigger: 'change'
					}],
					holder_name: [{
						required: true,
						message: 'Please enter the bank account holder name',
						trigger: 'change'
					}],
					holder_type: [{
						required: true,
						message: 'Please select the bank account holder type',
						trigger: 'change'
					}],
					holder_country: [{
						required: true,
						message: 'Please select country',
						trigger: 'change'
					}],
					amount: [{
						required: true,
						message: 'Please enter an amount',
						trigger: 'change'
					}],
				}
			}
		},
		async created() {},
		async mounted() {
			await this.$store.dispatch("session/getMe", localStorage.getItem('token'))
			console.log(this.user.payment_account_id);
			
			if(this.user.payment_account_id){
				await axios.get(process.env.VUE_APP_API_PATH + `/editors/payment/retreiveAccount/` + this.user.payment_account_id, {
					headers: {
						'x-access-token': localStorage.getItem("token")
					}
				})
				.then((res) => {
					console.log(res.data)
					this.setAccount(res.data)
				})
				.catch((error) => {
					this.$store.commit('setSplashScreen', false)
					this.$notify({
						title: "Something went wrong. Please try again later",
						type: 'error',
						customClass: 'error-alert',
					});
					return error.response;
				});
			} else {
				console.log('countries...');
				
				await axios.get(process.env.VUE_APP_API_PATH + `/editors/payment/country_specs`, {
					headers: {
						'x-access-token': localStorage.getItem("token")
					}
				})
				.then((res) => {
					this.setCountriesCodes(res.data.countries_codes)
					this.setCountries(res.data.countries)
					this.setCurrencies(res.data.currencies)
				})
				.catch((error) => {
					this.$store.commit('setSplashScreen', false)
					return error.response;
				});
			}
		},
		computed: {
			...mapState('session', ['user']),
			...mapState('payment', ['account','countries','currencies','countries_codes']),

			currentCurrencies(){
				return this.currencies[this.countries_codes.indexOf(this.accountForm.holder_country)]
			}
		},
		methods: {

			...mapMutations('session', ['setUser',]),
			...mapMutations('payment', ['setAccount','setCountries','setCurrencies','setCountriesCodes']),
			...mapActions('team',['setCurrentTeam']),
			createAccount(accountForm) {
				let data = {
					token: localStorage.getItem("token"),
					id: localStorage.getItem("current_team")
				}
				this.$refs[accountForm].validate(async (valid) => {
					if (valid) {
						this.$store.commit('setSplashScreen', true)
						const accountToken = await stripe
							.createToken('account', {
								account: {
									business_type: this.accountForm.account_type,
								},
								tos_shown_and_accepted: true,
							})
						const bankAccountToken = await stripe
							.createToken('bank_account', {
								country: this.accountForm.iban.substring(0, 2),
								currency: this.accountForm.currency,
								account_number: this.accountForm.iban,
								account_holder_name: this.accountForm.holder_name,
								account_holder_type: this.accountForm.holder_type,
							})

						let body = {
							country_code: this.accountForm.holder_country,
							ct: accountToken.token.id,
							external_account: bankAccountToken.token.id,
						}

						await axios.post(process.env.VUE_APP_API_PATH + `/editors/create/connect_account`,
								body, {
									headers: {
										'x-access-token': data.token
									}
								})
							.then((res) => {
								this.FormVisible = false
								this.setUser(res.data.editor)
								this.$store.commit('setSplashScreen', false)
								this.setAccount(res.data.account)
								this.$notify({
									title: "Account successfully created",
									type: 'success',
									customClass: 'success-alert',
								});
							})
							.catch((error) => {
								this.$store.commit('setSplashScreen', false)
								this.FormVisible = false
								console.log({
									error
								})
								this.$notify({
									title: error,
									type: 'error',
									customClass: 'error-alert',
								});
								return error.response;
							});
					} else {
						return false;
					}
				})
			},
			async verification(){
				await axios.post(process.env.VUE_APP_API_PATH + `/editors/payment/links`,
				{account: this.user.payment_account_id}, {
					headers: {
						'x-access-token': localStorage.getItem("token")
					}
				})
				.then((res) => {
						window.open(res.data.url, "_self"); 
				})
				.catch((error) => {
					this.$store.commit('setSplashScreen', false)
					this.verifyAccountVisible = false
					this.$notify({
						title: error,
						type: 'error',
						customClass: 'error-alert',
					});
					return error.response;
				});
			},
			withdraw(withdrawForm){
				this.$refs[withdrawForm].validate(async (valid) => {
					if (valid) {
						let body = {
							account_id: this.account.id,
							amount: this.withdrawForm.amount,
						}
						if(this.$store.state.team.currentTeam.balance && this.$store.state.team.currentTeam.balance > this.withdrawForm.amount){
							
							this.$store.commit('setSplashScreen', true)
							await axios.post(process.env.VUE_APP_API_PATH + `/editors/payment/payout`,
								body, {
									headers: {
										'x-access-token': localStorage.getItem("token"),
									}
								})
							.then((res) => {
								console.log({res})
								if(res.data.success){
									this.$store.commit('setSplashScreen', false)
									this.withdrawFormVisible = false
									this.setCurrentTeam(res.data.team)
									this.$notify({
										title: "withdrawal successfully processed",
										type: 'success',
										customClass: 'success-alert',
									});
								} else {
									this.$store.commit('setSplashScreen', false)
									this.withdrawFormVisible = false
									this.$notify({
										title: res.data.message,
										type: 'error',
										customClass: 'error-alert',
									});
								}
							})
							.catch((error) => {
								
								this.$store.commit('setSplashScreen', false)
								this.withdrawFormVisible = false
								this.$notify({
									title: error.response.data.message.code,
									type: 'error',
									customClass: 'error-alert',
								});
								return error.response;
							});
						} else {
							this.$notify({
									title: "insufficient balance",
									type: 'error',
									customClass: 'error-alert',
								});
						}
					} else {
						return false;
					}
				})
			}
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

	.dialog {
		border-radius: 15px;
		box-shadow: 0 0 10px rgba(1, 1, 1, 0.7);
	}

	.success-alert {
		background-color: #f0f9eb;
		color: #67c23a
	}

	.warning-alert {
		background-color: #fdf6ec;
		color: #e6a23c
	}

	.error-alert {
		background-color: #fef0f0;
		color: #f56c6c
	}

	// .card-date {
	// 	-webkit-box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
	// 	box-shadow: 0 3px 6px 0 rgba(40,40,90,.09), 0 1px 1px 0 rgba(0,0,0,.065);
	// 	background-color: #fff;
	//     border-radius: 5px;
	// 	overflow: hidden;
	// 	margin: 10px 0px;
	// 	padding: 10px 20px;
	// 	font-weight: 900;
	// }
</style>