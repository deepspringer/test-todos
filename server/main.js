import '../imports/api/tasks.js';
import '../imports/api/students.js';
import { Meteor } from 'meteor/meteor';
var apiKey = "a9xyZxIEz048JOrLWsFsP5vyuFdAO0QE";

Meteor.startup(() => {
  // code to run on server at startup
});

/*
function getCollection(coll) {
  return new Collection(pierreponttest, coll);
}

function Collection(db, coll) {
  this.db = db;
  this.coll = coll;
  this.getData = function() {
    var requestUrl = "https://api.mlab.com/api/1/databases/"+db+"/collections/"+coll+"?apiKey="+apiKey
    return $.ajax( { url: requestUrl,
    type: "GET",
    async: false,
    contentType: "application/json" } )["responseJSON"];
  }
  this.setData = function(dataObject) {
    $.ajax( { url: "https://api.mlab.com/api/1/databases/"+db+"/collections/"+coll+"?apiKey="+apiKey,
    		  data: JSON.stringify(dataObject),
    		  type: "POST",
    		  contentType: "application/json" } );
  }
}
*/
