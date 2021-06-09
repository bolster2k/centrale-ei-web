const express = require("express");
const MoviesModel = require("../models/movies");
const FreqModel = require("../models/freq");

const searchMovie = function(req) {
    // Séparation
    var lword = req.split(" ");

    // Récupération des films
    var movies = MoviesModel.find({});
    var N = movies.length;
    
    // Récupération des fréquences
    var freq = FreqModel.find({});

    for(movie in movies)
    {
        var ns = 0;
        for (word_search in lword)
        {
            FreqModel.find({word_search:word}).then(function (freq) {
                ns += (1 + Math.log(1 / lword.length)) * Math.log(freq.frequency / N);
                console.log(ns);
                console.log(word_search);
                console.log(freq.frequency);
            });
        }
        movie.score = ns;
    }

    console.log(movies);
};


module.exports = searchMovie;