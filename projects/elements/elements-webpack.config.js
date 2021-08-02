var uuidv1 = require('uuidv1');
module.exports = {
    output: {
        jsonpFunction: 'custom-'+uuidv1(),
        library: 'elements',
    },
 };