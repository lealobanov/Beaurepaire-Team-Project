/* eslint-disable no-console */
/* eslint-env node */

const PORT = process.env.PORT || 8090;
const app = require('./app');
const fs = require('fs');

console.log("\nStarting server...");


app.server.listen(PORT);