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
          <Movie :movie="movie" />
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
      movieName: "",
      movies: [],
    };
  },
  components: {
    Movie,
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US&page=1`
        )
        .then((response) => {
          // Do something if call succeeded
          for (const res in response.data.results) {
            this.movies.push(response.data.results[res]);
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
