const fs = require('fs');
const path = require('path');

function getFiles(currentPath) {
    fs.readdir(currentPath, ((err, files) => {
        if (err) {
            console.log(err)
        }
        files.forEach(file => {
            const newPath = path.join(currentPath, file)
            fs.stat(newPath, (err, stats) => {
                stats.isDirectory()
                    ? getFiles(newPath)
                    : sortOnSex(newPath, file)
            })
        })
    }))
}

function sortOnSex(newPath, file) {
    if (path.extname(file) === '.json') {
        fs.readFile(newPath, ((err, data) => {
            if (err) {
                console.log(err)
            }
            let changedPath;
            const {name, gender} = JSON.parse(data.toString())
            if (gender === 'female') {
                changedPath = path.join(__dirname, '20_00', file)
            }
            if (gender === 'male') {
                changedPath = path.join(__dirname, '18_00', file)
            }
            if (newPath === changedPath) {
                console.log(`${name} in correct directory`)
            }
            fs.rename(newPath, changedPath, err => {
                if (err) {
                    console.log(err)
                }
            })
        }))
    }
}

getFiles(__dirname)
