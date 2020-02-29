type ReducerLogger = {
    state: any
    newState: any
    func: any
    action: any
}
export function reducerLogger({ state, newState, func, action }: ReducerLogger) {
    console.group("Action " + func.name)
    console.info("%cprev state", "color: grey; font-weight: bold", state);
    console.info("%caction", "color: blue; font-weight: bold", action);
    console.info("%cnext state", "color: green; font-weight: bold", newState)
    console.groupEnd()
}