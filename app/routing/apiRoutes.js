var friendsArray = require("../data/friends");

// console.log(friendsArray);

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsArray);
    });

    app.post('/api/friends', function(req, res) {
		// Capture the user input object
        var userInput = req.body;
        var userScore = userInput.scores;
        var matchName;
		var matchImage;
		var totalDifference = 10000;

		// loops through all the friends
		for (var i = 0; i < friendsArray.length; i++) {

			// Loops through and finds differences
			var diff = 0;
			for (var j = 0; j < userScore.length; j++) {
				diff += Math.abs(friendsArray[i].scores[j] - userScore[j]);
			}
			// console.log('diff = ' + diff);

			// Find the closest friend
			if (diff < totalDifference) {
				

				totalDifference = diff;
				matchName = friendsArray[i].name;
				matchImage = friendsArray[i].photo;
			}
		}

		// Add new user
		friendsArray.push(userInput);

        // Send appropriate response
        console.log(matchName);
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
        

});


}