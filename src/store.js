// https://webdevblog.ru/osvoenie-vuex-ot-prostogo-k-slozhnomu/

import Vuex from 'vuex'
import Vue from 'vue'

import TeamService from "@/controllers/TeamService"
import UserService from "@/controllers/UserService"
import ActivityService from "@/controllers/ActivityService"
import FeedBackService from "@/controllers/FeedBackService"

Vue.use(Vuex)

//init store
const store = new Vuex.Store({
    state: {
        users: [],
        teams: [],
        activities: [],
     },
     getters : {
       USERS : state => {
         return state.users;
       },
       TEAMS : state => {
         return state.teams;
       },
       ACTIVITIES : state => {
         return state.activities;
       },
       FEEDBACK : state => {
         return state.feedback;
       }
     },
     mutations: {
        SET_USERS : (state,payload) => {
          state.users = payload
        },
        SET_TEAMS : (state,payload) => {
          state.teams = payload
        },
        SET_ACTIVITIES : (state,payload) => {
          state.activities = payload
        },
        SET_FEEDBACK : (state,payload) => {
          state.feedback = payload
        }
      },
    actions: {
      async fetchActivities ({ commit }) {
        try {
          let activties = await ActivityService.get()
          commit("SET_ACTIVITIES", activties);
        } catch(err) {
          console.log(err)
        }
      },
      async fetchTeams ({ commit }) {
        try {
          let teams = await TeamService.get()
          commit("SET_TEAMS", teams);
        } catch(err) {
          console.log(err)
        }
      },
      async fetchUsers ({ commit }) {
        try {
          let users = await UserService.get()
          commit("SET_USERS", users);
        } catch(err) {
          console.log(err)
        }
      },
      async fetchFeedback ({ commit }) {
        try {
          let feedback = await FeedBackService.get()
          commit("SET_FEEDBACK", feedback);
        } catch(err) {
          console.log(err)
        }
      }
    }
})

export default store