<!-- https://gambardella.info/2017/09/13/vue-js-communication-part-2-parent-child-components/
https://ikfi.ru/article/vuex-models-prostoj-sposob-nauchit-vuex-rabotat-s-v-model -->
<template>
  <div>
    <h1>Активности ЛШ</h1>
    <hr>
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <a-row>
      <!-- Верхнее меню -->
      <div style="margin-bottom: 16px">
        <a-button 
          type="primary" 
          @click="showActivityForm()"
        >
          Добавить
        </a-button>
      </div>
    </a-row>
    <a-row>
      <a-col :span="24">
        <ActivityList
          :cats="cats"
          @kaef="showActivityForm"
        />
      </a-col>
    </a-row>
    <ActivityForm
      ref="activityForm"
      :cats="cats"
    />
  </div>
</template>
<script>
import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm"
import store from "@/store"

export default {
  components: {
    ActivityList,
    ActivityForm
  },
  data() {
    return {
      error: "",
      text: "",
      cats: ['разовая', 'ежедневная', 'командная', 'от лектора', 'неограниченная']
    }
  },
  computed: {
    activities: function () {
      return store.getters.ACTIVITIES
    }
  },
  created() {
    this.$store.dispatch('fetchActivities')
  },
  methods: {
    showActivityForm(record=undefined) {
      this.$refs.activityForm.showModal(record)
    }
  }
}
</script>
<style scoped>
.ant-table-body {
  margin: 0;
}
/* div {
  padding: 0 20px;
  line-height: 40px;
} */
</style>
