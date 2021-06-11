import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
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
    path: "/users",
    name: "Users",
    component: Users,
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
