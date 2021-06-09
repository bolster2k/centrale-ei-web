<template>
  <div class="hero is-fullheight is-info is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title has-text-centered">You can now register</h1>
        <div class="box">
          <!-- our signup form ===================== -->
          <form id="signup-form" @submit.prevent="RegisterUser">
            <!-- firstname -->
            <div class="field">
              <label class="label">FirstName</label>
              <input
                type="text"
                class="input"
                name="firstname"
                v-model="firstname"
                placeholder="firstname"
              />
            </div>
            <!-- lasttname -->
            <div class="field">
              <label class="label">LastName</label>
              <input
                type="text"
                class="input"
                name="lastname"
                v-model="lastname"
                placeholder="lastname"
              />
            </div>

            <!-- email -->
            <div class="field">
              <label class="label">Email</label>
              <input type="email" class="input" name="email" v-model="email" placeholder="email" />
            </div>

            <!-- password -->
            <div class="field">
              <label class="label">Password</label>
              <input
                type="text"
                class="input"
                name="password"
                v-model="password"
                placeholder="password"
              />
            </div>

            <!-- submit button -->
            <div class="field has-text-right">
              <button type="submit" class="button is-danger">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Resgister",
  el: "#signup-form",
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
        .then(function(response){
      const status = 
        JSON.parse(response.data.response.status);
              //redirect logic
        if (status == '200') {
        self.$router.push('/any route here');
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
