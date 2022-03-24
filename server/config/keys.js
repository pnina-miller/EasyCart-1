const dev = require('./dev')
const prod = require('./prod')
 
const keys = (host) => {
  return host.includes('dev') ?  dev :  prod
}
 
module.exports = { keys };