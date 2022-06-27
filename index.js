// import modules and utilities
const inquirer = require('inquirer');
const fs = require('fs');
const markdown = require('./utils/generateMarkdown.js');
const getLicense = require('./utils/getLicense');
const raise = require('./utils/raiseSubQuestions');

// import licenses and questions
const { licenses, questions } = require('./utils/variables')

// use a user-picked license name to get the appropriate license object from the license object array, default to MIT if something goes wrong
function pickLicense(pickedName) {
    for (license of licenses) {
        if (pickedName === license.name) {
            return license;
        };
    };
    return licenses[0];
};

// ask user which questions they'd like to include
inquirer.prompt(
    {
        type: 'checkbox',
        message: 'Which featuers would you like to include?',
        name: 'features',
        choices: questions.map(q => q.name)
    }
).then(res => {
    // filter out questions based on what the user answered 
    let asked = questions.filter(q => {
        if(res.features.includes(q.name)) return q;
    })
    return asked;
}).then(asked => {
    // raise any subquestion arrays out of the questions
    raise(asked);
    // ask the questions
    inquirer.prompt(asked)
    // with the data from questions
    .then(res => {
        // pick our license
        if(res.license) var licObj = pickLicense(res.license);
        // make a new folder for our project, throw errors, log message when file created
        fs.mkdir(`./${res.title}`, err => {
            if (err) throw err;
            console.log(`Created new folder '${res.title}'`)
        });
        // create a license file for our project
        if(res.license) getLicense(res, licObj);
        // create the readme text, inserting our user's answers, throw errors, log message when file created
        fs.writeFile(`./${res.title}/readme.md`, markdown.generateMarkdown(res, licObj), err => {
            if (err) throw err;
            console.log(`Created ${res.title}/readme.md`);
        });
    });
});