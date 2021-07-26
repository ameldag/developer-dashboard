<template>
  <div class="page-vue-good-table scrollable only-y">
    <div class="page-header">
      <h1>LEADERBOARD</h1>
    </div>
    <div class="vue-good-table-box card-base card-shadow--medium">
      <vue-good-table
        v-loading="loadingTableData"
        v-if="this.events ? this.events.length : false"
        :columns="columns"
        :rows="this.events"
        :search-options="{
          enabled: false,
          placeholder: 'Search this table',
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          perPageDropdown: [10, 20, 30, 40, 50],
          nextLabel: 'Next',
          prevLabel: 'Prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All',
        }"
        :lineNumbers="false"
        class="styled"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'rank'">
            <span> #{{ props.index + 1 }}</span>
          </span>
          <span v-else-if="props.column.field == 'icon'">
            <span v-if="props.row.avatar">
              <img v-bind:src="props.row.avatar" alt="icon" class="app-icon" />
            </span>
            <span v-else>
              <img
                src="http://via.placeholder.com/300x300"
                alt="icon"
                class="app-icon"
              />
            </span>
          </span>

          <span v-else-if="props.column.field == 'name'">
            <span> {{ props.row.firstname }} {{ props.row.lastname }} </span>
          </span>

          <span v-else-if="props.column.field == 'total_score'">
            <span>{{ props.row.score }}</span>
          </span>
          <span v-else-if="props.column.field == 'count_challenge'">
            <span>{{ props.row.countChallenges }}</span>
          </span>

          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
      <div v-if="!this.events || !this.events.length">
        This event has no leaderboard yet
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "LeaderBoardEvent",
  data() {
    return {
      loadingTableData: true,
      columns: [
        {
          label: "Rank",
          field: "rank",
          filterable: true,
        },
        {
          label: "Icon",
          field: "icon",
          filterable: false,
        },
        {
          label: "Player",
          field: "name",
          filterable: true,
        },
        {
          label: "Score",
          field: "total_score",
          html: false,
        },
        {
          label: "Challenges",
          field: "count_challenge",
          html: false,
        },
      ],
      rows: [],
    };
  },
  computed: {
    ...mapState("event", ["events"]),
  },
  methods: {
    ...mapActions("event", ["leaderboard"]),

    goToEvent(id) {
      this.$router.replace("/events/" + id);
    },
  },
  async mounted() {
    this.loadingTableData = true;
    await this.leaderboard(this.$route.params.id);
    this.loadingTableData = false;
  },
};
</script>

<style lang="scss">
.page-vue-good-table {
  overflow: hidden;
}

.icon {
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 10px;
}
</style>

