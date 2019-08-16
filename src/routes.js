import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


//define routes
const routes = [
    // { path: '/', name: 'MainPage', component: MainPage },
    // { path: '/users', name: 'Users', component: Users },
    // { path: '/teams', name: 'Teams', component: Teams },
    // { path: '/activities', name: 'Activities', component: Activities },
    // { path: '/calendar', name: 'Calendar', component: Calendar },
    { path: '/', name: 'MainPage', component: () => import('./components/MainPage') },
    { path: '/users', name: 'Users', component: () => import('./components/Users/Main') },
    { path: '/teams', name: 'Teams', component: () => import('./components/Teams/Main') },
    { path: '/activities', name: 'Activities', component: () => import('./components/Activities/Main') },
    { path: '/calendar', name: 'Calendar', component: () => import('./components/Calendar/Main') },
    { path: '/hackquest', name: 'HackQuest', component: () => import('./components/HackQuest/Main') },
    { path: '/feedback', name: 'FeedBack', component: () => import('./components/Feedback/Main') },
    // { path: '/secret', name: 'Secret', component: SecretPage, meta: { requiresLogin: true }}
]

const Router = new VueRouter({
    mode: 'history',
    routes // сокращённая запись для `routes: routes`
  })

Router.beforeEach((to, from, next) => {
    document.title = "админка"
    if (to.matched.some(record => record.meta.requiresLogin)) {
        // You can use store variable here to access globalError or commit mutation 
        next("/Login")
    } else {
        next()
    }
})

export default Router