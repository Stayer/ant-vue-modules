<template>
  <div>
    <h1>Команды летней школы</h1>
    <hr>
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <a-row>
      <a-col :span="24">
        <TeamList @kaef="showModal" />
      </a-col>
    </a-row>
    <TeamAddForm ref="collectionForm" />
  </div>
</template>
<script>
import TeamList from "./TeamList"
import TeamAddForm from "./TeamAddForm"
import store from '@/store'
export default {
  components: {
    TeamList,
    TeamAddForm
  },
  data() {
    return {
      error: "",
      text: ""
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
  
  created() {
    this.$store.dispatch('fetchUsers')
    this.$store.dispatch('fetchTeams')
  },
  methods: {
    showModal() {
      this.$refs.collectionForm.showModal()
    }
  }
}
</script>
<style scoped>
/* div {
  padding: 0 20px;
  line-height: 40px;
} */
</style>
