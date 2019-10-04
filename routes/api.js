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
// }, function() {
//   console.log("They're connected!");
// })
});

const db = mongoose.connection;
db.on('error', function(error) {
  console.error.bind(console, 'connection error: ');
});
db.once('open', function(){
  console.log('They\'re connected!');
});

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
  statusText: String,
  createdOn: Date,
  updatedOn: Date,
  open: Boolean
}, {
  collection: 'Issues'
})

var Issue = mongoose.model('issue', issueSchema);


module.exports = function (app) {
  
  

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      // console.log('clicked');
      // console.log(req.params);
      // console.log(req.body);

      var title = req.body.issue_title;
      var text = req.body.issue_text;
      var createdBy = req.body.created_by;
      var assignedTo = req.body.assigned_to;
      var statusText = req.body.status_text;
      var createdOn = new Date();
      var updatedOn = null;
      var open = true;

      let new_issue = new Issue({
        title, text, createdBy, assignedTo, statusText, createdOn, updatedOn, open
      });
    
      new_issue.save(function(){
        console.log(new_issue);
      });
              
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
    
      var title = req.body.issue_title;
      var text = req.body.issue_text;
      var createdBy = req.body.created_by;
      var assignedTo = req.body.assigned_to;
      var statusText = req.body.status_text;
      var toClose = req.body.open;
      var updatedOn = new Date();
    
      Issue.findOne({_id: req.body._id}, function(err, issue) {
        if (err) console.log('could not update ' + req.body._id);
        else {
          if (issue) {
            if (title) issue.title = title;
            if (text) issue.text = createdBy;
            if (createdBy) issue.createdBy = createdBy;
            if (assignedTo) issue.assignedTo = issue;
            if (statusText) issue.statusText = statusText;
            if (toClose) issue.open = false;
            issue.updatedOn = updatedOn;
            console.log('updated ' + req.body._id);
          } else {
            console.log('could not update ' + req.body._id);
            res.send('could not update ' + req.body._id)
          }    
        }
      });
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
