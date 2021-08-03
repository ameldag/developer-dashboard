<template>
  <div class="page-vue-good-table scrollable only-y">
    <div class="page-header">
      <h1>
        <span
          >Manage your events
          <button @click="getPastEventPage()">
            <i class="mdi mdi-archive"></i>
          </button>
        </span>
      </h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"
          ><i class="mdi mdi-gamepad-right"></i
        ></el-breadcrumb-item>
        <el-breadcrumb-item>Management</el-breadcrumb-item>
        <el-breadcrumb-item>Events</el-breadcrumb-item>
        <el-breadcrumb-item>List</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        type="primary"
        class="text-truncate add-button"
        @click="addEventPage"
        >Create Event</el-button
      >
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
          <span v-if="props.column.field == 'icon'">
            <span v-if="props.row.icon">
              <img v-bind:src="props.row.icon" alt="icon" class="icon" />
            </span>
            <span v-else>
              <img
                src="http://via.placeholder.com/300x300"
                alt="icon"
                class="icon"
              />
            </span>
          </span>

          <span v-else-if="props.column.field == 'createdAt'">
            <span>{{ getEventDate(props.row.createdAt) }}</span>
          </span>

          <span v-else-if="props.column.field == 'start_date'">
            <span>{{ getEventDate(props.row.start_date) }}</span>
          </span>

          <span v-else-if="props.column.field == 'end_date'">
            <span>{{ getEventDate(props.row.end_date) }}</span>
          </span>

          <span v-else-if="props.column.field == 'name'">
            <el-button
              type="text"
              class="text-truncate"
              @click="
                goToEvent(
                  props.row._id,
                  props.row.start_date,
                  props.row.end_date
                )
              "
              >{{ props.row.name }}</el-button
            >
          </span>

          <span v-else-if="props.column.field == 'status'">
            <span v-if="props.row.status == true">
              <el-button type="success" icon="el-icon-check" circle></el-button>
            </span>
            <span v-else>
              <el-button type="danger" icon="el-icon-check" circle></el-button>
            </span>
          </span>

          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
export default {
  name: "Events",
  watch: {
    $route: function () {
      if (this.$route.name === "events_management") {
        this.init();
      } else if (this.$route.name === "past_event") {
        this.getPastEventPage();
      }
    },
  },
  data() {
    return {
      loadingTableData: true,
      columns: [
        {
          label: "Icon",
          field: "icon",
          filterable: false,
        },
        {
          label: "Name",
          field: "name",
          html: true,
          filterable: true,
        },
        {
          label: "Game",
          field: "game_id.name",
          filterable: true,
        },
        {
          label: "Status",
          field: "status",
          html: false,
          filterable: true,
        },
        {
          label: "Starts At",
          field: "start_date",
          type: "string",
        },
        {
          label: "Ends At",
          field: "end_date",
          type: "string",
        },
      ],
    };
  },
  computed: {
    ...mapState("event", ["events"]),
  },
  methods: {
    ...mapActions("event", ["getEvents"]),

    goToEvent(id, start_date, end_date) {
      this.$router.replace(
        "/events/" + id + "?start_date=" + start_date + "&end_date=" + end_date
      );
    },
    addEventPage() {
      this.$router.replace("/events/new");
    },
    getEventDate: function (date) {
      return moment(date, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
    },
    async getPastEventPage() {
      await this.getEvents({
        eventPeriode: "pastEvent",
      }).then(async (res) => {
        await this.$router.replace("/management/events/past");
      });
    },
    async init() {
      await this.getEvents({
        eventPeriode: "",
      });
    },
  },
  async mounted() {
    this.loadingTableData = true;
    this.init();
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

.add-button {
  float: right;
}

@media (max-width: 768px) {
  .add-button {
    float: left;
  }
}
</style>

