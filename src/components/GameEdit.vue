<template>
	<div class="page-game-edit">

		<el-form ref="form" :model="game" label-width="120px" :label-position="labelPosition">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Name">
						<el-input v-model="game.name"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Android Name">
						<el-input v-model="game.android_name"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Android Version">
						<el-input v-model="game.android_version"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="iOS Name">
						<el-input v-model="game.ios_name"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="iOS Version">
						<el-input v-model="game.ios_version"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Status">
						<el-radio-group v-model="game.status">
							<el-radio label="true" border>Active</el-radio>
							<el-radio label="false" border>Disabled</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Engine">
						<el-radio-group v-model="game.engine">
							<el-radio label="unity" border></el-radio>
							<el-radio label="unreal" border></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
					<el-form-item label="Orientation">
						<el-radio-group v-model="game.orientation">
							<el-radio label="portrait" border></el-radio>
							<el-radio label="landscape" border></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-col>
			
			<el-col class="col-p">
				<el-form-item label="Description">
					<el-input type="textarea" v-model="game.description" autosize></el-input>
				</el-form-item>
			</el-col>
			<el-col class="col-p">
				<el-form-item>
					<el-button type="primary" @click="onSubmit">Save</el-button>
					<el-button>Cancel</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>

export default {
    
    props: [
        'game'
    ],
	name: 'GameEdit',
	data() {
		return {
			form: {
				username: 'aShenton',
				email: 'ashenton@mail.com',
				firstName: 'Aurora',
				lastName: 'Shenton',
				birthday: '1991-02-13T23:00:00.000Z',
				phone: '',
				website: '',
				hobbies: [],
				skills: ['JavaScript', 'HTML', 'CSS', 'Vue.js'],
                gender: null,
                orientation: null,
				address: '',
				city: '',
				country: '',
				postalCode: '',
				aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus posuere libero, nec convallis arcu ullamcorper a. Vestibulum diam neque, egestas scelerisque arcu a, fermentum ornare mauris. Ut venenatis vulputate maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur scelerisque quis turpis ac tempus. Quisque dolor dolor, fermentum nec magna eget, fringilla auctor lacus. Aenean sagittis est ac ligula pharetra, quis imperdiet ante dignissim. Ut vehicula nec nisl a pretium. Quisque faucibus auctor viverra. Sed ultricies convallis magna. In blandit eros id efficitur vulputate. Duis efficitur sollicitudin dui non vehicula. Nullam ut eros fermentum, dapibus metus non, accumsan neque. Mauris sed pellentesque felis. Suspendisse viverra risus sit amet congue consectetur.'
			},
			hobbies: [
				{
					value: 'Model building',
					label: 'Model building'
				}, {
					value: 'Drawing',
					label: 'Drawing'
				}, {
					value: 'Snowboarding',
					label: 'Snowboarding'
				}
			],
			skills: [
				{
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'JavaScript',
					label: 'JavaScript'
				}
			],
			labelPosition: 'left' //left, right, or top
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'	
			}
		}
	},
	mounted() {
		this.resizeLabelPosition();
        window.addEventListener('resize', this.resizeLabelPosition);
        console.log(this.game)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition);
	}
}
</script>

<style lang="scss" scoped>
// @import '../../assets/scss/_variables';

.page-profile-edit {
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
