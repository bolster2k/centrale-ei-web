const FreqModel = require("../models/freq");

const processFreq = async function (movie) {
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
    await FreqModel.find({ word: flist[elem].word })
      .then(async function (freqdb) {
        console.log("Mise à jour");

        if (freqdb.length == 0) {

          const newFreq = new FreqModel({
            word: flist[elem].word,
            frequency: 0,
            number: 1,
          });

          await newFreq.save().catch(function (error) {
            
          });
        } else {
          var n = freqdb[0].number + 1;
          console.log(n);
          await FreqModel.deleteOne({ word: flist[elem].word }, function (err) {
            if (err != null) {
              console.log("Erreur de suppression update");
              console.log(err);
            }
          }).then(async function () {
            const newFreq = new FreqModel({
              word: flist[elem].word,
              frequency: 0,
              number: n,
            });

            await newFreq.save().catch(function (error) {
            
            });
          });
        }
      })
      .catch(async function (error) {
        console.log("Tentative d'ajout error");

        const newFreq = new FreqModel({
          word: flist[elem].word,
          frequency: 0,
          number: 1,
        });

        await newFreq.save().catch(function (error) {
            
        });
      });
  }
  //console.log("Fin traitement");
};

module.exports = processFreq;
