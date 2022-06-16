// import required modules inquirer for prompts, https for getting remote resources, fs for writing files
const inquirer = require('inquirer');
const https = require('https');
const fs = require('fs');
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

function getLicense(lic, name, title) {
    // initialize url for conditional assignment
    let url;
    // determine which URLs to use
    if(lic === "MIT") {
        url = MITUrl;
        badge = MITBadge;
    }
    else if (lic === "Apache") {
        url = apacheUrl;
        badge = apacheBadge;
    }
    else if (lic === "GPL") {
        url = GPLUrl;
        badge = GPLBadge;
    }
    // GET request to URL
    https.get(url, res => {
        // on data from promise
        res.on('data', d => {
            // base license string
            var license = d.toString();
            console.log(license)
            console.log(license.length)
            // if Apache license is being used
            if(lic === "Apache") {
                // replace year and name in license template
                license = license.replace("yyyy", new Date().getFullYear());
                license = license.replace("name of copyright owner", name);
            }
            // if another license is being used
            else {
                // replace year and name in license template
                license = license.replace("{{ year }}", `[${new Date().getFullYear()}]`);
                license = license.replace("{{ organization }}", `[${name}]`);
            };
            // write the license to a text file
            console.log(license.length)
            fs.appendFile(`./${title}/license.txt`, license, function(){});
        });
    });
};

// ask user questions
inquirer
    .prompt([
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
            choices: ['MIT', 'Apache', 'GPL'],
        },
        {
            type: 'editor',
            message: 'Please write some tests for the project (save when done):',
            name: 'tests',
        },
    ])
    .then((res) => {
        // make a new folder for our project
        fs.mkdir(`./${res.title}`, function(){})
        // create a license file for our project
        getLicense(res.license, res.username, res.title);
        // create the readme text, inserting our user's answers
        let readmeContent = `
[![License](${badge[0]})](${badge[1]})

# Table of Contents

[Description](#Description)

[Installation](#Installation)

[Usage](#Usage)

[Contributing](#Contributing)

[Tests](#Tests)

# Description
\`\`\`
${res.descr}
\`\`\`

# Installation

\`\`\`
${res.install}
\`\`\`

# Usage

\`\`\`
${res.usage}
\`\`\`

# Contributing

\`\`\`
${res.contributing}
\`\`\`

# Tests

\`\`\`
${res.tests}
\`\`\``;
        fs.writeFile(`./${res.title}/readme.md`, readmeContent, function () { })
    }
);