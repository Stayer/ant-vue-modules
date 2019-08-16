<template>
  <div>
    <!-- Верхнее меню -->
    <div style="margin-bottom: 16px">
      <!-- <a-button
        type="primary"
        :disabled="!hasSelected"
        :loading="loading"
        indent-size="90"
        @click="start"
      >
        Создать команду
      </a-button>
      &nbsp;
      <a-button
        type="primary"
        :disabled="!hasSelected"
        :loading="loading"
        @click="start"
      >
        Написать
      </a-button> -->
      <a-popconfirm placement="topLeft" okText="Да" cancelText="Нет" @confirm="deleteMany">        
        <template slot="title">
          Удалить юзеров?<br>Их прогресс очистится!
        </template>
        <a-button
          type="primary"
          :loading="loading"
          :disabled="!hasSelected"
        >
          Удалить
        </a-button>
      </a-popconfirm>
      &nbsp;
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          <span style="color: black;">{{ `Выбрано ${selectedRowKeys.length} участников` }}</span>
        </template>
      </span>
    </div>
    <!-- Таблица команд -->
    <a-table
      :columns="columns"
      :data-source="users"
      :row-selection="rowSelection"
      :row-key="'_id'"
      size="small"
      :pagination="{pageSize: 100}"
    > 

      <span slot="customTitle">Имя</span>
      <template
        slot="name"
        slot-scope="text, record"
      >
        <EditableCell
          :text="text"
          @change="onCellChange(record._id, 'fullname', $event)"
        />
      </template>
      <template
        slot="access"
        slot-scope="text"
      >
        <a-icon
          :type="accessIcon(text)"
          class="test"
          theme="outlined"
        />
        <span style="display:none;">{{ text }}</span>
      </template>

      <template
        slot="rfid"
        slot-scope="text, record"
      >
        <EditableCell
          :text="text"
          @change="onCellChange(record._id, 'rfid', $event)"
        />
      </template>
      <template
        slot="living"
        slot-scope="text, record"
      >
        <EditableCell
          :text="text"
          @change="onCellChange(record._id, 'living', $event)"
        />
      </template>
      <!-- <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
      </span> -->
      <!-- <span
        slot="action"
        slot-scope="text, record"
      >
        <a
          href="javascript:;"
          @click="handleAdd(record._id)"
        >Пригласить 一 {{ record.username }}</a>
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
import UserService from "../../controllers/UserService"
import EditableCell from '../helpers/EditableCell'

const columns = [{
    title: 'id',
    dataIndex: '_id',
    width: 95,
    sorter: true
  }, {
    dataIndex: 'fullname',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
    width: 220,
    sorter: (a, b) => a.fullname.localeCompare(b.fullname),
  }, {
    title: 'Никнейм',
    dataIndex: 'username',
    width: 150,
    sorter: true
  }, {
    title: 'Доступ',
    dataIndex: 'access',
    scopedSlots: { customRender: 'access' },
    filters: [
      { text: 'Админ', value: '2' },
      { text: 'Волонтёр', value: '1' },
      { text: 'Участник', value: '0' },
    ],
    width: 75,
    align: 'center',
    onFilter: (value, record) => record.access==parseInt(value),
    sorter: (a, b) => a.access - b.access,
  }, {
    title: 'Очки',
    dataIndex: 'points',
    width: 85,
    align: 'center'
  }, {
    title: 'Код RFID',
    dataIndex: 'rfid',
    width: 140,
    scopedSlots: { customRender: 'rfid' }
  }, {
    title: 'Живёт',
    dataIndex: 'living',
    width: 200,
    scopedSlots: { customRender: 'living' },
    sorter: (a, b) => a.living.localeCompare(b.living),
  }, {
    title: 'Действия',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  }]



export default {
  components: {
    EditableCell,
  },
  data() {
    return {
      columns,
      selectedRowKeys: [],
      loading: false,
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
        const target = this.users.find(item => item['_id'] === id)
        if (target) {
          target[dataIndex] = key
          UserService.edit(id, dataIndex, key)
        }
        this.$store.dispatch('fetchUsers')
    },
    accessIcon (access) {
      if (access==0)
        return 'user'
      else if (access==1)
        return 'android'
      else if (access==2)
        return 'crown'
      else
        return 'yuque'
    },
    async deleteMany (keys) {
      for (let i in this.selectedRowKeys)
        await UserService.delete(this.selectedRowKeys[i])
      this.$store.dispatch('fetchUsers')
    },
  },
}
</script>

<style scope>
.editable-cell {
  position: relative;
  margin: 0;
  padding: 0;
  line-height: 23px;
}
/* .anticon {
  line-height: 28px !important;
} */
.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 23px;
}
.editable-cell-input-wrapper > .ant-input {
  height: 23px;
  padding: 1px 2px;
}
/* .editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
} */

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
  line-height: 30px !important;
}

.editable-cell-icon {
  display: none;
}

.editable-cell-icon-check {
  line-height: 30px !important;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
} */

.editable-cell-icon:hover, */
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
td {
  padding: 3px 5px !important;
}
.test {
  text-align: center;
  position: relative;
  float: left;
  /* top: 50%; */
  left: 50%;
  transform: translate(-50%, -8%);
  /* margin-left: 0 auto; */
}

.ant-table-small > .ant-table-content > .ant-table-body {
  margin: 0;
}
</style>
