const foodTruckRegions = require('./db/data.json');

const resolvers = { Query: {
  foodTruckRegions: () => foodTruckRegions,
},
}

module.exports = resolvers;