'use strict'

var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var customerSchema = mongoose.Schema({
    username : String,
    email : String,
    Phone : String,
    provider : String
});

// use plugin mongoose
customerSchema.plugin(passportLocalMongoose);

module.exports  = mongoose.model('customers', customerSchema);
// module.exports  = mongoose.model('[nama collection di database]', customerSchema);
