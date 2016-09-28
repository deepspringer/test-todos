import '../imports/ui/body.js';
import '../imports/startup/accounts-config.js';


function checkLate() {
  //var tasks = Tasks.find({}, { sort: { createdAt: -1 } });
  function getTasks() {
    return $.ajax( { url: "https://api.mlab.com/api/1/databases/pierreponttest/collections/Tasks?apiKey=a9xyZxIEz048JOrLWsFsP5vyuFdAO0QE",
    type: "GET",
    contentType: "application/json" } )["responseJSON"];
  }
  var tasks = getTasks().done(function(result) {
    console.log("Success");
    console.log(result);// Code depending on result
    return result;
  }).fail(function() {
    console.log("Callback Error");
    console.log(result);
    // An error occurred
  });

  console.log('running checkLate as freestanding function');
  var i;
  console.log("About to check due dates for all "+tasks.length+" tasks")
  var now = new Date;
  for(i=0, len=tasks.length; i<len; i++) {
    var dueDate = tasks[i].due.date;
    if(now > dueDate) {
      Tasks.update(tasks[i]._id, {
        $set: { late: false }
      })
    } else {
      Tasks.update(tasks[i]._id, {
        $set: { late: true }
      })
    }
  }
}
