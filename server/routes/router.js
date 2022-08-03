const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

const fs = require('fs');
const moment = require('moment');
const mdq = require('mongo-date-query');
const json2csv = require('json2csv').parse;
const path = require('path')
const fields = ['name', 'email', 'gender', 'status'];
var Userdb = require('../model/model');



/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes)

// route.get('/', function (req, res) {
//     Userdb.find({createdAt: mdq.lastYear()}, function (err, users) {
//       if (err) {
//         return res.status(500).json({ err });
//       }
//       else {
//         let csv
//         try {
//           csv = json2csv(users, { fields });
//         } catch (err) {
//           return res.status(500).json({ err });
//         }
//         const dateTime = moment().format('YYYYMMDDhhmmss');
//         const filePath = path.join(__dirname, "..", "public", "exports", "csv-" + dateTime + ".csv")
//         fs.writeFile(filePath, csv, function (err) {
//           if (err) {
//             return res.json(err).status(500);
//           }
//           else {
//             setTimeout(function () {
//               fs.unlinkSync(filePath); // delete this file after 30 seconds
//             }, 30000)
//             return res.json("/exports/csv-" + dateTime + ".csv");
//           }
//         });
  
//       }
//     })
//   })
  

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route