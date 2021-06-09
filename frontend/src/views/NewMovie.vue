<template>
  <div class="hero is-fullheight is-info is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title has-text-centered">Vue.js Form Processing</h1>
        <div class="box">
          <!-- our signup form ===================== -->
          <form id="addmovie-form" @submit.prevent="RegisterMovie">
            <!-- firstname -->
            <div class="field">
              <label class="label">Title</label>
              <input
                type="text"
                class="input"
                name="title"
                v-model="title"
              />
            </div>
            <!-- lasttname -->
            <div class="field">
              <label class="label">Date</label>
              <input
                type="text"
                class="input"
                name="date"
                v-model="date"
              />
            </div>

            <!-- email -->
            <div class="field">
              <label class="label">Photo Path</label>
              <input type="text" class="input" name="path" v-model="path" />
            </div>

            <!-- password -->
            <div class="field">
              <label class="label">Resume</label>
              <input
                type="text"
                class="input"
                name="resume"
                v-model="resume"
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
  name: "NewMovie",
  el: "#addmovie-form",
  data: function () {
    return {
      title: "",
      date: "",
      path: "",
      resume: "",
    };
  },
  methods: {
    RegisterMovie: function () {
      // POST request using axios with error handling
      const newuser = {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/users/new", newuser)
        .then((response) => (this.newuserId = response.data.id))
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
.NewMovie {
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