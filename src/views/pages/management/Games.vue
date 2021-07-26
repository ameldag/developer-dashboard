<template>
  <div class="page-vue-good-table scrollable only-y">
    <div class="page-header">
      <h1>Manage your games</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"
          ><i class="mdi mdi-gamepad-right"></i
        ></el-breadcrumb-item>
        <el-breadcrumb-item>Management</el-breadcrumb-item>
        <el-breadcrumb-item>Games</el-breadcrumb-item>
        <el-breadcrumb-item>List</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        type="primary"
        class="text-truncate add-button"
        @click="addGamePage"
        >Add new game</el-button
      >
    </div>

    <div class="vue-good-table-box card-base card-shadow--medium">
      <vue-good-table
        v-loading="loadingTableData"
        :columns="columns"
        :rows="this.games"
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
              <img v-bind:src="props.row.icon" alt="icon" class="app-icon" />
            </span>
            <span v-else>
              <img
                src="http://via.placeholder.com/300x300"
                alt="icon"
                class="app-icon"
              />
            </span>
          </span>

          <span v-else-if="props.column.field == 'createdAt'">
            <span>{{ moment(props.row.createdAt).format("YYYY/MM/DD") }}</span>
          </span>

          <span v-else-if="props.column.field == 'name'">
            <el-button
              type="text"
              class="text-truncate"
              @click="GameProfile(props.row._id)"
              >{{ props.row.name }}</el-button
            >
          </span>

          <span v-else-if="props.column.field == 'game_status'">
            <span v-if="props.row.game_status == 'Running'">
              <el-button type="success" class="text-truncate" round>{{
                props.row.game_status
              }}</el-button>
            </span>
            <span v-else-if="props.row.game_status == 'Finished'">
              <el-button type="warning" class="text-truncate" round>{{
                props.row.game_status
              }}</el-button>
            </span>
            <span v-else>
              <el-button type="danger" class="text-truncate" round>{{
                props.row.game_status
              }}</el-button>
            </span>
          </span>
          <span v-else-if="props.column.field == 'event'">
            <el-button
              type="text"
              class="text-truncate"
              @click="getEventById(props.row._id)"
              >Show Event</el-button
            >
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
      <el-dialog :visible.sync="centerDialogVisible" width="60%" center>
        <el-table :data="eventsData" class="form-box"  style="width: 90%;	background-color: #fffff">
        <el-table-column prop="name" class="styled" label="Name" width="160">
        <template slot-scope="props">
              <p @click="goToEvent(props.row._id,
                  props.row.start_date,
                  props.row.end_date)">{{props.row.name}}
              </p>
        </template>
    </el-table-column>
        <el-table-column prop="end_date" :formatter="dateFormat" label="End Date" width="220">
        </el-table-column>
        <el-table-column prop="start_date" :formatter="dateFormat" label="Start Date" width="220">
        </el-table-column>
        <el-table-column  prop="status" align="center" label="Status" width="130">
          <template slot-scope="props">
                  <span v-if="props.row.status == true">
                    <el-button type="success" icon="el-icon-check" circle></el-button>
                  </span>
                  <span v-else>
                    <el-button type="danger" icon="el-icon-check" circle></el-button>
                  </span>
          </template>
        </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import eventService from "../../../services/event";
import moment from "moment";
export default {
  name: "Games",
  data() {
    return {
      loadingTableData: true,
      centerDialogVisible: false,
      eventsData: [],
      columns: [
        {
          label: "Icon",
          field: "icon",
          filterable: false,
        },
        {
          label: "App Name",
          field: "name",
          filterable: true,
        },
        {
          label: "Game Id",
          field: "_id",
          html: false,
          filterable: true,
        },
        {
          label: "Created",
          field: "createdAt",
          type: "string",
        },
        {
          label: "Status",
          field: "game_status",
          html: false,
        },
        {
          label: "Event",
          field: "event",
          filterable: true,
        },
      ],
    };
  },
  computed: {
    ...mapState("games", ["games"]),
  },
  methods: {
    ...mapActions("games", ["getGames"]),

    GameProfile(id) {
      this.$router.replace("/games/" + id);
    },
    addGamePage() {
      this.$router.replace("/games/new");
    },
    async getEventById(id) {
      this.centerDialogVisible = true;
      await eventService
        .retreiveAll({
          eventPeriode: "all",
          game_id: id,
        })
        .then((res) => {
          this.eventsData = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    goToEvent(id, start_date, end_date) {
      this.$router.replace(
        "/events/" + id + "?start_date=" + start_date + "&end_date=" + end_date
      );
    },
    dateFormat:function(row, column) {
          var date = row[column.property];
    if (date == undefined) {
        return "";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
  },
  beforeMount() {
    this.loadingTableData = true;
  },
  async mounted() {
    await this.getGames();
    this.loadingTableData = false;
  },
};
</script>

<style lang="scss">
@import "../../../assets/scss/_variables";
.page-vue-good-table {
  overflow: hidden;
}

.app-icon {
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 5px;
}

.add-button {
  float: right;
}

.card-date {
  -webkit-box-shadow: 0 3px 6px 0 rgba(40, 40, 90, 0.09),
    0 1px 1px 0 rgba(0, 0, 0, 0.065);
  box-shadow: 0 3px 6px 0 rgba(40, 40, 90, 0.09),
    0 1px 1px 0 rgba(0, 0, 0, 0.065);
  background-color: $card-background-color;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0px;
  padding: 10px 20px;
  font-weight: 900;
}

@media (max-width: 768px) {
  .add-button {
    float: left;
  }
}
</style>

