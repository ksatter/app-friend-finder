//dependencies
const express = require('express');
const path = require('path');
const app = express();
const friends = require('../data/friends.js');
//routes
module.exports = function(app){
    //return friend list
    app.get('/api/friends', function(req, res){
        res.json(friends);
    });
    //return best match and add new friend
    app.post('/api/post', function(req, res){
        //set user data based on request
        let user= req.body;
        let userScores = user.scores;
        //current best match
        let match = {
            name: "",
            photo: "",
            difference: 100
        };
        //compare scores with existing friends
        for(let i in friends){
            let matchScore = 0;
            //get difference between each score and add to match score
            for(let j = 0; j < 10; j++) {
                matchScore += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
            }
            console.log(matchScore);
            //if current friend is best match, update info
            if (matchScore <= match.difference) {
                // Reset the bestMatch to be the new friend.
                match.name = friends[i].name;
                match.photo = friends[i].photo;
                match.difference = matchScore;
            }
        }
        //add user to friends list
        friends.push(user);
        //return match
        res.json(match);
    });
};