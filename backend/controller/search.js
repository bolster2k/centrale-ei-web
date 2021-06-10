const MoviesModel = require("../models/movies");
const FreqModel = require("../models/freq");

const searchMovie = function (req, res) {
  // Séparation
  var lword = req.query.split(" ");
  for (let word in lword) {
    lword[word] = lword[word].toLowerCase();
  }
  console.log(lword);

  var resultmovie = [];

  // Récupération des fréquences
  FreqModel.find()
    .where("word")
    .in(lword)
    .then(function (freqgen) {
      console.log("freqgen :");
      console.log(freqgen);

      console.log("// Récupération des films");
      MoviesModel.find({}).then(function (movies) {
        var N = movies.length;
        for (let movie in movies) {
          movie = movies[movie];
          var ns = 0;
          console.log("=Analyse Film=");
          console.log(movie);
          for (let word_search in lword) {
            console.log("===Analyse Requête===");
            word_search = lword[word_search];
            //console.log(word_search);

            var freqindata =
              movie["title"].toLowerCase().split(word_search).length * 4 +
              movie["resume"].toLowerCase().split(word_search).length -
              5;
            console.log("freqindata :");
            console.log(freqindata);
            if (freqindata <= 0) {
              console.log("Passe");
              continue;
            }

            var freqword = null;
            for (let elem in freqgen) {
              if (freqgen[elem]["word"] == word_search) {
                freqword = freqgen[elem];
              }
            }
            console.log(freqword);
            if (freqword == null) {
              console.log("Passe");
              console.log(word_search);
              continue;
            }

            ns += Math.log(1 + freqindata) * Math.log(1 + freqword.number / N);
            console.log(ns);
          }
          console.log("ns (film) :");
          console.log(ns);

          resultmovie.push({ score: ns, data: movie });
        }

        console.log("Résultat");

        resultmovie.sort(function (a, b) {
          return b.score - a.score;
        });
        console.log(resultmovie);

        res.json(resultmovie);
      });
    });
};

module.exports = searchMovie;
