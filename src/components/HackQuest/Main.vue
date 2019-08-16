<template>
  <div>
    <h2>Таблица прогресса (обновляется онлайн)</h2>
    <a-table 
      :columns="progressColumns" 
      :dataSource="progressData"
      rowKey="_id"
      :pagination="{pageSize: 100}"
    >
      <span slot="status" slot-scope="status" >
        <a-tag
          :key="progress.status"
          :color="colors[status]"
        >{{ statuses[status] }}</a-tag>
      </span>
      <span slot="time" slot-scope="time">
        {{ time | moment("from", "now", true) }} назад
      </span>
    </a-table>
    <h2>Карта</h2>
    <div>
      <img src="/map.png" alt="map" width="100%">
    </div>
    <h2>Инфа по локациям</h2>
    <a-row>
      <div v-for="l in locations" :key="l._id">
        <a-col :span=7>
          <a-card :title="l.name">
            <span slot="extra">{{ l.place }}</span>
            Ответственный: <b>{{ l.volunteer.fullname }}</b><br>
            <b>Задания:</b><br>
            <div v-for="t in l.tasks" :key="t._id">
              <h4>{{ t.name }}</h4>
              Описание: <i>{{ t.desc }}</i><br>
              Время: <i>{{ t.time }} секунд </i><br>
              Стоимость: <i>{{ t.points }}</i><br>
              Флаг: <b>{{ t.flag }}</b><br>
              <hr>
            </div>
          </a-card>
        </a-col>
      </div>
    </a-row>
  </div>
</template>
<script>

import HackQuestService from '@/controllers/HackQuestService'
const progressColumns = [{
  title: 'Локация',
  dataIndex: 'location.name',
  key: 'location._id'
},
{
  title: 'Волонтёр',
  dataIndex: 'location.volunteer.fullname',
  key: 'volunteer._id'
},
{
  title: 'Команда',
  dataIndex: 'team.name',
  key: 'team._id'
},
{
  title: 'Время',
  dataIndex: 'time',
  key: 'time',
  scopedSlots: { customRender: 'time' },
},
{
  title: 'Статус',
  dataIndex: 'status',
  key: 'status',
  scopedSlots: { customRender: 'status' },
},
]

// const progressData = []
let teams, users, progress, locations, tasks
export default {
  data() {
    return {
      // progressData,
      progressColumns,
      teams,
      users,
      progress,
      locations,
      tasks,
      statuses: ['Бегут', 'Получают инструктаж (соц)', 'Выполняют соц.задание', 'Получают инструктаж (тех)', 'Делают тех. задание', 'Убежали'],
      colors: ['blue', 'orange', 'green', 'orange', 'green', 'red'],
      timer: ''
    }
  },
  async created () {
    this.loadData()
    this.timer = setInterval(this.loadData, 5000)
  },
  computed: {
    progressData () {
      return this.progress
    }
  },
  methods: {
    async loadData () {
      let data = await HackQuestService.get()
      this.teams = data.teams
      this.users = data.users
      this.progress = data.progress
      this.locations = data.locations
      this.tasks = data.tasks
    },
    cancelAutoUpdate: function() { clearInterval(this.timer) }
  },
  destroyed() {
    this.cancelAutoUpdate()
  },
}
</script>

<style scope>
  i {
word-wrap: break-word;
}
</style>
