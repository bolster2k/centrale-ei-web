//const MoviesModel = require("../models/movies");
const RatingModel = require("../models/rating");

const getRatingUser = async function (user) {
  return await RatingModel.find({ user: user._id })
    .then(async function (result) {
      return result;
    })
    .catch(async function (err) {
      console.log(err);
    });
};

const processRecom = async function (user) {
  // --- Nombre de recommandation
  var N = 20;

  // --- Récupération des films likés
  var rating_user = await getRatingUser(user);
  var movie_array = [];
  var rating_array = [];
  for (var elem in rating_user) {
    movie_array.push(rating_user[elem].movie.toString());
    rating_array.push(rating_user[elem].rating);
  }
  console.log("Rating user :");
  console.log(movie_array);

  // --- Proximité
  var proxi = [];
  for (var movierated in movie_array) {
    // --- Fetch
    var i = movierated;
    movierated = movie_array[movierated];
    var t_rating = await RatingModel.find({ movie: movierated })
      .then(async function (res) {
        return res;
      })
      .catch(async function (err) {
        console.log(err);
      });

    console.log("t_rating :");
    console.log(t_rating);

    // --- Adding proximity value
    for (var srating in t_rating) {
      // --- Fetch & Prep
      console.log("F&P");
      srating = t_rating[srating];
      const isInProxi = (element) => {
        if (element.user.toString() == srating.user.toString()) {
          return true;
        } else {
          return false;
        }
      };

      // --- Computing proximity
      var iprox = rating_array[i] - srating.rating;
      iprox *= iprox;
      console.log(iprox);

      // --- Update proximity list
      console.log("Upl");
      var proInd = proxi.findIndex(isInProxi);
      console.log(proInd);
      if (proInd == -1) {
        console.log("Push");
        proxi.push({ user: srating.user, prox: iprox });
      } else {
        console.log("Màj");
        proxi[proInd].prox += iprox;
      }
    }
  }

  // --- Sorting
  console.log("Proxi");
  console.log(proxi);
  proxi.sort(function (a, b) {
    return a - b;
  });
  console.log(proxi);

  // --- Tri final
  var recom = [];
  i = 0;
  while (i < proxi.length) {
    // --- Récupération de l'utilisateur et de ses ratings
    var user_rating = await RatingModel.find({ user: proxi[i].user })
      .then(async function (res) {
        return res;
      })
      .catch(async function (err) {
        console.log(err);
      });

    // --- Pour tous les films non jugés et non présent dans recom, on ajoute
    for (var erating in user_rating) {
      erating = user_rating[erating];
      console.log("erating" + erating);
      console.log("Movie array : " + movie_array + "Recom : " + recom);
      if (!movie_array.includes(erating.movie.toString())) {
        if (!recom.includes(erating.movie.toString())) {
          console.log("Adding " + erating.movie);
          recom.push(erating.movie.toString());
          if (recom.lenght >= N) {
            console.log(recom);
            return recom;
          }
        }
      }
    }

    // --- Incrémentation
    i += 1;
  }
  console.log(recom);
  return recom;
};

module.exports = processRecom;
