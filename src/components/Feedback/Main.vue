<!-- https://gambardella.info/2017/09/13/vue-js-communication-part-2-parent-child-components/
https://ikfi.ru/article/vuex-models-prostoj-sposob-nauchit-vuex-rabotat-s-v-model -->
<template>
  <div>
    <h1>Отзывы участников</h1>
    <hr>
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <a-row>
      <a-col :span="24">
        <FeedBackList
        />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import FeedBackList from "./FeedBackList"
import store from "@/store"

export default {
  data() {
    return {
      error: "",
      text: "",
    }
  },
  components: {
    FeedBackList
  },
  created() {
    this.$store.dispatch('fetchFeedback')
  }
}
</script>
<style scoped>
.ant-table-body {
  margin: 0;
}
/* div {
  padding: 0 20px;
  line-height: 40px;
} */
</style>
