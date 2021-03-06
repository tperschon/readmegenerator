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

// using input data and picked license object, return markup with pertinent information inserted
function generateMarkdown(data, licObj) {
  let markdown = '';
if(data.license) markdown += `[![License](${renderLicenseBadge(licObj)})](${renderLicenseLink(licObj)})\n# Table of Contents\n\n[Description](#Description)\n\n`
if(data.installation) markdown += '[Installation](#Installation)\n\n';
if(data.usage) markdown += '[Usage](#Usage)\n\n';
if(data.contributing) markdown += '[Contributing](#Contributing)\n\n';
if(data.tests) markdown += '[Tests](#Tests)\n\n';
if(data.description || data.motivation || data.whybuild || data.problem || data.learned) markdown += '# Description\n';
if(data.description) markdown += `\`\`\`\n${data.description}\n\`\`\`\n`;
if(data.motivation) markdown += `- ${data.motivation}\n`;
if(data.whybuild) markdown += `- ${data.whybuild}\n`;
if(data.problem) markdown += `- ${data.problem}\n`;
if(data.learned) markdown += `- ${data.learned}\n`;
if(data.installation) markdown += `# Installation\n\`\`\`\n${data.installation}\n\`\`\`\n`
if(data.usage) markdown += `# Usage\n\`\`\`\n${data.usage}\n\`\`\`\n`
if(data.contributing) markdown += `# Contributing\nIf you would like to contribute to the project, it can be found here: [${data.title}](${data.contributing})\n`
if(data.tests) markdown += `# Tests\n\`\`\`\n${data.tests}\n\`\`\`\n`
if(data.email && data.github) markdown += `# Questions\nIf you have any questions, I can be reached via: [Github](github.com/${data.github}) and [E-Mail](${data.email})\n`;
  return markdown;
};

module.exports = {
  renderLicenseBadge,
  renderLicenseRaw,
  renderLicenseLink,
  generateMarkdown
};