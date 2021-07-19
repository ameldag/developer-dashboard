<template>
  <vue-scroll class="page-event" id="affix-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Leaderboard" name="leaderboard"
        ><el-tabs>
          <leaderBoard-event
            :action="action"
            :currentEvent="this.currentEvent"
          ></leaderBoard-event>
        </el-tabs>
      </el-tab-pane>
       <el-tab-pane label="Update" name="update">
        <event-edit
          :action="action"
          :currentEvent="this.currentEvent"
        ></event-edit>
      </el-tab-pane>
    </el-tabs>
  </vue-scroll>
</template>

<script>
import EventEdit from "@/components/EventEdit";
import LeaderBoardEvent from "@/components/LeaderBoardEvent";
import { mapState, mapActions } from "vuex";
export default {
  name: "Event-Page",
  data() {
    return {
      affixEnabled: true,
      action: "Add new",
      activeName : "leaderboard"
    };
  },
  computed: {
    ...mapState("event", ["currentEvent"]),
  },
  methods: {
    ...mapActions("event", ["retreive"]),

    resizeAffixEnabled() {
      if (window.innerWidth <= 768) {
        this.affixEnabled = false;
      } else {
        this.affixEnabled = true;
      }
    },
     handleClick(tab, event) {
        console.log(tab, event);
      }
  },
  async mounted() {
    this.resizeAffixEnabled();
    window.addEventListener("resize", this.resizeAffixEnabled);
    // if(this.$route.params.id != "new"){
    // 	this.action = "Update"
    // await this.retreive(this.$route.params.id)

    // }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeAffixEnabled);
  },
  components: {
    EventEdit,
    LeaderBoardEvent,
  },
};
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

