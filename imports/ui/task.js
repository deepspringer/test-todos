import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

var monthNames = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'
]
var dayNames = [
'Sunday',
'Monday',
'Tuesday',
'Wednesday',
'Thursday',
'Friday',
'Saturday'
];

function checkLate(instance, dueDate) {
  console.log("About to check due dates for all tasks")
  console.log("instance is "+instance);
  var now = new Date;
  console.log("now is "+now)
  if(now < dueDate) {
    console.log("Taks is not late");
    Tasks.update(instance._id, {
      $set: { late: false }
    })
  } else {
    console.log("Task is late");
    Tasks.update(instance._id, {
      $set: { late: true }
    })
  }
  //console.log(Tasks.getElementById(this._id).late);
  console.log(this);
  console.log(Tasks);
}

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
  'click .edit'() {
    Tasks.update(this._id, {
      $set: { editing: true }
    });
  },
  'click .moveUp'() {
    var curDate = this.due.date;
    console.log(curDate);
    var time = curDate.getTime();
    console.log(time);
    var dueDate = new Date(time - 1000*60*60*24);
    var dateString = dayNames[dueDate.getDay()]+", "+monthNames[dueDate.getMonth()]+" "+dueDate.getDate()
    //console.log(due);
    Tasks.update(this._id, {
      $set: { due: {
                     date: dueDate ,
                     string: dateString
             }}
    });
    checkLate(this, dueDate);
  },
'click .pushBack'() {
    var curDate = this.due.date;
    console.log(curDate);
    var time = curDate.getTime();
    console.log(time);
    var dueDate = new Date(time + 1000*60*60*24);
    var dateString = dayNames[dueDate.getDay()]+", "+monthNames[dueDate.getMonth()]+" "+dueDate.getDate()
    //console.log(due);
    Tasks.update(this._id, {
      $set: { due: {
                     date: dueDate ,
                     string: dateString
             }}
    });
    checkLate(this, dueDate);
  },
  'submit .edittask'(event) {
    console.log(event);
    event.preventDefault();

    const target = event.target;
    console.log(target);
    const edittext = target.elements[0].value;

    Tasks.update(this._id, {
      $set: { text: edittext },
    });
    console.log('Updated text to '+edittext);
    Tasks.update(this._id, {
      $set: { editing: false },
    });
    console.log('Updated editing status');
  },
});
