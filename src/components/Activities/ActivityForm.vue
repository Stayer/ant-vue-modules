<template>
  <div>
    <a-modal
      v-model="visible"
      title="Управление активностью"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="ID"
        >
          <a-input
            v-decorator="[
              '_id',
              {
                initialValue: activity._id || null
              },
            ]"
            :disabled="true"
            placeholder="Вводить ничего не нужно"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Название"
        >
          <a-input
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Название активности не может быть пустым!' }],
                initialValue: activity.title || null
              },
            ]"
            placeholder="Введите название активности"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="Описание"
        >
          <a-textarea 
            v-decorator="[
              'body',
              {
                rules: [{ required: true, message: 'Описание активности не может быть пустым!' }],
                initialValue: activity.body || null
              }
            ]"
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder="Введите описание активности (поддерживается Markdown)"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="Категория"
        >
          <a-select
            v-decorator="[
              'cat',
              {
                rules: [{ required: true, message: 'Обязательно выберите категорию' }],
                initialValue: cats[activity.cat]
              }
            ]"
          >
            <a-select-option
              v-for="(cat, index) in cats"
              :key="index"
              :value="index"
            >
              {{ cat }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="Тэги"
        >
          <a-select
            v-decorator="[
              'tags',
              {
                rules: [{ required: true, message: 'Обязательно укажите тэги активности' }],
                initialValue: activity.tags
              }
            ]"
            mode="tags"
            :token-separators="[',']"
          >
            <a-select-option
              v-for="tag in tags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          key="back"
          @click="handleCancel"
        >
          Выйти
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          <template v-if="Object.keys(activity).length==0">
            Добавить
          </template>
          <template v-else>
            Изменить
          </template>
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>

import store from '@/store'
import ActivityService from '../../controllers/ActivityService';
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16, offset: 1 },
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 11, offset: 1 },
}

export default {
  props: {
    cats: { type: Array, required: false, default: () => {return []} }
  },
  data () {
    return {
      activity: {},
      tags: ['SocialE', 'Crypto', 'Web', 'Hardware', 'КУИ', 'Reverse', 'Admin', 'ID', 'Forensic', 'CTF', 'Other', 'Sport'],
      loading: false,
      visible: false,
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
    }
  },
  computed: {
  },
  methods: {
    onChange (date, dateString) {
      console.log(date, dateString);
    },
    showModal (record) {
      if (record != undefined)
        this.activity = record
      this.visible = true
    },
    handleOk (e) {
      this.form.validateFields(
        async (err, values) => { 
          if (!err) {
            await ActivityService.add(values)      
            this.$store.dispatch('fetchActivities')
            this.loading = true
            setTimeout(() => {
              this.visible = false
              this.loading = false
            }, 3000)
          }
        },
      )
    },
    handleCancel (e) {
      this.visible = false
      this.loading = false
      this.activity = {}
      this.$store.dispatch('fetchActivities')
    },
    handleChange (e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    }
  }
}
</script>
<style>
  .ant-form-item {
    /* margin-bottom: 0; */
  }
  /* .tag li {
    background-color: black !important;
  } */
</style>