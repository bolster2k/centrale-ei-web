<template>
  <img :src="`https://image.tmdb.org/t/p/original${movies[0].path}`" /><br />
  {{ movies[0].title }}<br />
  {{ dateday(movies[0].date) }}<br />
  {{ movies[0].resume }}
</template>

<script>
import axios from "axios";
export default {
  name: "Film",
  data: function () {
    return {
      movies: [],
      href: document.location.href,
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
  },
  created: function () {
    this.getMovie();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 20em;
}
</style>
