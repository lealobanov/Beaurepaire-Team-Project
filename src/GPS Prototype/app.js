/* eslint-env node */

const express = require('express');
var url = require('url');
const fs = require('fs');

const app = express();

app.use(express.static('clientside'));

module.exports.server = app;