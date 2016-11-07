### pasport bersama ken masih yang local

## every thing that you need to install
```
1. install passport | desc : to enrypit and decript your password | ( link : https://www.npmjs.com/package/passport )
2. install passport - local | desc : to enrypit and decript your password | ( link : https://www.npmjs.com/package/passport-local )
3. install express-session | desc : create session
4. install mongodb | desc : database
5. install mongoose | desc : ODM ( Object Data Mapping )
6. install passport-facebook
7. install passport-local-mongoose ( req ini di models )

```

## API

|End-Point|Https|desc|
|---------|-----|----|
| http://localhost:3000/api/customer | GET | get all data customer |
| http://localhost:3000/api/customer | POST | create new customer |
| http://localhost:3000/api/customer/register  | POST | render form register page |
| http://localhost:3000/api/customer/login  | GET | render form login page |
| http://localhost:3000/api/customer/login  | POST | login process |
| http://localhost:3000/api/customer/home  | GET | render home page |
| http://localhost:3000/api/customer/logout  | GET | destroy session and redirect to login page |

## setup passport-local-mongoose in our models
```
var mongoose = require('mongoose'); // require mongoose
const passportLocalMongoose = require('passport-local-mongoose'); // require mongoose

var customerSchema = mongoose.Schema({
    username : String,
    email : String,
    Phone : String,
    provider : String
});

// use plugin passportLocalMongoose
customerSchema.plugin(passportLocalMongoose);

// module.exports  = mongoose.model('[your collection name in your database]', customerSchema);
module.exports  = mongoose.model('customers', customerSchema);
```
