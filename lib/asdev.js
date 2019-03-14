'use strict';

const url = require('url');
const Path = require('path');
const string = require('./string.js');
const Arr = require('./array.js');

const ae = {'name': 'Joe', 'languages' : ['PHP', 'Ruby']};
console.log(Arr.flatten(ae));

module.exports.string = string;
module.exports.string = Arr;
