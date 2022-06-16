// if license.image exists, return it, else return an empty string
function renderLicenseBadge(license) {
  return (license.image ? license.image : "");
}

// if license.raw exists, return it, else return an empty string
function renderLicenseRaw(license) {
  return (license.raw ? license.raw : "");
}

// if license.link exists, return it, else return an empty string
function renderLicenseLink(license) {
  return (license.link ? license.link : "");
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data, licObj) {
  return `
[![License](${renderLicenseBadge(licObj)})](${renderLicenseLink(licObj)})

# Table of Contents

[Description](#Description)

[Installation](#Installation)

[Usage](#Usage)

[Contributing](#Contributing)

[Tests](#Tests)

# Description
\`\`\`
${data.descr}
\`\`\`

# Installation

\`\`\`
${data.install}
\`\`\`

# Usage

\`\`\`
${data.usage}
\`\`\`

# Contributing

\`\`\`
${data.contributing}
\`\`\`

# Tests

\`\`\`
${data.tests}
\`\`\``;
};

module.exports = {
  renderLicenseBadge,
  renderLicenseRaw,
  renderLicenseLink,
  generateMarkdown
};