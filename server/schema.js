const { gql } = require('apollo-server-express');
const typeDefs  = gql`
type Truck {
  name: String
  foodType: String
  description: String
  email: String
  phone: String
  socialMedias: [SocialMedia]
  url: String
  location: Location
}

type SocialMedia {
  twitter: String
  facebook: String
  instagram: String
}

type Location {
  region: String
  address: String
  city: String
  state: String
}

type Query {
  foodTrucks: [Truck]
}
`;
module.exports = typeDefs;