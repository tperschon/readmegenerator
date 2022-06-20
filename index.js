// import required modules inquirer for prompts, https for getting remote resources, fs for writing files
const inquirer = require('inquirer');
const https = require('https');
const fs = require('fs');
const markdown = require('./utils/generateMarkdown.js');

// urls for license templates
const licenses = [
    {
        name: 'MIT',
        raw: 'https://raw.githubusercontent.com/licenses/license-templates/master/templates/mit.txt',
        image: 'https://img.shields.io/badge/License-MIT-yellow.svg',
        link: 'https://opensource.org/licenses/MIT'
    },
    {
        name: 'Apache',
        raw: 'https://www.apache.org/licenses/LICENSE-2.0.txt',
        image: 'https://img.shields.io/badge/License-Apache_2.0-blue.svg',
        link: 'https://opensource.org/licenses/Apache-2.0'
    },
    {
        name: 'GPL',
        raw: 'https://raw.githubusercontent.com/licenses/license-templates/master/templates/gpl2.txt',
        image: 'https://img.shields.io/badge/License-GPL_v2-blue.svg',
        link: 'https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html'
    }
];

// array of question objects for user
const questions = [
    {
        type: 'input',
        message: 'What is your name?',
        name: 'username',
    },
    {
        type: 'input',
        message: 'What is your project\'s name?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Please enter a brief description of your project:',
        name: 'descr',
    },
    {
        type: 'input',
        message: 'What was your motivation?',
        name: 'motivation',
    },
    {
        type: 'input',
        message: 'Why did you build this project?',
        name: 'whybuild',
    },
    {
        type: 'input',
        message: 'What problem does it solve?',
        name: 'problem',
    },
    {
        type: 'input',
        message: 'What did you learn?',
        name: 'learned',
    },
    {
        type: 'editor',
        message: 'Please give instructions for how to install the project (save when done):',
        name: 'install',
    },
    {
        type: 'editor',
        message: 'Please describe how to use the project (save when done):',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'Please give a link for how to contribute to the project:',
        name: 'contributing',
    },
    {
        type: 'list',
        message: 'Please select a license type:',
        name: 'license',
        // map the name from each object in our object array to a new array to present as choices
        choices: licenses.map(license => license.name),
    },
    {
        type: 'editor',
        message: 'Please write some tests for the project (save when done):',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'Please enter your Github username:',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Please your email address',
        name: 'email',
    },
];

// use a user-picked license name to get the appropriate license object from the license object array, default to MIT if something goes wrong
function pickLicense(pickedName) {
    for (license of licenses) {
        if (pickedName === license.name) {
            return license;
        };
    };
    return licenses[0];
};

function getLicense(data, licObj) {
    // GET request to URL
    https.get(markdown.renderLicenseRaw(licObj), res => {
        // empty data initialization
        let license = "";
        // on data from promise, add to license data
        res.on('data', d => {
            license += d;
        })
        // on completion of promise
        res.on('end', () => {
            // convert license to a string
            license = license.toString();
            // if Apache license is being used
            if (licObj.name === "Apache") {
                // replace year and name in license template
                license = license.replace("yyyy", new Date().getFullYear());
                license = license.replace("name of copyright owner", data.username);
            }
            // if another license is being used
            else {
                // replace year and name in license template
                license = license.replace("{{ year }}", `[${new Date().getFullYear()}]`);
                license = license.replace("{{ organization }}", `[${data.username}]`);
            };
            // write the license to a text file, throwing any errors we get and logging a message when file is writen so users knows
            fs.appendFile(`./${data.title}/license.txt`, license, err => {
                if (err) throw err;
                console.log(`Writing data to ${data.title}/license.txt`)
            });
        })
        // if there's an error, print it to the console
        res.on('error', err => {
            console.log(`Error: ${err}`)
        });
    });
};

// ask user questions
inquirer.prompt(questions)
    // with the data from questions
    .then(res => {
        // pick our license
        let licObj = pickLicense(res.license);
        // make a new folder for our project, throw errors, log message when file created
        fs.mkdir(`./${res.title}`, err => {
            if (err) throw err;
            console.log(`Created new folder '${res.title}'`)
        });
        // create a license file for our project
        getLicense(res, licObj);
        // create the readme text, inserting our user's answers, throw errors, log message when file created
        fs.writeFile(`./${res.title}/readme.md`, markdown.generateMarkdown(res, licObj), err => {
            if (err) throw err;
            console.log(`Created ${res.title}/readme.md`);
        });
    });