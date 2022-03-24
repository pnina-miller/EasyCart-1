//check if it is dev server or prod server
const isDev = window.location.href.includes('dev.')

module.exports = {
    APP_NAME: 'EasyCart.direct',
    LOGIN_URL: isDev?'https://dev.accounts.codes/EasyCart.direct/login':'https://accounts.codes/EasyCart.direct/login',
    API_URL: 'https://EasyCart.direct',
}
