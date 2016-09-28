import { Templates } from 'meteor/templating';

import { Students } from '../api/students.js';

import { Meteor } from 'meteor/meteor';

import "./student.html";
//import "../api/students.js";

Template.student.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call("students.setChecked", this._id, !this.checked)
    /*Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
    */
  },
  'click .moreInfo'() {
    console.log(instance);
    const instance = Template.instance();
    console.log(instance);
    console.log(instance.currentData);
  },
  'click .delete'() {
    Meteor.call("students.remove", this._id)
    //Tasks.remove(this._id);
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
/*
Template.student.helpers(
  {
    name = function() { return instance["Student Name"];
  },
)
*/
