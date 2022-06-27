const fs = require('fs');
const https = require('https');
const markdown = require('./generateMarkdown');

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

module.exports = getLicense;