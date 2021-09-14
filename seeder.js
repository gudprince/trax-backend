var seeder = require('mongoose-seed');
var countrySeed = require('./seed/countrySeed.js')
var stateSeed = require('./seed/stateSeed.js')
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/trax_database', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'models/Country',
    'models/State',
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Country', 'State'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 

data = [
   countrySeed,
   stateSeed
]

