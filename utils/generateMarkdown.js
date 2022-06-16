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
function generateMarkdown(data) {
  return `# ${data.title}

`;
}

module.exports = renderLicenseBadge, renderLicenseRaw, renderLicenseLink, generateMarkdown;