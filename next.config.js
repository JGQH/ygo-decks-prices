const { resolve } = require('path')

module.exports = {
    sassOptions: {
        includePaths: [
            resolve(__dirname, 'styles')
        ]
    }
}