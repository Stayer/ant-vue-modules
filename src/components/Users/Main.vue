<template>
  <div>
    <h1>Пользователи Telegram</h1>
    <hr>
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <a-row>
      <a-col :span="24">
        <UserList />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import UserList from "./UserList";
// import UserProfile from "./UserProfile";
import store from "../../store"

export default {
  components: {
    UserList
  },
  data() {
    return {
      error: "",
      text: ""
    };
  },
  computed: {
    users: function () {
      return store.getters.USERS
    }
  },
  created() {
    this.$store.dispatch('fetchUsers')
  }
};
</script>
<style scoped>
/* div {
  padding: 0 20px;
  line-height: 40px;
} */
</style>
