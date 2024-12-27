#!/bin/node
const fs = require('fs');
//Obtain the environment string passed to the node script
const environment = process.argv[2];
//read the content of the json file
//copy the json inside the src/env.json file
fs.writeFileSync('src/env.json', JSON.stringify({environment}));