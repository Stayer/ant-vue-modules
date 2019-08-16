<template>
  <div>
    <!-- Верхнее меню -->
    <!-- <div style="margin-bottom: 16px">
      <a-button
        type="primary"
        :loading="loading"
        @click="start"
      >
        Добавить активность
      </a-button>
      &nbsp;
      <a-button
        type="primary"
        :disabled="!hasSelected"
        :loading="loading"
        @click="start"
      >
        Написать
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Выбрано ${selectedRowKeys.length} активностей` }}
        </template>
      </span>
    </div> -->
    <!-- Таблица активностей -->
    <a-table
      :columns="columns"
      :data-source="activities"
      :row-selection="rowSelection"
      :row-key="'_id'"
      size="small"
      :pagination="{pageSize: 100}"
    > 
      <span
        slot="tags"
        slot-scope="tags"
      >
        <a-tag
          v-for="tag in tags"
          :key="tag"
          color="blue"
        >{{ tag }}</a-tag>
      </span>
      <span
        slot="cat"
        slot-scope="cat"
      >
        <a-tag
          :key="cat"
          color="green"
        >{{ cats[cat] }}</a-tag>
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
        slot="action"
        slot-scope="text, record"
      >
        <a
          href="javascript:;"
          @click="showActivityForm(record)"
        >Изменить</a>
        <a-divider type="vertical" />

        <a-popconfirm
          title="Вы уверены?"
          @confirm="() => onDelete(record._id)"
        >
          <a href="javascript:;">Удалить</a>
        </a-popconfirm>
        <!-- <a-divider type="vertical" />
        <a
          href="javascript:;"
          class="ant-dropdown-link"
        >
          Больше действий 
          <a-icon type="down" />
        </a> -->
      </span>
    </a-table>
  </div>
</template>
<script>

import store from '@/store'
import ActivityService from "@/controllers/ActivityService"

const columns = [{
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
    // slots: { title: 'customTitle' },
    // scopedSlots: { customRender: 'title' },
  }, {
    title: 'body',
    dataIndex: 'body',
    key: 'body',
  }, {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' },
  }, {
    title: 'Категория',
    dataIndex: 'cat',
    key: 'cat',
    scopedSlots: { customRender: 'cat' },
  }, {
    title: 'Тэги',
    dataIndex: 'tags',
    key: 'tags',
    scopedSlots: { customRender: 'tags' },
  }, {
    title: 'Действия',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  }]



export default {
  props: {
    cats: { 
      type: Array, 
      required: false
    }
  },
  data() {
    return {
      columns,
      selectedRowKeys: [],
      loading: false
    }
  },
  computed: {
    activities: function () {
      return store.getters.ACTIVITIES
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
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    async onDelete (key) {
      try {
        await ActivityService.delete(key)      
        this.$store.dispatch('fetchActivities')
      } catch(ex) {
        console.log(ex)
      }
    },
    async statusChange (key, record) {
      try {
        await ActivityService.edit(record._id, 'status', key == true ? 1 : 0)
        let type = key == true ? 'success' : 'error'
        let desc = key == true ? 'Вы запустили активность ' + record.title + '. Теперь игроки смогут её видеть, сдавать флаги для неё и получать баллы. Не забывайте отключать активности, если они не нужны' : 
        'Вы остановили активность ' + record.title + '. Теперь игроки смогут её видеть, НО сдавать флаги для неё и получать баллы они НЕ СМОГУТ (при этом флаги останутся активны). Не забывайте отключать активности, если они не нужны' 
        
        this.$notification[type]({
          message: record.title,
          duration: 6,
          description: desc ,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        })

        this.$store.dispatch('fetchActivities')
      } catch(ex) {
        console.log(ex)
      }
    },
    showActivityForm(record=null) {
      this.$emit('kaef', record)
      // this.$refs.activityForm.showModal(record)
    }
  },
}
</script>
<style>
.ant-table-body {
  margin: 0;
}
</style>
