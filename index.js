const inquirer = require('inquirer');
const fs = require('fs');

// variables to store user input
let pTitle;
let pDescription;
let pTableOfContents;
let pInstallation;
let pUsage;
let pLicense;
let pContributing;
//
let readmecontent = `# Description
\`\`\`
${pDescription}
\`\`\`

# Table of Contents

\`\`\`

\`\`\`

# Installation

\`\`\`
${pInstallation}
\`\`\`

# Usage

\`\`\`

\`\`\`

# Contributing

\`\`\`

\`\`\`

# Tests

\`\`\`

\`\`\`
`;


inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is your name?',
      name: 'name',
    },
    {
      type: 'input',
      message: 'What languages do you know?',
      name: 'languages',
    },
    {
      type: 'input',
      message: 'What is your preferred method of communication?',
      name: 'communication',
    },
  ])
  .then((response) => {
  let responses = `${response.name}\n${response.languages}\n${response.communication}`
    fs.writeFile('responses.txt', responses, function(){})
  }
);

rl.on('close', function () {
    readmecontent = 
    fs.writeFile(`${pTitle}.md`, readmecontent, (err) =>
        err ? console.error(err) : console.log(`${pTitle}.md has been generated.`)
    );
});