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

const db = mongoose.connection;

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
}, {
  collection: 'issues'
})

var Issue = mongoose.model('issue', issueSchema);


module.exports = function (app) {
  
  

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      console.log('clicked');
      console.log(req.params);
      console.log(req.body);

      var title = req.body.issue_title;
      var text = req.body.issue_text
      var createdBy = req.body.created_by
      var assignedTo = req.body.assigned_to
      var statusText = req.body.status_text

      let new_issue = new Issue({
        title, text, createdBy, assignedTo, statusText
      });
    
      new_issue.save(function(){
        console.log('here comes the butt!');
        console.log(new_issue);
      });
              
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
    
      var title = req.body.issue_title;
      var text = req.body.issue_text
      var createdBy = req.body.created_by
      var assignedTo = req.body.assigned_to
      var statusText = req.body.status_text
      Issue.findOne({title: title}, function(err, match) {
        if (err) console.log('Not Found');
        else {
          if (match) console.log (match.text);
          else {
            let new_issue = new Issue({
              title, text, createdBy, assignedTo, statusText
            });
          }    
        }
      });
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
