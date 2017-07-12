'use strict';
module.exports = function(app) {
  var pot = require('../controllers/potController');

  // api Home
  app.get('/api', function (req, res) {
    res.json({message: 'Welcome to Smartcrop API'})
  });

  // pot Routes
  app.route('/api/pots')
    .get(pot.getPots)
    .post(pot.createPot);

  app.route('/api/pots/:potId')
    .get(pot.getPot)
    .put(pot.updatePot)
    .delete(pot.deletePot);
};
