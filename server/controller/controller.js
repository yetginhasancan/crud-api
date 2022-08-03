var Userdb = require('../model/model');

const mongodb = require("mongodb").MongoClient;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;


// create and save new user
exports.create = (req,res,buf)=> {
    console.log(req)
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            res.send(data)
            //res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

        //db to csv file

        mongodb.connect(
            process.env.MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
              if (err) throw err;
          
              client
                .db("test")
                .collection("userdbs")
                .find({})
                .toArray((err, data) => {
                  if (err) throw err;
          
                  console.log(data);
                  const csvWriter = createCsvWriter({
                    path: "export.csv",
                    header: [
                      { id: "_id", title: "_id" },
                      { id: "name", title: "name" },
                      { id: "email", title: "mail" },
                      { id: "gender", title: "gender" },
                      { id: "status", title: "status" }
                    ]
                  });
          
                  csvWriter
                    .writeRecords(data)
                    .then(() =>
                      console.log("Write to export.csv successfully!")
                    );
          
                  client.close();
                });
            }
          );

    //       res.send({
    //         message : "User was deleted successfully!"
    // })  

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })


        //db to csv file

        mongodb.connect(
            process.env.MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
              if (err) throw err;
          
              client
                .db("test")
                .collection("userdbs")
                .find({})
                .toArray((err, data) => {
                  if (err) throw err;
          
                  console.log(data);
                  const csvWriter = createCsvWriter({
                    path: "export.csv",
                    header: [
                      { id: "_id", title: "_id" },
                      { id: "name", title: "name" },
                      { id: "email", title: "mail" },
                      { id: "gender", title: "gender" },
                      { id: "status", title: "status" }
                    ]
                  });
          
                  csvWriter
                    .writeRecords(data)
                    .then(() =>
                      console.log("Write to export.csv successfully!")
                    );
          
                  client.close();
                });
            }
          );


        
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });


        //db to csv file

        mongodb.connect(
            process.env.MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
              if (err) throw err;
          
              client
                .db("test")
                .collection("userdbs")
                .find({})
                .toArray((err, data) => {
                  if (err) throw err;
          
                  console.log(data);
                  const csvWriter = createCsvWriter({
                    path: "export.csv",
                    header: [
                      { id: "_id", title: "_id" },
                      { id: "name", title: "name" },
                      { id: "email", title: "mail" },
                      { id: "gender", title: "gender" },
                      { id: "status", title: "status" }
                    ]
                  });
          
                  csvWriter
                    .writeRecords(data)
                    .then(() =>
                      console.log("Write to export.csv successfully!")
                    );
          
                  client.close();
                });
            }
          );
}