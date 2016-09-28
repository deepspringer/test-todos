import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { Students } from '../api/students.js'
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import './body.html';
import './task.js';
import './student.js';

//import '../api/tasks.js'
//import '../../server/main.js'

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

//Template.body.addEventListener("load", checkLate());




Template.body.helpers({
  checkLate() {
    console.log('runnung checkLate as helper');
    const instance = Template.instance();
    var i;
    console.log("About to check due dates for all tasks")
    var now = new Date;
    var dueDate = instance.due.date;
    if(now > dueDate) {
      Tasks.update(this._id, {
        $set: { late: false }
      })
    } else {
      Tasks.update(this._id, {
        $set: { late: true }
      })
    }
  },

  tasks() {
    const instance = Template.instance();
    /*var tasksDb = getCollection("Tasks")
    console.log(tasksDb);
    var tasks = tasksDb.getDataSync();
    console.log(tasks);
    for(i=0; i<tasks.length; i++) {
      delete tasks[i]["_id"];
    }
    return tasks;*/
    if(instance.state.get('hideCompleted')) {
      return Tasks.find({ checked: {$ne: true} }, {sort: {createdAt: -1} });
    }
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },

  students() {
    const instance = Template.instance();
    return Students.find( {}, {sort: {ageWithDecimals: 1} });
  }
});

Template.body.onCreated( function bodyOnCreated() {
  return this.state = new ReactiveDict;
});

Template.body.events({
 'change .hide-completed input'(event, instance) {
   instance.state.set('hideCompleted', event.target.checked);
  },

 'submit .new-task'(event) {
    console.log(event);
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Meteor.call("students.insertFromForm", text);
/*    var curDate = new Date;
    var time = curDate.getTime();
    var dueDate = new Date(time + 1000*60*60*24);
    var dateString = dayNames[dueDate.getDay()]+", "+monthNames[dueDate.getMonth()]+" "+dueDate.getDate()
    //console.log(Meteor.user());
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      due: { date: dueDate,
             string: dateString},
    });
    */
    target.text.value = '';
  },

  'click .customCode'() {
    console.log(Students);
  },
  'click .customCode2'() {
    //Students.remove()
    var students = Students.find({}, {});
    //console.log(students);
    //console.log(students["collection"]["_docs"]["_map"])
    var ids = [];
    for(i in students["collection"]["_docs"]["_map"]) {
      //console.log(i);
      ids.push(i);
    }
    for(i=0, len=ids.length; i<len; i++) {
      Meteor.call("students.remove", ids[i]);
    }
    var r = getCollection("Students").getDataSync();
    for(i=0, len=r.length; i<len; i++) {
      delete r[i]["_id"];
      Meteor.call('students.insert', r[i] );
    }
  },
  'onload .homeBody'() {
    console.log('Running checklate as event')
    const instance = Template.instance();
    var i;
    console.log("About to check due dates for all tasks")
    var now = new Date;
    var dueDate = instance.due.date;
    if(now > dueDate) {
      Tasks.update(this._id, {
        $set: { late: false }
      })
    } else {
      Tasks.update(this._id, {
        $set: { late: true }
      })
    }
  },
});

// To test myself, maybe I should try to make a button that allows you to edit each task
// And a due date for each task
// And turn late tasks red
