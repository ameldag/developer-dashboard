<template>
	<vue-scroll class="page-promotion" id="affix-container">
			<el-tabs >
				<promotion-edit :action="action" :currentPromotion="this.currentPromotion"></promotion-edit>
			</el-tabs>
	</vue-scroll>
</template>

<script>
import PromotionEdit from '@/components/PromotionEdit'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
	name: 'Promotion-Page',
	data() {
		return {
            affixEnabled: true,
			action: 'Add new',
		}
	},
	computed:{
		...mapState('promotion', ['currentPromotion'])
	},
	methods: {
		...mapActions('promotion', ['retreive']),

		resizeAffixEnabled() {
			if(window.innerWidth <= 768) {
				this.affixEnabled = false	
			} else {
				this.affixEnabled = true	
			}
		}
	},
	async mounted() {

		this.resizeAffixEnabled();
		window.addEventListener('resize', this.resizeAffixEnabled);
		if(this.$route.params.id != "new"){
			this.action = "Update"
			await this.retreive(this.$route.params.id)
		}
		
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeAffixEnabled);
	},
	components: {
		PromotionEdit,
	}
}
</script>

<style lang="scss" scoped>
// @import '../../assets/scss/_variables';

.page-promotion {
	overflow: auto;

}

@media (max-width: 768px) {
	.page-promotion {
	}
}
</style>

<style lang="scss">
.page-promotion {
	.el-tabs:not(.el-tabs--border-card) {
		.el-tabs__item:not(.is-active) {
			color: #32325d;
		}
	}
}
</style>
