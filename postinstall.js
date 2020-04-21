const { exec } = require('child_process')

console.log('... patience please ...')
process.chdir('./node_modules/image-js')
exec('npm install')
process.chdir('../..')
