<template>
  <div>
    <a-menu
      v-model="current"
      mode="horizontal"
    >
      <a-menu-item
        key="users"
      >
        <router-link to="/users">
          <a-icon type="user" />
          Пользователи
        </router-link>
      </a-menu-item>
      <a-menu-item
        key="teams"
      >
        <router-link to="/teams">
          <a-icon type="team" />
          Команды
        </router-link>
      </a-menu-item>
      <a-menu-item
        key="activities"
      >
        <router-link to="/activities">
          <a-icon type="rocket" />
          Активности
        </router-link>
      </a-menu-item>
      <a-menu-item
        key="calendar"
      >
        <router-link to="/calendar">
          <a-icon type="calendar" />
          Календарь
        </router-link>
      </a-menu-item>
      <a-menu-item
        key="hackquest"
      >
        <router-link to="/hackquest">
          <a-icon type="trophy" />
          Хак-квест
        </router-link>
      </a-menu-item>
      <a-menu-item
        key="feedback"
      >
        <router-link to="/feedback">
          <a-icon type="trophy" />
          Отзывы
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>

export default {
  data() {
    return {
      current: []
    }
  },
}
</script>
<style>
.ant-menu-horizontal {
  line-height: 64px;
}
</style>
