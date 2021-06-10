<template>
  <div class="background">
    <div class="container">
      <div class="screen">
        <div class="screen-header">
          <div class="screen-header-left">
            <div class="screen-header-button close"></div>
            <div class="screen-header-button maximize"></div>
            <div class="screen-header-button minimize"></div>
          </div>
          <div class="screen-header-right">
            <div class="screen-header-ellipsis"></div>
            <div class="screen-header-ellipsis"></div>
            <div class="screen-header-ellipsis"></div>
          </div>
        </div>
        <div class="screen-body">
          <div class="screen-body-item left">
            <div class="app-title">
              <span>Sign up</span>
            </div>
          </div>
          <div class="screen-body-item">
            <div class="app-form" id="register-form">
              <div class="app-form-group">
                <input
                  type="text"
                  class="app-form-control"
                  name="firstname"
                  v-model="firstname"
                  placeholder="firstname"
                />
              </div>
              <div class="app-form-group">
                <input
                  type="text"
                  class="app-form-control"
                  name="lastname"
                  v-model="lastname"
                  placeholder="lastname"
                />
              </div>
              <div class="app-form-group">
                <input
                  type="email"
                  class="app-form-control"
                  name="email"
                  v-model="email"
                  placeholder="email"
                />
              </div>
              <div class="app-form-group message">
                <input
                  type="text"
                  class="app-form-control"
                  name="password"
                  v-model="password"
                  placeholder="password"
                />
              </div>
              <div class="app-form-group buttons">
                <button
                  class="app-form-button"
                  type="button"
                  @click.prevent="RegisterUser"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  el: "#register-form",
  data: function () {
    return {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    };
  },
  methods: {
    RegisterUser: function () {
      // POST request using axios with error handling
      const newuser = {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/users/new", newuser)
        .then((response) => {
          const status = JSON.parse(response.status);
          //redirect logic
          if (status == "201") {
            this.$router.push("/users");
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
  text-align: center;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
