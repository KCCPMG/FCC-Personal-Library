/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true, 
  dbName: 'IssueTracking',
  useUnifiedTopology: true
}, function() {
  console.log("They're connected!");
})



// Create schema
var issueSchema = new mongoose.Schema({
  title : {
    type: String, 
    required: true
  }, 
  text: {
    type: String, 
    required: true
  }, 
  createdBy: {
    type: String, 
    required: true
  }, 
  assignedTo: String, 
  statusText: String
})

var test = 5;


module.exports = function (app) {
  
  const db = mongoose.connection.Issues;

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      console.log(test);
      var project = req.params.project;
      console.log('clicked');
      console.log(req.params);
      console.log(req.body);

      var title = req.body.issue_title;
      var text = req.body.issue_text
      var createdBy = req.body.created_by
      var assignedTo = req.body.assigned_to
      var statusText = req.body.status_text
      // db.findOne({title: title}, function(err, match) {
      //   if (err) console.log('Not Found');
      //   if (match) console.log (match.text);
      //   else console.log('No match');
      // })
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
