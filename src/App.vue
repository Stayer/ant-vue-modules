<template>
  <div id="app">
    <a-layout>
      <!-- <a-layout-sider>Sider</a-layout-sider> -->
      <a-layout>
        <a-layout-header><TopMenu /></a-layout-header>
        <a-layout-content><router-view /></a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<style>
#app {
  /* text-align: center; */
}
#app .ant-layout-header {
  padding: 0;
  line-height: 46px;
  height: 46px;
}
#app .ant-layout-header,
#app .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#app .ant-layout-footer {
  line-height: 1.5;
}
#app .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#app .ant-layout-content {
  /* background: rgba(16, 142, 233, 1); */
  color: #fff;
  /* min-height: 120px;
  line-height: 120px; */
  padding: 20px 10px 10px 10px;
  /* padding-top: 20px; */
}
#app > .ant-layout {
  margin-bottom: 48px;
}
#app > .ant-layout:last-child {
  margin: 0;
}
</style>

<script>
import TopMenu from './components/TopMenu.vue'
import store from "@/store"

export default {
  name: 'App',
  components: {
    TopMenu
  },
  data() {
    return {
    }
  },
  created () {
    this.$store.dispatch('fetchUsers').then(() => {
      console.log('Юзеры готовы')
    })
    this.$store.dispatch('fetchTeams').then(() => {
      console.log('Команды готовы')
    })
    this.$store.dispatch('fetchActivities').then(() => {
      console.log('Активности готовы')
    })
  }
}
</script>