<template>
<div id="container-movies">
<ul>
        <li v-for="movie in movies" :key="movie.id">
          <router-link class="white" :to="`/film/${movie._id}`">
            <Movie :movie="movie" />
          </router-link>
        </li>
      </ul>
  </div>




</template>

<script>
import Movie from "@/components/Movie.vue";
import axios from "axios";
export default {
  name: "Home",
  el: "#search-form",
  data: function () {
    return {
      movies: [],
      search: "",
    };
  },
  components: {
    Movie,
  },
  methods: {
    fetchMovies: function () {
      if (this.search === "") {
        console.log("pony");
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
      } else {
        console.log("bruh");
        this.movies = [];
        axios
          .post(`http://localhost:3000/movies/search`, { query: this.search })
          .then((response) => {
            // Do something if call succeeded
            for (const res in response.data) {
              if (response.data[res].score > 0) {
                console.log(response.data[res]);
                axios
                  .post(
                    `http://localhost:3000/film/` + response.data[res].data._id,
                    { id: response.data[res].data._id }
                  )
                  .then((response) => {
                    // Do something if call succeeded
                    this.movies.push(response.data.movie[0]);
                  })
                  .catch((error) => {
                    this.usersLoadingError =
                      "An error occured while getting film.";
                    console.error(error);
                  });
              }
            }
          })
          .catch((error) => {
            this.usersLoadingError = "An error occured while fetching users.";
            console.error(error);
          });
      }
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
#container-movies{
	position: absolute;
	width: 100%;
	height: 100%;

	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

}
</style>
