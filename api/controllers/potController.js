'use strict';

var firebase = require('firebase-admin');
var serviceAccount = require("../smartcrop-api-512fcdde546c.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://smartcrop-api.firebaseio.com"
});

var ref = firebase.database().ref('/');
var potRef = ref.child('pots');

exports.getPots = function(req, res) {
  potRef.once("value", function(snapshot) {
    res.json(snapshot.val());
  }, function (errorObject) {
    res.json({message: "The read failed: " + errorObject.code});
  });
};

exports.createPot = function(req, res) {
  potRef.push({
    humidity: 20,
    temperature: 10
  }).then(function (snap) {
    res.json({message: 'Success: Pot created with ID: ' + snap.key});
  });
};


exports.getPot = function(req, res) {
  var potId = req.params.potId;
  potRef.child(potId).once("value", function(snapshot) {
    if (snapshot.val() == null) {
		    res.json({message: "Error: No pot found with ID: " + potId});
		} else {
		    res.json(snapshot.val());
	  }
  }, function (errorObject) {
    res.json({message: "The read failed: " + errorObject.code});
  });
};


exports.updatePot = function(req, res) {
  var potId = req.params.potId,
			pot = {};

		// update only parameters sent in request
		if (req.body.humidity) pot.humidity = parseInt(req.body.humidity);
		if (req.body.temperature) pot.temperature = parseInt(req.body.temperature);

		potRef.child(potId).update(pot, function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: "Success: Pot information correctly updated."})
			}
		});
};


exports.deletePot = function(req, res) {
  var potId = req.params.potId;

	potRef.child(potId).remove(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json({message: "Success: Pot deleted."});
		}
	})
};
