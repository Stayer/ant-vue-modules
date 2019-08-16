<template>
  <div>
    <!-- Верхнее меню -->
    <div style="margin-bottom: 16px">
      <a-button 
        type="primary" 
        @click="showModal"
      >
        Добавить
      </a-button>
      &nbsp;
      <a-button
        type="primary"
        :loading="loading"
        :disabled="!hasSelected"
        @click="deleteMany"
      >
        Удалить
      </a-button>
      &nbsp;
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Выбрано ${selectedRowKeys.length} команд` }}
        </template>
      </span>
    </div>

    <a-table 
      :columns="columns"
      :data-source="teams"
      :row-selection="rowSelection"
      :row-key="'_id'"
      size="small"
      :pagination="{pageSize: 100}"
    >
      <template
        slot="name"
        slot-scope="text, record"
      >
        <EditableCell
          :text="text"
          @change="onCellChange(record._id, 'name', $event)"
        />
      </template>
      <span
        slot="users"
        slot-scope="text, record"
      >
        <a-tag
          v-for="user in record.users"
          :key="user"
          color="blue"
        >{{ users.find(x => x._id === user).fullname }}</a-tag>
      </span>
      <span
        slot="status"
        slot-scope="status, record"
      >
        <a-switch 
          :default-checked="status == 1 ? true : false"
          @change="statusChange($event, record)"
        >
          <a-icon type="check" />
          <a-icon type="close" />
        </a-switch>
      </span>
      <span
        slot="start_date"
        slot-scope="start_date"
      >
        {{ strToDay(start_date) }}
      </span>
      <span
        slot="end_date"
        slot-scope="end_date"
      >
        {{ strToDay(end_date) }}
      </span>
    <!-- <span
      slot="action"
      slot-scope="text, record"
    >
      <a
        href="javascript:;"
        @click="handleAdd(record._id)"
      >Пригласить 一 {{ record.name }}</a>
      <a-divider type="vertical" />
      <a
        href="javascript:;"
        @click="onDelete(record.id)"
      >Удалить</a>
      <a-divider type="vertical" />
      <a
        href="javascript:;"
        class="ant-dropdown-link"
      >
        Больше действий
        <a-icon type="down" />
      </a>
    </span> -->
    </a-table>
  </div>
</template>
<script>

import store from '@/store'
import TeamService from "@/controllers/TeamService"
import EditableCell from '@/components/helpers/EditableCell'

const columns = [{
  dataIndex: 'name',
  key: 'name',
  title: "Название",
  scopedSlots: { customRender: 'name' },
},{
  title: 'Очки',
  dataIndex: 'points',
  key: 'points',
},{
  title: 'Состав',
  dataIndex: 'users[0]',
  key: 'users',
  scopedSlots: {customRender: 'users'},
},{
  title: 'Статус',
  dataIndex: 'status',
  key: 'status',
  scopedSlots: {customRender: 'status'},
},{
  title: 'Начало',
  dataIndex: 'dates[0]',
  key: 'start_date',
  scopedSlots: {customRender: 'start_date'},
},{
  title: 'Конец',
  dataIndex: 'dates[1]',
  key: 'end_date',
  scopedSlots: {customRender: 'end_date'},
}
// ,{
//   title: 'Действия',
//   key: 'action',
//   scopedSlots: { customRender: 'action' },
// }
]

export default {
  components: {
    EditableCell,
  },
  data() {
    return {
      columns: columns,
      selectedRowKeys: [],
      loading: false
    }
  },
  computed: {
    teams: function () {
      return this.$store.getters.TEAMS
    },
    users: function () {
      return this.$store.getters.USERS
    },
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
    rowSelection: function() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [{
          key: 'all-data',
          text: 'Выбрать все',
          onSelect: () => {
            console.log('selectedRowKeys changed: ', selectedRowKeys)
            // eslint-disable-next-line
            this.selectedRowKeys = selectedRowKeys
          },
        }, {
          key: 'odd',
          text: 'Выбрать нечётные',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = []
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                return index % 2 !== 0 ? false: true
            })
            console.log('selectedRowKeys changed: ', newSelectedRowKeys)
            // eslint-disable-next-line
            this.selectedRowKeys = newSelectedRowKeys
          },
        }, {
          key: 'even',
          text: 'Выбрать чётные',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = []
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                return index % 2 !== 0 ? true: false
            })
            console.log('selectedRowKeys changed: ', newSelectedRowKeys)
            // eslint-disable-next-line
            this.selectedRowKeys = newSelectedRowKeys
          },
        }],
        onSelection: this.onSelection,
      }
    }
  },
  methods: {
    start () {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onCellChange (id, dataIndex, key) {
        const target = this.teams.find(item => item['_id'] === id)
        if (target) {
          target[dataIndex] = key
          TeamService.edit(id, dataIndex, key)
        }
    },
    onDelete (key) {
      const dataSource = [...this.teams]
      this.teams = dataSource.filter(item => item.key !== key)
    },
    async statusChange (key, record) {
      try {
        await TeamService.edit(record._id, 'status', key == true ? true : false)
        let type = key == true ? 'success' : 'error'
        let desc = key == true ? 'Вы активировали команду ' + record.name + '. Теперь игроки будут привязаны к ней. Проверяйте, чтобы у одного игрока одновременно не было двух активных команд' : 
          'Вы остановили команду ' + record.name + '. Теперь игроки НЕ будут привязаны к ней. Проверяйте, чтобы у одного игрока одновременно не было двух активных команд'        
        this.$notification[type]({
          message: record.title,
          duration: 6,
          description: desc ,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        })

        this.$store.dispatch('fetchTeams')
        this.$store.dispatch('fetchUsers')
      } catch(ex) {
        console.log(ex)
      }
    },
    async deleteMany (keys) {
      for (let i in this.selectedRowKeys)
        await TeamService.delete(this.selectedRowKeys[i])
      this.$store.dispatch('fetchUsers')
      this.$store.dispatch('fetchTeams')
    },
    strToDay(str) {
      let date = new Date(str)
      return ("0" + date.getDate().toString()).slice(-2) +
              '.' + ("0" + (date.getMonth()+1).toString()).slice(-2) +
              '.' + date.getFullYear()
    },
    showModal() {
      this.$emit('kaef')
    }
  },
}
</script>