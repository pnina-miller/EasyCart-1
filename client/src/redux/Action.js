function convertFunctionNameToUppercase(funcName) {
    return funcName.replace(/([A-Z])/g, '_$1').toUpperCase();
}
export const actions = new Proxy({}, {
        get: function (target, prop) {
        if (target[prop] === undefined)
            return function (args) {
                return {
                    type: convertFunctionNameToUppercase(prop),
                    payload: args,
                }
            }
        else
            return target[prop];
    }
})
export default actions

