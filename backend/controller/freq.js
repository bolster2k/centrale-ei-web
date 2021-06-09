const FreqModel = require("../models/freq");

const processFreq = function (movie) {
  // Prétraitement
  var lword = movie.title.toLowerCase();
  lword = lword.concat(" ");
  lword = lword.concat(movie.resume.toLowerCase());
  lword = lword.split(" ");
  var flist = [];

  // Calcul de fréquence
  for (let elem in lword) {
    elem = lword[elem];
    var found = false;
    for (let x in flist) {
      if (flist[x].word == elem) {
        flist[x].score += 1;
        found = true;
        break;
      }
    }
    if (found == false) {
      flist.push({ word: elem, score: 1 });
    }
  }
  console.log(flist);

  // Màj de la bdd
  for (const elem in flist) {
    FreqModel.find({ word: flist[elem].word })
      .then(function (freqdb) {
        console.log("Mise à jour");

        if (freqdb.length == 0) {

          const newFreq = new FreqModel({
            word: flist[elem].word,
            frequency: 0,
            number: flist[elem].score,
          });

          newFreq.save();
        } else {
          var n = freqdb[0].number + flist[elem].score;
          FreqModel.deleteOne({ word: flist[elem].word }, function (err) {
            if (err != null) {
              console.log("Erreur de suppression update");
              console.log(err);
            }
          }).then(function () {
            const newFreq = new FreqModel({
              word: flist[elem].word,
              frequency: 0,
              number: n,
            });

            newFreq.save();
          });
        }
      })
      .catch(function (error) {
        console.log("Tentative d'ajout error");

        const newFreq = new FreqModel({
          word: flist[elem].word,
          frequency: 0,
          number: flist[elem].score,
        });

        newFreq.save();
      });
  }
  //console.log("Fin traitement");
};

module.exports = processFreq;
