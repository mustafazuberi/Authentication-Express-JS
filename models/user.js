const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')

const jsonFilePath = path.join(__dirname, '..', 'data', 'users.json')


const readFile = () => {
    const data = fs.readFileSync(jsonFilePath)
    return JSON.parse(data.toString())
}
const writeFile = (dataToWrite) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(jsonFilePath, JSON.stringify(dataToWrite), (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve();
        })
    });
};



exports.storeUser = async (user) => {
    try {
        let data = readFile()
        user.password = await bcrypt.hash(user.password, 12)
        if (data.length > 0) {
            data.push(user)
        } else {
            data = [user]
        }
        await writeFile(data)
        return true
    } catch (e) {
        console.log(e)
    }
}

exports.getUser = async (email) => {
    try {
        const users = await readFile()
        const matched = users.find(u => u.email === email)
        if (matched) {
            return matched
        } else {
            throw new Error("User not found")
        }
    } catch (e) {
        console.log(e)
    }
}


exports.fetchAll = () => {
    return readFile()
}