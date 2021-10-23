const foodTrucks = require('./mockData');

const resolvers = { Query: {
  foodTrucks: () => foodTrucks,
},
}

module.exports = resolvers;