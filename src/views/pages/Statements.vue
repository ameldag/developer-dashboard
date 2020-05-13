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
							$ {{ this.$store.state.team.currentTeam.balance || 0 }}</p>
					</div>
					<div class="p-20 text-center leading-none relative">
						<div class="inline-block align-middle">
							<i class="text-green-600 shadow">&bull;</i> Verified Account
						</div>
					</div>
				</div>

			</el-col>
		</el-row>
		<el-dialog :visible.sync="FormVisible" width="30%" custom-class="dialog" center>
			<el-form label-position="top" ref="accountForm" :model="accountForm" :rules="rules">

				<el-form-item label="ACCOUNT HOLDER NAME:" prop="holder_name">
					<el-input type="text" v-model="accountForm.holder_name" />
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
						<el-option v-for="item in currencies" :key="item.value" :label="item.label" :value="item.value">
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

				<div class="grid grid-cols-2 gap-2">
					<button class="bg-gray-100 text-gray-800 rounded-md border-0 shadow py-3 font-bold hover:bg-gray-300" @click="FormVisible = false">Annuler</button>
					<button class="bg-blue-400 text-white rounded-md border-0 shadow py-3 font-bold hover:bg-blue-500" @click="createAccount('accountForm')">Confirmer</button>
				</div>
				
			</el-form>
		</el-dialog>
		<el-row :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style='margin: auto;	float: none; text-align: center;'>

				<button class="uppercase bg-teal-600 font-bold py-2 px-4 rounded-full" @click="FormVisible = true"
					v-if="this.$store.state.session.user.payment_account_id">
					Withdraw
				</button>
				
				<el-button type="primary" class="uppercase bg-teal-600 font-bold" round @click="FormVisible = true" v-else>Create Account
				</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	const axios = require('axios');
	import {
		loadStripe
	} from '@stripe/stripe-js';
	let stripe = Stripe('pk_test_A8fKBAogt5UIexspxnivPLGw00HslhmxSr');
	export default {
		name: 'Games',
		data() {
			return {
				FormVisible: false,
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
				currencies: [{
						value: 'eur',
						label: 'EUR',
					},
					{
						value: 'usd',
						label: 'USD',
					},
				],
				accountForm: {
					account_type: '',
					iban: '',
					currency: '',
					holder_name: '',
					holder_type: '',
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
				}
			}
		},
		async created() {},
		mounted() {},
		methods: {
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
								currency: 'eur',
								account_number: this.accountForm.iban,
								account_holder_name: this.accountForm.holder_name,
								account_holder_type: this.accountForm.holder_type,
							})
						console.log({
							accountToken,
							bankAccountToken
						});

						let body = {
							country_code: 'FR',
							ct: accountToken.token.id,
							external_account: bankAccountToken.token.id,
						}
						console.log(body);

						await axios.post(process.env.VUE_APP_API_PATH + `/editors/create/connect_account`,
								body, {
									headers: {
										'x-access-token': data.token
									}
								})
							.then((res) => {
								this.$store.commit('setSplashScreen', false)
								this.FormVisible = false
								console.log({
									res
								})
								this.$notify({
									title: res,
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