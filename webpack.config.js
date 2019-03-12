'use strict';

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './source/scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'build/scripts'),
        filename: 'bundle.js'
    }
};
