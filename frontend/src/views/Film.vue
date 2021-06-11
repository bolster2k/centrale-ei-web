<template>
  <div class="movie-card">
    <div class="container" v-if="movies[0]">
      <a href="#"><img :src="movies[0].path" alt="cover" class="cover" /></a>

      <div class="hero">
        <div class="details">
          <div class="title1">{{ movies[0].title }}</div>

          <div class="title2" v-if="movies[0].date">
            {{ dateday(movies[0].date) }}
          </div>

          <fieldset class="rating">
            <input
              type="radio"
              id="star5"
              name="rating"
              value="5"
              @click="sendInfo(5)"
            /><label class="full" for="star5" title="Awesome - 5 stars"></label>
            <input
              type="radio"
              id="star4half"
              name="rating"
              value="4 and a half"
              @click="sendInfo(4.5)"
            /><label
              class="half"
              for="star4half"
              title="Pretty good - 4.5 stars"
            ></label>
            <input
              type="radio"
              id="star4"
              name="rating"
              value="4"
              @click="sendInfo(4)"
            /><label
              class="full"
              for="star4"
              title="Pretty good - 4 stars"
            ></label>
            <input
              type="radio"
              id="star3half"
              name="rating"
              value="3 and a half"
              @click="sendInfo(3.5)"
            /><label
              class="half"
              for="star3half"
              title="Meh - 3.5 stars"
            ></label>
            <input
              type="radio"
              id="star3"
              name="rating"
              value="3"
              @click="sendInfo(3)"
            /><label class="full" for="star3" title="Meh - 3 stars"></label>
            <input
              type="radio"
              id="star2half"
              name="rating"
              value="2 and a half"
              @click="sendInfo(2.5)"
            /><label
              class="half"
              for="star2half"
              title="Kinda bad - 2.5 stars"
            ></label>
            <input
              type="radio"
              id="star2"
              name="rating"
              value="2"
              @click="sendInfo(2)"
            /><label
              class="full"
              for="star2"
              title="Kinda bad - 2 stars"
            ></label>
            <input
              type="radio"
              id="star1half"
              name="rating"
              value="1 and a half"
              @click="sendInfo(1.5)"
            /><label
              class="half"
              for="star1half"
              title="Meh - 1.5 stars"
            ></label>
            <input
              type="radio"
              id="star1"
              name="rating"
              value="1"
              @click="sendInfo(1)"
            /><label
              class="full"
              for="star1"
              title="Sucks big time - 1 star"
            ></label>
            <input
              type="radio"
              id="starhalf"
              name="rating"
              value="half"
              checked
              @click="sendInfo(0.5)"
            /><label
              class="half"
              for="starhalf"
              title="Sucks big time - 0.5 stars"
            ></label>
          </fieldset>
        </div>
        <!-- end details -->
      </div>
      <!-- end hero -->

      <div class="description">
        <div class="column1"></div>
        <!-- end column1 -->

        <div class="column2">
          <p>{{ movies[0].resume }}</p>
        </div>
        <!-- end column2 -->
      </div>
      <!-- end description -->
    </div>
    <!-- end container -->
  </div>
  <!-- end movie-card -->
</template>

<script>
import axios from "axios";
import UserLog from "@/App.vue";

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
          console.log(this.movies[0].path);
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
    sendInfo: function (value) {
      // POST request using axios with error handling
      const v = this.createBout(this.href);
      this.rating = value;
      const newRating = {
        email: this.email,
        password: this.password,
        rating: this.rating,
        movie: {
          id: v,
          title: this.movies[0].title,
        },
      };
      if (UserLog.isConnected()) {
        axios
          .post(`http://localhost:3000/film/` + v + `/rating`, newRating)
          .then(() => this.$router.push("/"))
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      }
    },
  },
  created: async function () {
    this.getMovie();
    if (await UserLog.isConnected()) {
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
@import url("https://fonts.googleapis.com/css?family=Open+Sans:700,400");
img {
  width: 15em;
}
@import url(https://fonts.googleapis.com/css?family=Lato:400,300,700);

@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  background: #43423e;
}

a {
  text-decoration: none;
  color: #5c7fb8;
}

a:hover {
  text-decoration: underline;
}

.movie-card {
  font: 14px/22px "Lato", Arial, sans-serif;
  color: #a9a8a3;
  padding: 40px 0;
}

.container {
  margin: 0 auto;
  width: 780px;
  height: 640px;
  background: #f0f0ed;
  border-radius: 5px;
  position: relative;
}

.hero {
  height: 342px;
  margin: 0;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.hero:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  background: red;
  background: url("https://cdn.hipwallpaper.com/m/14/70/AumI4r.jpg");
  z-index: -1;

  transform: skewY(-2.2deg);
  transform-origin: 0 0;

  -webkit-backface-visibility: hidden;
}

.cover {
  position: absolute;
  top: 160px;
  left: 40px;
  z-index: 2;
}

.details {
  padding: 190px 0 0 280px;
}
.title1 {
  color: white;
  font-size: 44px;
  margin-bottom: 13px;
  position: relative;
}

.title2 {
  color: #c7c1ba;
  font-size: 23px;
  font-weight: 300;
  margin-bottom: 15px;
}

.likes {
  margin-left: 24px;
}

.likes:before {
  content: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/icon_like.png");
  position: relative;
  top: 2px;
  padding-right: 7px;
}

.description {
  bottom: 0px;
  height: 200px;
  font-size: 16px;
  line-height: 26px;
  color: #b1b0ac;
}

.column1 {
  padding-left: 50px;
  padding-top: 120px;
  width: 220px;
  float: left;
  text-align: center;
}

.tag {
  background: white;
  border-radius: 10px;
  padding: 3px 8px;
  font-size: 14px;
  margin-right: 4px;
  line-height: 35px;
  cursor: pointer;
}

.tag:hover {
  background: #ddd;
}

.column2 {
  padding-left: 41px;
  padding-top: 30px;
  margin-left: 20px;
  width: 480px;
  float: left;
}

fieldset,
label {
  margin: 0;
  padding: 0;
}

/****** Style Star Rating Widget *****/

.rating {
  border: none;
  float: left;
}

.rating > input {
  display: none;
}
.rating > label:before {
  margin: 5px;
  margin-top: 0;
  font-size: 1em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}

.rating > .half:before {
  content: "\f089";
  position: absolute;
}

.rating > label {
  color: #ddd;
  float: right;
}

/***** CSS Magic to Highlight Stars on Hover *****/

.rating > input:checked ~ label, /* show gold star when clicked */
.rating:not(:checked) > label:hover, /* hover current star */
.rating:not(:checked) > label:hover ~ label {
  color: #ffd700;
} /* hover previous stars in list */

.rating > input:checked + label:hover, /* hover current star when changing rating */
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label, /* lighten current selection */
.rating > input:checked ~ label:hover ~ label {
  color: #ffed85;
}

a[data-tooltip] {
  position: relative;
}
a[data-tooltip]::before,
a[data-tooltip]::after {
  position: absolute;
  display: none;
  opacity: 0.85;
}
a[data-tooltip]::before {
  /*
   * using data-tooltip instead of title so we 
   * don't have the real tooltip overlapping
   */
  content: attr(data-tooltip);
  background: #000;
  color: #fff;
  font-size: 13px;
  padding: 5px;
  border-radius: 5px;
  /* we don't want the text to wrap */
  white-space: nowrap;
  text-decoration: none;
}
a[data-tooltip]::after {
  width: 0;
  height: 0;
  border: 6px solid transparent;
  content: "";
}

a[data-tooltip]:hover::before,
a[data-tooltip]:hover::after {
  display: block;
}

/** positioning **/

/* top tooltip */
a[data-tooltip][data-placement="top"]::before {
  bottom: 100%;
  left: 0;
  margin-bottom: 40px;
}
a[data-tooltip][data-placement="top"]::after {
  border-top-color: #000;
  border-bottom: none;
  bottom: 50px;
  left: 20px;
  margin-bottom: 4px;
}
</style>
