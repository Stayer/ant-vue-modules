<template>
  <div>
    <!-- Таблица активностей -->
    <a-table
      :columns="columns"
      :data-source="feedback"
      :row-key="'_id'"
      size="small"
      :pagination="{pageSize: 100}"
    >

      <template
        slot="rating"
        slot-scope="text"
      >
        <a-rate count="4" :defaultValue="Math.round((text.reduce((a,b) => a + b.rating, 0) / text.length) * 2) / 2" allowHalf disabled/>
          ({{ Math.round((text.reduce((a,b) => a + b.rating, 0) / text.length) * 100) / 100 }})
      </template>
      <span
        slot="date"
        slot-scope="date"
      >
        {{ strToDt(date) }}
      </span>
    </a-table>
  </div>
</template>
<script>

import store from '@/store'
import FeedBackService from '@/controllers/FeedBackService'

const columns = [{
    title: 'Название',
    dataIndex: 'title',
    width: 300,
  }, {
    title: 'Рейтинг',
    dataIndex: 'rating',
    scopedSlots: { customRender: 'rating' },
    width: 180,
  }, {
    title: 'Дата',
    dataIndex: 'date',
    width: 110,
    scopedSlots: { customRender: 'date' },
  }, {
    title: 'Описание',
    dataIndex: 'description',
  }
  ]



export default {
  data() {
    return {
      columns,
      feedback: []
    }
  },
  // computed: {
  //   feedback: function () {
  //     return this.$store.getters.FEEDBACK
  //   }
  // },
  async created() {
    this.feedback = await FeedBackService.get()// this.$store.dispatch('fetchFeedback')
  },
  methods: {
    strToDt(str) {
      let date = new Date(str)
      return ("0" + (date.getHours().toString())).slice(-2) +
            ':' + ("0" + (date.getMinutes().toString())).slice(-2) +
            ", " + ("0" + date.getDate().toString()).slice(-2) +
            '.' + ("0" + (date.getMonth()+1).toString()).slice(-2)
    },
  }
}
</script>
<style>
.ant-table-body {
  margin: 0;
}
</style>
