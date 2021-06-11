<template>
  <div class="background">
    <div class="container">
      <div class="screen">
        <div class="screen-header">
          <div class="screen-header-left"></div>
          <div class="screen-header-right"></div>
        </div>
        <div class="screen-body">
          <div class="screen-body-item left">
            <div class="app-title">
              <span>Sign up</span>
            </div>
          </div>
          <div class="screen-body-item">
            <div class="app-form" id="login-form" @submit.prevent="LoginUser">
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
                  @click.prevent="LoginUser"
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
import UserLog from "@/App.vue";

export default {
  name: "Login",
  el: "#login-form",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    LoginUser: function () {
      console.log("Logging in...");
      UserLog.connectUser(this.email, this.password);
      console.log("Done");
      this.$router.push("/");
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
