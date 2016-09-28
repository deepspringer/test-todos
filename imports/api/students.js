import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Students = new Mongo.Collection('students');

Meteor.methods({
  'students.insertFromForm'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Students.insert({
      studentName: text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'students.insert'(obj) {
    Students.insert(obj);
  },
  'students.remove'(studentId) {
    check(studentId, String);

    Students.remove(studentId);
  },
  'students.setChecked'(studentId, setChecked) {
    check(studentId, String);
    check(setChecked, Boolean);

    Students.update(studentId, { $set: { checked: setChecked } });
  },
});
