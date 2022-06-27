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
        name: 'description',
        sub: [
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
        ]
    },
    {
        type: 'editor',
        message: 'Please give instructions for how to install the project (save when done):',
        name: 'installation',
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

module.exports = { licenses, questions };