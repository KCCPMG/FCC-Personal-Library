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
        // Send back
        Issue.findById(new_issue._id, function(err, result) {
          res.send(result);
        })
      });

              
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      console.log(req.params.project);
    
      var title = req.body.issue_title;
      var text = req.body.issue_text;
      var createdBy = req.body.created_by;
      var assignedTo = req.body.assigned_to;
      var statusText = req.body.status_text;
      var toClose = req.body.open;
      var updatedOn = new Date();
      
      console.log(Boolean(title));
      console.log(Boolean(text));
      console.log(Boolean(createdBy));
      console.log(Boolean(assignedTo));
      console.log(Boolean(statusText));
      console.log(Boolean(toClose));

    
      Issue.findOne({_id: req.body._id}, function(err, issue) {
        if (err) console.log('could not update ' + req.body._id);
        else {
          if (issue) {
            if (title) issue.title = title;
            if (text) issue.text = text;
            if (createdBy) issue.createdBy = createdBy;
            if (assignedTo) issue.assignedTo = assignedTo;
            if (statusText) issue.statusText = statusText;
            if (toClose) issue.open = false;
            if (!title && !text && !createdBy && !assignedTo && !statusText && !toClose) {
              res.send('no updated field sent');
            }
            else {
              issue.updatedOn = updatedOn;
              issue.save();
              console.log('updated ' + req.body._id);
              res.send('successfully updated');
            } 
          } else {
            console.log('could not update ' + req.body._id);
            res.send('could not update ' + req.body._id)
          }    
        }
      });
    })
    
    .delete(function (req, res){
      //If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.
      var project = req.params.project;
    
      if(!req.body._id) res.send('_id error');
      
      console.log(req.body._id);
    
      Issue.findById(req.body._id, function(err, issues){
        console.log(issues.length);
        if (issues.length === 1) {
          Issue.findByIdAndDelete(req.body._id, function(err, issue) {
          if (err) res.send('could not delete ' + req.body._id);
            else res.send('deleted ' + issue._id);
          })
        } else {
          res.send('could not delete ' + req.body._id);
        }
      })
      
      
    })
  
    .get(function (req, res){
      var project = req.params.project;
    

    })
    
};
