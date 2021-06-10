import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Counter from "../views/Counter.vue";
import Users from "../views/Users.vue";
import About from "../views/About.vue";
import Film from "../views/Film.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import NewMovie from "../views/NewMovie.vue";
import Random from "../views/Random.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/counter",
    name: "Counter",
    component: Counter,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/film/:id",
    name: "Film",
    component: Film,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/newmovie",
    name: "NewMovie",
    component: NewMovie,
  },
  {
    path: "/random",
    name: "Random",
    component: Random,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
