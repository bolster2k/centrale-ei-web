<template>
  <div class="home">
    <div>
      <p>Rentrer un film</p>
      <input v-model="movieName" />
      <p>{{ movieName }}</p>
    </div>
    <div>
      <img alt="spaghetti cheems" src="../assets/cheems.png" />
      <p>Spaghetti Cheems</p>
    </div>
    <div>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <router-link class="white" :to="`/film/${movie._id}`">
            <Movie :movie="movie" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
import axios from "axios";
export default {
  name: "Home",
  data: function () {
    return {
      movies: [],
    };
  },
  components: {
    Movie,
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(`http://localhost:3000/movies`)
        .then((response) => {
          // Do something if call succeeded
          for (const res in response.data.movies) {
            this.movies.push(response.data.movies[res]);
          }
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching users.";
          console.error(error);
        });
    },
  },
  created: function () {
    this.fetchMovies();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
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
