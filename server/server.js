require('dotenv').config({ path: '../.env', debug: process.env.DEBUG });
const { port } = process.env;
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require('express');
const http = require('http');

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const foodTruckRegions = [];
const url = "https://www.bestfoodtrucks.com/food-trucks/los-angeles";
axios.get(url).then(response => {
  const html = response.data;
  const $ = cheerio.load(html);
  let resultsContainer = $("div[class='md:-mx-4 flex flex-wrap box-border']");
  let details = resultsContainer.find("div[class='w-2/3 p-4 flex flex-col']");

  details.each(function(){
    let title = $(this).find("p[class='text-gray-900 text-lg font-medium']").text();
    let address = $(this).find("p[class^='w-']").text();
    let numOfTrucks = $(this).find("div[class='flex mt-1 items-center']").text().split("today")[0];

    foodTruckRegions.push({
      identifier: title || null,
      name: title || null,
      address: address || null,
      numOfTrucks: numOfTrucks || null,
      foodTrucks: [
        {
          name: '',
          foodType: '',
          description: '',
          email: '',
          phone: '',
          url: '',
          location: {
            region: '',
            address: '',
            city: '',
            state: '',          
          },
          socialMedia: [
            {
              instagram: '',
              twitter: '',
              facebook: '',
            }
          ]
        }
      ],
    })
  });
  console.log(foodTruckRegions);
  fs.writeFile('db/data.json', JSON.stringify(foodTruckRegions), 'utf-8', function(err){
    if(err) throw err;
      console.log(err);
  });
  });


const typeDefs = require('./schema');
const resolvers = require('./resolver');

async function startApolloServer(typeDefs, resolvers){
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({typeDefs, resolvers, Plugins:[ApolloServerPluginDrainHttpServer]});
  await server.start();
  server.applyMiddleware({app});
  await new Promise(resolve => httpServer.listen({port}, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);