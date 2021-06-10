<template>
  <div v-if="movies[0]">
    <img :src="`https://image.tmdb.org/t/p/original${movies[0].path}`" /><br />
    {{ movies[0].title }}<br />
    {{ dateday(movies[0].date) }}<br />
    {{ movies[0].resume }}<br /><br /><br />
    <form id="signup-form" @submit.prevent="sendInfo">
      <!-- email -->
      <div class="field">
        <label class="label">Email</label>
        <input
          type="email"
          class="input"
          name="email"
          v-model="email"
          placeholder="email"
        />
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
      <!-- rating -->
      <div class="field">
        <label class="label">Rating</label>
        <input
          type="text"
          class="input"
          name="rating"
          v-model="rating"
          placeholder="rating"
        />
      </div>

      <!-- submit button -->
      <div class="field has-text-right">
        <button type="submit" class="button is-danger">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Film",
  data: function () {
    return {
      movies: [],
      href: document.location.href,
      email: "",
      password: "",
      rating: 0,
    };
  },
  methods: {
    createBout: function (url) {
      let u = "";
      for (let i = 27; i < url.length; i++) {
        u = u.concat(url[i]);
      }
      return u;
    },
    getMovie: function () {
      const v = this.createBout(this.href);
      axios
        .post(`http://localhost:3000/film/` + v, { id: v })
        .then((response) => {
          // Do something if call succeeded
          this.movies.push(response.data.movie[0]);
          console.log(response.data.movie[0]);
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while getting film.";
          console.error(error);
        });
    },
    dateday: function (date) {
      let u = "";
      for (let i = 0; i < 10; i++) {
        u = u.concat(date[i]);
      }
      return u;
    },
    //
    //
    /* pour le rating !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    //
    //
    sendInfo: function () {
      // POST request using axios with error handling
      const v = this.createBout(this.href);
      const newRating = {
        email: this.email,
        password: this.password,
        rating: this.rating,
        movie: {
          id: v,
          title: this.movies[0].title,
        },
      };
      axios
        .post(`http://localhost:3000/film/` + v + `/rating`, newRating)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
  created: function () {
    this.getMovie();
  },
  el: "#signup-form",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 20em;
}
</style>
