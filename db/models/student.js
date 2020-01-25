'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    lastName: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

Student.hook('beforeCreate', (student, options) => {
    student.firstName = student.firstName.charAt(0).toUpperCase() + student.firstName.slice(1);
    student.lastName = student.lastName.charAt(0).toUpperCase() + student.lastName.slice(1);
  });


module.exports = Student;
