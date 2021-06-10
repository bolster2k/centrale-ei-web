<template>
</template>

<script>
import axios from "axios";
export default {
  name: "Random",
  data: function () {
    return {
      movies: [],
      href: document.location.href,
    };
  },
  methods: {
    getMovie: function () {
      axios
        .get(`http://localhost:3000/random`)
        .then((response) => {
          // Do something if call succeeded
          this.$router.push(`/film/${ response.data.movie._id }`);
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while getting film.";
          console.error(error);
        });
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