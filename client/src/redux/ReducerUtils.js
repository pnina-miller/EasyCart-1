function getTypeToFunction(actionType) {
    return actionType.toLowerCase().replace(/_(\w)/g, v => v[1].toUpperCase());
}

export default function createReducer(state, action, handlers) {
    let key = getTypeToFunction(action.type);
    let handler = handlers[key];
    if (handler)
        handler(state, action)
}