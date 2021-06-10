<template>
  <div class="bs-component">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">CheemsFliCS</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor03">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link tag="li" class="nav-link" to="/">Home</router-link>
              <span class="visually-hidden">(current)</span>
            </li>
            <li class="nav-item">
              <router-link tag="li" class="nav-link" to="/users"
                >Users</router-link
              >
            </li>
            <li class="nav-item">
              <router-link tag="li" class="nav-link" to="/register"
                >Register</router-link
              >
            </li>
            <li class="nav-item">
              <router-link tag="li" class="nav-link" to="/newmovie"
                >NewMovie</router-link
              >
            </li>
            <li class="nav-item">
              <router-link tag="li" class="nav-link" to="/random"
                >Random Movie</router-link
              >
            </li>
            <li class="nav-item">
              <router-link tag="li" class="nav-link" to="/login"
                >Login</router-link
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                >Dropdown</a
              >
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <router-view />
</template>

<script>
import axios from "axios";

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default {
  name: "UserLog",
  connectUser: async function (c_email, c_password) {
    document.cookie = "user=" + c_email + "; password=" + c_password + ";";
    setCookie("user", c_email, 4);
    setCookie("password", c_password, 4);
    console.log("In UserLog...");
    axios
      .post(`http://localhost:3000/users/connect`, {
        email: c_email,
        password: c_password,
      })
      .then((response) => {
        console.log(response);
        var userlist = response.data;
        if (userlist.length <= 0) {
          return false;
        } else {
          console.log("User connected sucessfuly");
          console.log(userlist);
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  },

  getUser: async function () {
    var c_email = getCookie("user");
    var c_password = getCookie("password");

    return await axios
      .post(`http://localhost:3000/users/connect`, {
        email: c_email,
        password: c_password,
      })
      .then(async function (response) {
        var userlist = response.data;
        if (userlist.length <= 0) {
          console.log("User disconnected");
          return {};
        } else {
          console.log("User connected");
          console.log(userlist[0]);
          return userlist[0];
        }
      })
      .catch(async function (error) {
        console.error(error);
        console.log("User disconnected");
        return {};
      });
  },

  disconnectUser: async function () {
    document.cookie = "user=; password=;";
    console.log("User disconnected successfuly");
  },

  isConnected: async function () {
    var c_email = getCookie("user");
    var c_password = getCookie("password");
    console.log(c_email);
    console.log(c_password);
    return await axios
      .post(`http://localhost:3000/users/connect`, {
        email: c_email,
        password: c_password,
      })
      .then(async function (response) {
        var userlist = response.data;
        console.log(userlist);
        if (userlist.length <= 0) {
          console.log("User disconnected");
          return false;
        } else {
          console.log("User connected");
          return true;
        }
      })
      .catch(async function (error) {
        console.error(error);
        console.log("User disconnected");
        return false;
      });
  },
};
</script>

<style scoped>
nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}
</style>
