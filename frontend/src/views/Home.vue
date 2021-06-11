<template>
  <p>Vos recommandations :</p>
  <div class="container-movies">
    <ul>
      <li v-for="movie1 in moviesR" :key="movie1._id">
        <router-link :to="`/film/${movie1._id}`">
          <Movie :movie="movie1" />
        </router-link>
      </li>
    </ul>
  </div>
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
  <p>Les films du moment :</p>
  <div class="container-movies">
    <ul>
      <li v-for="movie1 in movies" :key="movie1._id">
        <router-link :to="`/film/${movie1._id}`">
          <Movie :movie="movie1" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
import axios from "axios";
import UserLog from "@/App.vue";

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
        this.movies = [];
        axios
          .post(`http://localhost:3000/movies/search`, { query: this.search })
          .then((response) => {
            // Do something if call succeeded
            for (const res in response.data) {
              if (response.data[res].score > 0) {
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
    fetchMoviesR: async function () {
      var user = await UserLog.getUser();
      axios
        .post(`http://localhost:3000/movies/recomandation`, { _id: user })
        .then((response) => {
          // Do something if call succeeded
          console.log(response.data);
          for (let res = 0; res < 4; res++) {
            var v = response.data.recom[res];
            axios
              .post(`http://localhost:3000/film/` + v, { id: v })
              .then((response) => {
                // Do something if call succeeded
                console.log(response.data.movie[0]);
                this.moviesR.push(response.data.movie[0]);
              })
              .catch((error) => {
                this.usersLoadingError = "An error occured while getting film.";
                console.error(error);
              });
          }
          console.log(this.moviesR);
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
.container-movies {
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
