var builder = require('jest-trx-results-processor');
 
var processor = builder({
    outputFile: '__tests__/results/test-results.trx' // this defaults to "test-results.trx"
});
 
module.exports = processor;