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
            <span>Add movie</span>
          </div>
        </div>
        <div class="screen-body-item">
          <div class="app-form" id='addmovie-form' @submit.prevent="RegisterUser">
            <div class="app-form-group" >
              <input
                type="text"
                class="app-form-control"
                name="title"
                v-model="title"
                placeholder="title"
              />
            </div>
            <div class="app-form-group">
              <input
                type="text"
                class="app-form-control"
                name="date"
                v-model="date"
                placeholder="yyyy-mm-dd release_date"
              />
            </div>
            <div class="app-form-group">
              <input type="text" class="app-form-control" name="path" v-model="path" placeholder="external path to your jpeg" />
            </div>
            <div class="app-form-group message">
              <input
                type="text"
                class="app-form-control"
                name="resume"
                v-model="resume"
                placeholder="resume"
              />
            </div>
            <div class="app-form-group buttons">
              <button class="app-form-button" type = "button" @click.prevent="RegisterUser">SEND</button>
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
      const newmovie = {
        title: this.title,
        date: this.date + "T00:00:00.000Z",
        path: this.path,
        resume: this.resume,
      };
      axios
        .post("http://localhost:3000/movies/new", newmovie)
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
