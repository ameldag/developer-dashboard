<template>
	<div class="">
		<div class="page-header">
			<h1>Manage your revenue</h1>
		</div>
        <el-row :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style='margin: auto; float: none; text-align: center;'>
				<div class="card-base card-shadow--medium mb-30 widget small-widget" >

					<div class="widget-header ph-20 pt-20 pb-20">
						<div class="flex justify-center align-center">
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="m-0 widget-title text-truncate pt-5 pb-10">CURRENT BALANCE</div>
								<div class="m-0 widget-title text-truncate pt-5 pb-10">Quick peek on your current balance</div>
								<h2 class="m-0 text-truncate">{{ this.$store.state.team.currentTeam.balance || 0 }}</h2>
							</div>
						</div>
					</div>
				</div>
			</el-col>
        </el-row>
		<el-dialog
			:visible.sync="FormVisible"
			width="30%"
			center>
			<el-form ref="demande" :model="demande" :rules="rules">
				<div class="card-base card-shadow--medium info" style="padding: 20px;">
					<el-row :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="First Name:" prop="firstname">
							<el-input type="text" v-model="demande.firstname" />
						</el-form-item>
					</el-row>

					<el-row :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="Last Name:" prop="lastname">
							<el-input type="text" v-model="demande.lastname"/>
						</el-form-item>
					</el-row>

					<el-row :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="Company:" prop="company">
							<el-input type="text" v-model="demande.company"/>
						</el-form-item>
					</el-row>

					<el-row :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="address:" prop="address" >
							<el-input type="text" v-model="demande.address"/>
						</el-form-item>
					</el-row>

					<el-row :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="IBAN:" prop="iban" >
							<el-input type="text" v-model="demande.iban"/>
						</el-form-item>
					</el-row>

					<el-row :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="BIC/SWIFT:" prop="swift" >
							<el-input type="text" v-model="demande.swift"/>
						</el-form-item>
					</el-row>

					<el-row :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="Bank Name:" prop="bank_name" >
							<el-input type="text" v-model="demande.bank_name"/>
						</el-form-item>
					</el-row>

					<el-row :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
						<el-form-item label="Bank Address:" prop="bank_address" >
							<el-input type="text" v-model="demande.bank_address"/>
						</el-form-item>
					</el-row>
					
					<el-row slot="footer" class="dialog-footer">
						<el-button class="test-truncate" @click="FormVisible = false">Annuler</el-button>
						<el-button type="primary" class="test-truncate" @click="next('demande')">Confirmer</el-button>
					</el-row>
				</div>
			</el-form>
		</el-dialog>
		<el-row :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style='margin: auto;	float: none; text-align: center;'>
				<el-button type="primary" class="text-truncate" round @click="FormVisible = true">Withdraw</el-button>
			</el-col>
        </el-row>
    </div>
</template>

<script>
const axios = require('axios');

export default {
	name: 'Games',
	data(){
		return {
			FormVisible: false,
			demande: {
				firstname: '',
				lastname: '',
				company: '',
				address: '',
				iban: '',
				swift:'',
				bank_name: '',
				bank_address: '',
			},
			rules: {
				firstname: [
					{ required: true, message: 'Please enter your first name', trigger: 'change' },
				],
				lastname: [
					{ required: true, message: 'Please enter your last name', trigger: 'change' }
				],
				company: [
					{ required: true, message: 'Please enter a company name', trigger: 'change' }
				],
				address: [
					{ required: true, message: 'Please enter an adress', trigger: 'change' }
				],
				iban: [
					{ required: true, message: 'Please enter your iban', trigger: 'change' }
				],
				swift: [
					{ required: true, message: 'Please enter your bic/swift', trigger: 'change' }
				],
				bank_name: [
					{ required: true, message: 'Please enter your bank name', trigger: 'change' }
				],
				bank_address: [
					{ required: true, message: 'Please enter your bank adress', trigger: 'change' }
				],
			}
		}
	},
	mounted() {
		
	},
	methods: {
		next(demande){
			let data = {
				token : localStorage.getItem("token"),
				id : localStorage.getItem("current_team")
			}
			this.$refs[demande].validate(async (valid) => {
				if (valid) {
					this.$store.commit('setSplashScreen', true)
					await axios.post(process.env.VUE_APP_API_PATH + `/editors/withdraw/team/` + data.id, this.demande , { headers: { 'x-access-token': data.token } })
					.then((res) => {
						this.$store.commit('setSplashScreen', false)
						this.FormVisible = false
						this.$notify({
							title: res.data.message,
          					type: 'success',
							customClass: 'success-alert',
						});
					})
					.catch((error) => {
						this.$store.commit('setSplashScreen', false)
						this.FormVisible = false
						this.$notify({
							title: 'something went wrong please try later',
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

.success-alert{
	background-color: #f0f9eb;
	color: #67c23a
}
.warning-alert{
	background-color: #fdf6ec;
	color: #e6a23c
}
.error-alert{
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

