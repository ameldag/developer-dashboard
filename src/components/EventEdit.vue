<template>
  <div class="page-event-edit">
    <div class="page-header">
      <h1 v-if="action == 'Update'">{{ action }} {{this.currentEvent.name.toLowerCase().trim()}} event</h1>
      <h1 v-else> {{action}} event </h1>
    </div>
    <el-form
      ref="currentEvent"
      :rules="currentRules"
      :model="event"
      label-width="120px"
      :label-position="labelPosition"
    >
      <div class="card-base card-shadow--medium info" style="padding: 20px">
        <el-steps
          :active="active"
          finish-status="success"
          style="padding-bottom: 30px"
          align-center
        >
          <el-step title="Informations"></el-step>
          <el-step title="Additional Information"></el-step>
        </el-steps>
        <div v-if="active === 0">
          <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
            <el-form-item label="Event Name" prop="name">
              <el-input type="text" v-model="event.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
            <el-form-item label="Description" prop="description">
              <textarea v-model="event.description" autosize></textarea>
            </el-form-item>
          </el-col>
          <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
            <el-form-item label="Select Game" prop="games">
              <el-select v-model="event.game_id" placeholder="Select">
                <el-option
                  v-for="item in this.games"
                  :key="item.value"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
            <el-form-item label="Status" prop="status">
              <el-radio-group v-model="event.status">
                <el-radio :label="true" border>Active</el-radio>
                <el-radio :label="false" border>Disabled</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </div>

        <div v-if="active === 1">
          <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
            <el-form-item label="Beginging of Event :" prop="start_date">
              <el-date-picker
                class="dateClass"
                v-model="event.start_date"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="startDatePicker"
                placeholder="pick a start date"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p mr-20">
            <el-form-item label="End of Event :" prop="end_date">
              <el-date-picker
                v-model="event.end_date"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="pick a end date"
                :picker-options="endDatePicker"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            :md="12"
            :sm="24"
            :xs="24"
            class="col-p mr-20 flex-display"
          >
            <el-form-item label="Icon" prop="icon">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                @change="processIcon"
              />
              <img
                width="50px"
                heigth="50px"
                :src="event.icon"
                v-if="event.icon"
              />
            </el-form-item>
          </el-col>

          <el-col
            :span="12"
            :md="12"
            :sm="24"
            :xs="24"
            class="col-p mr-20 flex-display"
          >
            <el-form-item label="Background" prop="background_image">
              <input
                name="backgrounginput"
                type="file"
                accept=".jpg, .jpeg, .png"
                @change="processBackground"
              />
              <img
                width="50px"
                heigth="50px"
                :src="event.background_image"
                v-if="event.background_image"
              />
            </el-form-item>
          </el-col>
        </div>
        <el-col class="col-p">
          <el-form-item>
            <el-button @click="back" v-if="active !== 0">Back</el-button>
            <el-button
              type="primary"
              style="float: right"
              @click="next('currentEvent')"
              >Next</el-button
            >
          </el-form-item>
        </el-col>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "EventEdit",
  props: ["action", "currentEvent"],
  watch: {
    currentEvent: function (newVal, oldVal) {
      // watch it
      this.event = { ...newVal };
    },
  },
  data() {
    return {
      active: 0,
      labelPosition: "left", //left, right, or top
      event: {
        name: "",
        game_id: "",
        start_date: "",
        end_date: "",
        description: "",
        icon: "",
        status: null,
      },
      rules: {
        0: {
          name: [
            {
              required: true,
              message: "Please enter event name",
              trigger: "change",
            },
          ],
          game_id: [
            {
              required: true,
              message: "Please select game",
              trigger: "change",
            },
          ],
          status: [
            {
              required: true,
              message: "Please choose status",
              trigger: "change",
            },
          ],
        },
        1: {
          start_date: [
            {
              type: "string",
              required: true,
              message: "Please pick a start date",
              trigger: "change",
            },
          ],
          end_date: [
            {
              type: "string",
              required: true,
              message: "Please pick an end date",
              trigger: "change",
            },
          ],
          icon: [
            {
              validator: (rule, value, callback, source, options) => {
                if (value === "") {
                  callback(new Error("Please upload an icon"));
                } else {
                  callback();
                }
              },
              trigger: "change",
            },
          ],
          background_image: [
            {
              validator: (rule, value, callback, source, options) => {
                if (value === "") {
                  callback(new Error("Please upload a backgroud image"));
                } else {
                  callback();
                }
              },
              trigger: "change",
            },
          ],
        },
      },
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
    };
  },
  computed: {
    ...mapState("games", ["games"]),

    currentRules() {
      return this.rules[this.active];
    },
  },
  props: {
    action: String,
    currentEvent: Object,
  },
  methods: {
    ...mapActions("event", ["add", "update"]),
    ...mapActions("games", ["getGames"]),

    back() {
      this.active--;
    },
    next(currentEvent) {
      this.$refs[currentEvent].validate(async (valid) => {
        if (valid) {
          if (this.active == 1) {
            this.$store.commit("setSplashScreen", true);
            if (this.action == "Update") {
              const formData = new FormData();
              await Object.keys(this.event).forEach((key) => {
                formData.append(key, this.event[key]);
              });
              await this.update({
                id: this.$route.params.id,
                data: formData,
              })
                .then((res) => {
                  this.$router.replace("/management/events");
                  this.$store.commit("setSplashScreen", false);
                })
                .catch((error) => {
                  return error.response;
                  this.$store.commit("setSplashScreen", false);
                });
            } else {
              const formData = new FormData();
              await Object.keys(this.event).forEach((key) => {
                formData.append(key, this.event[key]);
              });
              await this.add(formData)
                .then((res) => {
                  this.$router.replace("/management/events");
                  this.$store.commit("setSplashScreen", false);
                })
                .catch((error) => {
                  console.error(error);

                  this.$store.commit("setSplashScreen", false);
                  return error.response;
                });
            }
          } else {
            this.active++;
          }
        } else {
          return false;
        }
      });
    },
    resizeLabelPosition() {
      if (window.innerWidth <= 768) {
        this.labelPosition = "top";
      }
    },
    async processIcon($event) {
      if (event.target.files.length) {
        this.event.icon = event.target.files[0];
      }
    },
    async processBackground($event) {
      if (event.target.files.length) {
        this.event.background_image = event.target.files[0];
      }
    },
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.event.end_date) {
            // If the end time is not empty, it is less than the end time
            return new Date(self.event.end_date).getTime() < time.getTime();
          } else {
          }
        },
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.event.start_date) {
            // If the start time is not empty, the end time is greater than the start time
            return new Date(self.event.start_date).getTime() > time.getTime();
          } else {
            // return time.getTime()> Date.now()// When the start time is not selected, the maximum end time is less than or equal to the current day
          }
        },
      };
    },
    async mounted() {
      await this.getGames();
      this.resizeLabelPosition();
      window.addEventListener("resize", this.resizeLabelPosition);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.resizeLabelPosition);
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '../../assets/scss/_variables';

.page-event-edit {
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
