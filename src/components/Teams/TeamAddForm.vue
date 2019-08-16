<template>
  <a-modal
    v-model="visible"
    title="Title"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Название"
      >
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: 'Название команды не может быть пустым!' }]}
          ]"
          placeholder="Введите название команды"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="Участники"
      >
        <a-select
          v-decorator="[
            'users', {
              rules: [{ required: true, message: 'Размер команды от 2 до 7!', type: 'array', min: 2, max: 8 }],
            }]"
          mode="multiple"
          placeholder="Добавьте участников в команду"
        >
          <a-select-option
            v-for="i in users"
            :key="i.fullname"
          >
            {{ i.fullname }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Период"
      >
        <a-range-picker 
          v-decorator="[ 'dates', {rules: [{ type: 'array', required: true, message: 'Укажите срок жизни команды!' }]} ]"
          @change="onChange"
        />
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
        Создать
      </a-button>
    </template>
  </a-modal>
</template>
<script>

import store from '@/store'
import TeamService from '../../controllers/TeamService';
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16, offset: 1 },
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 11, offset: 1 },
}

export default {
  data() {
    return {
      loading: false,
      visible: false,
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    teams: function () {
      return store.getters.TEAMS
    },
    users: function () {
      return store.getters.USERS
    }
  },
  methods: {
    onChange(date, dateString) {
      // console.log(date, dateString);
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.form.validateFields(
        async (err, values) => { 
          if (!err) {
            let _users = []
            for (let user of values.users) {
              _users.push(this.users.find(_u => _u.fullname == user)['_id'])
            }
            values.users = _users
            await TeamService.add(values)
            this.$store.dispatch('fetchTeams')
            this.$store.dispatch('fetchUsers')
            this.loading = true
            setTimeout(() => {
              this.visible = false
              this.loading = false
            }, 3000)
          }
        },
      )
    },
    handleCancel(e) {
      this.$store.dispatch('fetchTeams')
      this.$store.dispatch('fetchUsers')
      this.visible = false
    }
  }
}
</script>
<style scope>
  .ant-modal {
    margin-right: 10px;

  }
  .ant-form-item {
    /* margin-bottom: 0; */
  }
</style>