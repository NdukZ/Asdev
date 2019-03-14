'use strict';

const url = require('url');
const Path = require('path');
const string = require('./string.js');

let text = 'The event will take place between ? and ?';

console.log(string.replaceArray('?', ['8:30', '9:00'], text));

module.exports.string = string;
