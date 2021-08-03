<template>
  <vue-scroll class="page-event" id="affix-container">
   <div v-if="upcomingEvent">
      <event-edit
        :action="action"
        :currentEvent="this.currentEvent"
      ></event-edit>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Leaderboard" name="leaderboard" v-if="ongoingEvent || pastEvent && !upcomingEvent">
          <el-tabs>
            <leaderBoard-event
              :action="action"
              :currentEvent="this.currentEvent"
            ></leaderBoard-event>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="Update" name="update" v-if="ongoingEvent || !pastEvent && !upcomingEvent">
          <event-edit
            :action="action"
            :currentEvent="this.currentEvent"
          ></event-edit>
        </el-tab-pane>
      </el-tabs>
    </div>
  </vue-scroll>
</template>

<script>
import EventEdit from "@/components/EventEdit";
import LeaderBoardEvent from "@/components/LeaderBoardEvent";
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "Event-Page",
  data() {
    return {
      affixEnabled: true,
      action: "Add new",
      activeName: "leaderboard",
    };
  },
  computed: {
    ...mapState("event", ["currentEvent"]),
      ongoingEvent() { 
        let current_date=moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        let start_date= moment(this.$route.query.start_date).format("YYYY-MM-DD HH:mm:ss")
        let end_date= moment(this.$route.query.end_date).format("YYYY-MM-DD HH:mm:ss")
          if (moment(start_date).isBefore(current_date)&& moment(current_date).isBefore(end_date))
            return true;
      },   
      upcomingEvent() {
      let current_date=moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      let start_date= moment(this.$route.query.start_date).format("YYYY-MM-DD HH:mm:ss")
        if(moment(current_date).isBefore(start_date))
            return true;      
      },
      pastEvent() {
      let current_date=moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      let end_date= moment(this.$route.query.end_date).format("YYYY-MM-DD HH:mm:ss")
        if(moment(end_date).isBefore(current_date))
          return true;
      },
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
    },
  },
  async mounted() {
    this.resizeAffixEnabled();
    window.addEventListener("resize", this.resizeAffixEnabled);
    if (this.$route.params.id != "new") {
      this.action = "Update";
      await this.retreive(this.$route.params.id, this.$route.query);
    }
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

