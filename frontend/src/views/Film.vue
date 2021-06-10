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
import UserLog from "@/App.vue";

// function getCookie(cname) {
//   var name = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(';');
//   for(var i = 0; i <ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

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
  components: {
    UserLog,
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
      if(UserLog.isConnected())
      {
        axios
          .post(`http://localhost:3000/film/` + v + `/rating`, newRating)
          .then((response) => console.log(response))
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      }
    },
  },
  created: async function () {
    this.getMovie();
    console.log(await UserLog.isConnected());
    if(await UserLog.isConnected())
    {
      console.log("Chargement userdata");
      var user = await UserLog.getUser();
      console.log(user);
      this.email = user.email;
      this.password = user.password; 
    }
  },
  el: "#signup-form",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:700,400');
img {
  width: 20em;
}

</style>
