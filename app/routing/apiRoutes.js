var friends = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var totalDifferenceArray = [];
    var answerArray = [];

    for (var i = 0; i < friends.length; i++) {
      answerArray.push(friends[i].answers);
      var totalDifference = 0;
      for (var x = 0; x < answerArray[i].length; x++) {
        totalDifference += Math.abs(
          answerArray[i][x] - parseInt(req.body.answers[x])
        );
      }
      totalDifferenceArray.push(totalDifference);
    }

    var smallestNumber = Math.min.apply(Math, totalDifferenceArray);

    var smallestNumberIndex = totalDifferenceArray.indexOf(smallestNumber);

    res.json(friends[smallestNumberIndex]);

    friends.push(req.body);
  });
};
