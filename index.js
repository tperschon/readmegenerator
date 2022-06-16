// import required modules inquirer for prompts, https for getting remote resources, fs for writing files
const inquirer = require('inquirer');
const https = require('https');
const fs = require('fs');
const markdown = require('./utils/generateMarkdown.js')
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
        type: 'editor',
        message: 'Please give some instructions for how to install the project (save when done):',
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
        name: 'contr',
    },
    {
        type: 'list',
        message: 'Please select a license type:',
        name: 'license',
        choices: licenses.map(license => license.name),
    },
    {
        type: 'editor',
        message: 'Please write some tests for the project (save when done):',
        name: 'tests',
    },
];

// use a user-picked license name to get the appropriate license object from the license object array
function pickLicense(pickedName) {
    for (license of licenses) {
        if (pickedName === license.name) {
            return license;
        };
    };
};

// takes in a license, its name/type, and the user's name to morph the license
function formatLicense(license, licenseType, userName) {
    // if Apache license is being used
    if(licenseType === "Apache") {
        // replace year and name in license template
        license = license.replace("yyyy", new Date().getFullYear());
        license = license.replace("name of copyright owner", userName);
    }
    // if another license is being used
    else {
        // replace year and name in license template
        license = license.replace("{{ year }}", `[${new Date().getFullYear()}]`);
        license = license.replace("{{ organization }}", `[${userName}]`);
    };
};

function getLicense(data, licObj) {
    // GET request to URL
    https.get(renderLicense, res => {
        // on data from promise
        res.on('data', d => {
            // base license string
            var license = d.toString();
            // format license
            formatLicense(license, data.license, data.username)
            // write the license to a text file
            fs.appendFile(`./${title}/license.txt`, license, function(){});
        });
    });
};

// ask user questions
inquirer
    .prompt(questions)
    .then((res) => {
        // pick our license
        let licObj = pickLicense(res.license);
        // make a new folder for our project
        fs.mkdir(`./${res.title}`, function(){})
        // create a license file for our project
        getLicense(res, licObj);
        // create the readme text, inserting our user's answers
        fs.writeFile(`./${res.title}/readme.md`, markdown.generateMarkdown(res, licObj), function (err) { 
            console.log(err);
        });
    }
);