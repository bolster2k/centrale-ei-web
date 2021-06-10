//const MoviesModel = require("../models/movies");
const RatingModel = require("../models/rating");

const getRatingUser = async function (user) {
    return await RatingModel
        .find({user:user._id})
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
    for(var elem in rating_user){
        movie_array.push(rating_user[elem].movie);
        rating_array.push(rating_user[elem].rating);
    }
    console.log("Rating user :");
    console.log(movie_array);

    // --- Proximité
    var proxi = [];
    for(var movierated in movie_array)
    {
        // --- Fetch
        var i = movierated;
        movierated = movie_array[movierated];
        var t_rating = await RatingModel
            .find({movie:movierated})
            .then(async function (res) {
                return res;
            })
            .catch(async function (err) {
                console.log(err);
        });
        console.log(t_rating);

        // --- Adding proximity value
        for(var srating in t_rating)
        {
            // --- Fetch & Prep
            srating = t_rating[srating];
            var isInProxi = function (element) {
                if (element._id == srating._id){
                    return true;
                } 
                else{
                    return false;
                }
            };

            // --- Computing proximity
            var iprox = rating_user[i] - srating.rating;
            iprox *= iprox;

            // --- Update proximity list
            var proInd = proxi.findIndex(isInProxi)
            if(proInd == -1)
            {
                proxi.push({_id:srating._id, prox:iprox});
            }
            else
            {
                proxi[proInd].prox += iprox;
            }
        }
        
        // --- Sorting
        proxi.sort(function(a, b) {
            return a - b;
        });

        // --- Tri final
        var recom = [];
        var i = 0;
        while(i < proxi.length){
            // --- Récupération de l'utilisateur et de ses ratings
            var user_rating = await RatingModel
                .find({_id:proxi[i]._id})
                .then(async function (res) {
                    return res;
                })
                .catch(async function (err) {
                    console.log(err);
                });

            // --- Pour tous les films non jugés et non présent dans recom, on ajoute
            for(var erating in user_rating)
            {
                erating = user_rating[erating];
                if (!movie_array.includes(erating.movie))
                {
                    if(!recom.includes(erating.movie))
                    {
                        recom.push(erating.movie);
                        if(recom.lenght >= N)
                        {
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
    }
};
  
module.exports = processRecom;
  