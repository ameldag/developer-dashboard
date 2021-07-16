<template>
	<vue-scroll class="page-event" id="affix-container">
			<el-tabs >
				<event-edit :action="action" :currentEvent="this.currentEvent"></event-edit>
			</el-tabs>
	</vue-scroll>
</template>

<script>
import EventEdit from '@/components/EventEdit'
import { mapState, mapActions } from 'vuex'
export default {
	name: 'Event-Page',
	data() {
		return {
            affixEnabled: true,
			action: 'Add new',
		}
	},
	computed:{
		...mapState('event', ['currentEvent'])
	},
	methods: {
		...mapActions('event', ['retreive']),

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
		EventEdit,
	}
}
</script>

<style lang="scss" scoped>
// @import '../../assets/scss/_variables';

.page-event {
	overflow: auto;

}

@media (max-width: 768px) {
	.page-event {
	}
}
</style>

<style lang="scss">
.page-event {
	.el-tabs:not(.el-tabs--border-card) {
		.el-tabs__item:not(.is-active) {
			color: #32325d;
		}
	}
}
</style>
