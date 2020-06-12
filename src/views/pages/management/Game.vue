<template>
	<vue-scroll class="page-game" id="affix-container">
			<el-tabs v-model="activeTab">
				<game-edit :action="action" :currentGame="this.currentGame"></game-edit>
			</el-tabs>
	</vue-scroll>
</template>

<script>
import ColorThief from 'color-thief-browser'
import GameEdit from '@/components/GameEdit'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'Game',
	data() {
		return {
			activeTab: 'info',
            affixEnabled: true,
			action: 'Add new',
		}
	},
	computed:{
		...mapState('games', ['currentGame']),
	},
	methods: {
		...mapActions('games', ['retreive']),

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
		GameEdit,
	}
}
</script>

<style lang="scss" scoped>
// @import '../../assets/scss/_variables';

.page-game {
	overflow: auto;

}

@media (max-width: 768px) {
	.page-game {
		
	}
}
</style>

<style lang="scss">
.page-game {
	.el-tabs:not(.el-tabs--border-card) {
		.el-tabs__item:not(.is-active) {
			color: #32325d;
		}
	}
}
</style>
