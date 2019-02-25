const fs = require('fs');
const path = require('path');

const models = [];

const files = fs.readdirSync(path.resolve(__dirname, './models'));

function getModels(files) {
    files.forEach(file => {
        const path = `./models/${file}/`;
        const model = require(path);
        models.push(model)
    })
}
getModels(files)

module.exports = models;