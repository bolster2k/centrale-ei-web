<template>
  <p>Vos recommandations :</p>
  <div class="milieu">
    <form id="search-form">
      <input
        class="me-sm-2"
        type="text"
        placeholder="Search"
        v-model="search"
      />
      <button
        class="btn btn-secondary my-2 my-sm-0"
        type="submit"
        @click.prevent="fetchMovies"
      >
        Search
      </button>
    </form>
  </div>
  <div id="container-movies">
    <ul>
      <li v-for="movie in moviesR" :key="movie._id">
        <router-link :to="`/film/${movie._id}`">
          <Movie :movie="movie" />
        </router-link>
      </li>
    </ul>
  </div>
  <p>Les films du moment :</p>
  <div id="container-movies">
    <ul>
      <li v-for="movie in movies" :key="movie._id">
        <router-link :to="`/film/${movie._id}`">
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
      moviesR: [],
    };
  },
  components: {
    Movie,
  },
  methods: {
    fetchMovies: function () {
      if (this.search === "") {
        axios
          .get(`http://localhost:3000/movies`)
          .then((response) => {
            // Do something if call succeeded
            for (let res = 0; res < 100; res++) {
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
    fetchMoviesR: function () {
      axios
        .post(`http://localhost:3000/movies/recomandation`)
        .then((response) => {
          // Do something if call succeeded
          console.log("ok");
          for (let res = 0; res < 5; res++) {
            var v = response.data.recom[res];
            axios
              .post(`http://localhost:3000/film/` + v, { id: v })
              .then((response) => {
                // Do something if call succeeded
                this.movies.push(response.data.movie[0]);
                console.log(this.movies[0].path);
              })
              .catch((error) => {
                this.usersLoadingError = "An error occured while getting film.";
                console.error(error);
              });
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
    this.fetchMoviesR();
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
#container-movies {
  position: absolute;
  width: 120%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.milieu {
  display: flex;
  justify-content: center;
}
</style>
