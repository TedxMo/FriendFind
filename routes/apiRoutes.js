// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");
var server = require("../server")


// ===============================================================================
// ROUTING
// ===============================================================================
var friends = require("./../data/friends");
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var newFriend = req.body;
    console.log(req.body)
    var bestFriend = compatibility(newFriend);
    friends.push(newFriend);

    res.send(bestFriend);
  });
};

function compatibility(newFriend) {
  var leastDiff = 41;
  var mostCompatible;
  if (friends.length === 0) {
    console.log("You're the first friend finder! Wait until someone else also takes the survey to get matched up!");
  } else { 
    for (var i = 0; i < friends.length; i++) {
      var difference = 0;
      for (var x = 0; x < 10; x++) {
        difference += Math.abs(friends[i]['scores[]'][x] - newFriend['scores[]'][x]);
      };
      if (difference < leastDiff) {
        leastDiff = difference;
        mostCompatible = i;
      };
    };
  };
  return friends[mostCompatible];
};
